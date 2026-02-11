interface RatingChange {
    contestId: number;
    contestName: string;
    rank: number;
    ratingUpdateTimeSeconds: number;
    oldRating: number;
    newRating: number;
}

interface Submission {
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    relativePath: string;
    problem: {
        contestId: number;
        index: string;
        name: string;
        type: string;
        points?: number;
        rating?: number;
        tags: string[];
    };
    author: {
        contestId: number;
        members: { handle: string }[];
        participantType: string;
        ghost: boolean;
        startTimeSeconds?: number;
    };
    programmingLanguage: string;
    verdict?: string;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
}

export class CodeforcesService {
    public static async fetchData(handle: string) {
        // Fetch rating history
        const ratingResponse = await fetch(
            `https://codeforces.com/api/user.rating?handle=${handle}`
        );
        const ratingData = await ratingResponse.json();

        if (ratingData.status !== "OK") {
            throw new Error(`Failed to fetch rating history: ${ratingData.comment}`);
        }

        // Fetch submissions
        const submissionsResponse = await fetch(
            `https://codeforces.com/api/user.status?handle=${handle}`
        );
        const submissionsData = await submissionsResponse.json();

        if (submissionsData.status !== "OK") {
            throw new Error(
                `Failed to fetch submissions: ${submissionsData.comment}`
            );
        }

        // Transform rating history to match our schema
        const ratingHistory = ratingData.result.map((r: RatingChange) => ({
            contestId: r.contestId,
            contestName: r.contestName,
            rank: r.rank,
            oldRating: r.oldRating,
            newRating: r.newRating,
            date: new Date(r.ratingUpdateTimeSeconds * 1000),
        }));

        return {
            ratingHistory,
            submissions: submissionsData.result as Submission[],
        };
    }
}
