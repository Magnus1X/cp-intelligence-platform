export class Judge0Service {
    private static readonly API_URL =
        process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
    private static readonly API_KEY = process.env.JUDGE0_API_KEY || "";
    private static readonly API_HOST =
        process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com";

    private static getHeaders() {
        return {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Key": this.API_KEY,
            "X-RapidAPI-Host": this.API_HOST,
        };
    }

    public static async createSubmission(
        code: string,
        languageId: number,
        stdin?: string,
        expectedOutput?: string
    ): Promise<string> {
        const response = await fetch(
            `${this.API_URL}/submissions?base64_encoded=false&wait=false`,
            {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify({
                    source_code: code,
                    language_id: languageId,
                    stdin: stdin,
                    expected_output: expectedOutput,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Judge0 API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data.token;
    }

    public static async getSubmission(token: string): Promise<any> {
        const response = await fetch(
            `${this.API_URL}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,language_id,compile_output,message,status,time,memory`,
            {
                method: "GET",
                headers: this.getHeaders(),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Judge0 API Error: ${response.status} - ${errorText}`);
        }

        return await response.json();
    }
}
