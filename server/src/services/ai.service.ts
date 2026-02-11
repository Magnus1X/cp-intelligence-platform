import OpenAI from "openai";

export class AIService {
    private static openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    public static async evaluateSubmission(
        code: string,
        problemDescription: string,
        executionResult: any
    ) {
        const prompt = `
      Evaluate the following code submission for a competitive programming problem.
      
      Problem Description:
      ${problemDescription}

      Code:
      ${code}

      Execution Result:
      ${JSON.stringify(executionResult)}

      Provide a strict JSON response with the following fields:
      - correctnessScore (0-100)
      - timeComplexity (Big-O)
      - spaceComplexity (Big-O)
      - optimizationScore (0-100)
      - codeQualityScore (0-100)
      - contestReadinessScore (0-100)
      - strengths (array of strings)
      - weaknesses (array of strings)
      - improvementSuggestions (array of strings)
      - overallVerdict (string)
    `;

        try {
            const completion = await this.openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-4o",
                response_format: { type: "json_object" },
            });

            const responseContent = completion.choices[0]?.message?.content;
            return JSON.parse(responseContent || "{}");
        } catch (error) {
            console.error("AI Evaluation Error:", error);
            throw new Error("Failed to evaluate submission");
        }
    }

    public static async generateGrowthPlan(
        profileStats: any,
        weakTags: string[],
        recentPerformance: any
    ) {
        const prompt = `
      Generate a personalized growth plan for a competitive programmer.

      Profile Stats:
      ${JSON.stringify(profileStats)}

      Weak Tags:
      ${JSON.stringify(weakTags)}

      Recent Performance:
      ${JSON.stringify(recentPerformance)}

      Provide a strict JSON response with:
      - summary
      - 7_day_plan (array of daily tasks)
      - 14_day_plan (array of daily tasks)
      - contest_strategy
      - tag_focus (array of tags to focus on)
    `;

        try {
            const completion = await this.openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-4o",
                response_format: { type: "json_object" },
            });

            const responseContent = completion.choices[0]?.message?.content;
            return JSON.parse(responseContent || "{}");
        } catch (error) {
            console.error("AI Growth Plan Error:", error);
            throw new Error("Failed to generate growth plan");
        }
    }
}
