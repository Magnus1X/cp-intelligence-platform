export class AnalyticsService {
    public static computeAnalytics(data: {
        ratingHistory: any[];
        submissions: any[];
    }) {
        const { ratingHistory, submissions } = data;

        // 1. Basic Stats
        const currentRating =
            ratingHistory.length > 0
                ? ratingHistory[ratingHistory.length - 1].newRating
                : 0;

        const maxRating = ratingHistory.reduce(
            (max: number, r: any) => Math.max(max, r.newRating),
            0
        );

        const totalSubmissions = submissions.length;
        const solvedSubmissions = submissions.filter(
            (s: any) => s.verdict === "OK"
        );
        const solvedCount = solvedSubmissions.length;
        const accuracyRate =
            totalSubmissions > 0 ? (solvedCount / totalSubmissions) * 100 : 0;

        // 2. Difficulty Buckets
        const difficultyStatsMap: Record<
            number,
            { solved: number; attempted: number }
        > = {};

        submissions.forEach((s: any) => {
            if (s.problem.rating) {
                const rating = s.problem.rating as number;
                const bucket = Math.floor(rating / 100) * 100; // e.g., 840 -> 800

                if (!difficultyStatsMap[bucket]) {
                    difficultyStatsMap[bucket] = { solved: 0, attempted: 0 };
                }
                difficultyStatsMap[bucket].attempted++;
                if (s.verdict === "OK") {
                    difficultyStatsMap[bucket].solved++;
                }
            }
        });

        const difficultyStats = Object.keys(difficultyStatsMap).map((key) => {
            const stats = difficultyStatsMap[Number(key)];
            return {
                rating: Number(key),
                solved: stats?.solved || 0,
                attempted: stats?.attempted || 0,
            };
        });

        // 3. Tag Stats & Weak Tags
        const tagStatsMap: Record<
            string,
            { solved: number; attempted: number }
        > = {};

        submissions.forEach((s: any) => {
            s.problem.tags.forEach((tag: string) => {
                if (!tagStatsMap[tag]) {
                    tagStatsMap[tag] = { solved: 0, attempted: 0 };
                }
                tagStatsMap[tag].attempted++;
                if (s.verdict === "OK") {
                    tagStatsMap[tag].solved++;
                }
            });
        });

        const tagStats = Object.keys(tagStatsMap).map((tag) => {
            const stats = tagStatsMap[tag];
            return {
                tag,
                solved: stats?.solved || 0,
                attempted: stats?.attempted || 0,
                accuracy: (stats?.attempted || 0) > 0 ? ((stats?.solved || 0) / (stats?.attempted || 1)) * 100 : 0,
            };
        });

        // Identify weak tags: specific threshold can be adjusted
        // Logic: If attempted > 5 and accuracy < 40%, it's a weak tag
        const weakTags = tagStats
            .filter((t) => t.attempted >= 5 && t.accuracy < 40)
            .map((t) => t.tag);

        // 4. Consistency Score
        // Logic: Variance of rating changes. Lower variance = Higher consistency.
        let consistencyScore = 0;
        if (ratingHistory.length > 1) {
            const changes = ratingHistory.map((r: any) =>
                Math.abs(r.newRating - r.oldRating)
            );
            const avgChange =
                changes.reduce((sum: number, val: number) => sum + val, 0) /
                changes.length;

            // Normalize to 0-100 scale (inverse of volatility)
            // If avg change is > 100, score -> 0. If avg change is 0, score -> 100.
            consistencyScore = Math.max(0, 100 - avgChange);
        }

        // 5. CP Performance Score
        // Formula: (Rating * 0.4) + (Consistency * 0.2) + (Accuracy * 0.2) + (SolvedCount * 0.05)
        // Normalized to be roughly around rating scale or 0-100 logic? 
        // Let's use a custom scale where 100 is "Grandmaster" level relative to specific metrics.
        // For now, let's keep it simple and relative.
        const cpScore =
            currentRating * 0.5 +
            consistencyScore * 5 +
            accuracyRate * 2 +
            solvedCount * 0.1;

        return {
            cpScore: Math.round(cpScore),
            consistencyScore: Math.round(consistencyScore),
            accuracyRate: parseFloat(accuracyRate.toFixed(2)),
            tagStats,
            difficultyStats,
            weakTags,
            currentRating,
            maxRating,
            solvedCount,
            totalSubmissions
        };
    }
}
