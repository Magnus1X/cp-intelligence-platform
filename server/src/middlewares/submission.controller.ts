import type { Request, Response } from "express";
import Submission from "../models/Submission.js";
import Problem from "../models/Problem.js";
import { Judge0Service } from "../services/judge0.service.js";

export const executeSubmission = async (req: Request, res: Response) => {
    try {
        const { problemId, code, languageId } = req.body;
        const userId = (req as any).user.id;

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        // 1. Create initial submission record
        const submission = await Submission.create({
            userId,
            problemId,
            code,
            languageId,
            status: { id: 1, description: "In Queue" },
        });

        // 2. Submit to Judge0 (for simplicity, we might only check one test case or a custom one here)
        // For a real CP platform, we'd run against ALL test cases.
        // Here we'll just run against the first test case to demonstrate the flow.
        if (!problem.testCases || problem.testCases.length === 0) {
            return res.status(400).json({ message: "Problem has no test cases" });
        }

        const testCase = problem.testCases[0];
        if (!testCase) {
            return res.status(500).json({ message: "Test case data missing" });
        }

        const token = await Judge0Service.createSubmission(
            code,
            languageId,
            testCase.input,
            testCase.output
        );

        // 3. Poll for result
        let result;
        let attempts = 0;
        while (attempts < 10) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s
            result = await Judge0Service.getSubmission(token);

            // Status ID 1 (In Queue) or 2 (Processing)
            if (result.status.id > 2) {
                break;
            }
            attempts++;
        }

        if (!result || result.status.id <= 2) {
            return res.status(504).json({ message: "Execution timed out" });
        }

        // 4. Update submission with result
        submission.status = result.status;
        submission.stdout = result.stdout;
        submission.stderr = result.stderr;
        submission.compileOutput = result.compile_output;
        submission.time = result.time;
        submission.memory = result.memory;

        // Map Judge0 verdict to our schema
        if (result.status.id === 3) submission.verdict = "Accepted";
        else if (result.status.id === 4) submission.verdict = "Wrong Answer";
        else if (result.status.id === 5) submission.verdict = "Time Limit Exceeded";
        else if (result.status.id === 6) submission.verdict = "Compilation Error";
        else submission.verdict = "Runtime Error";

        await submission.save();

        res.json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Submission failed" });
    }
};

export const getProblem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch problem" });
    }
};
