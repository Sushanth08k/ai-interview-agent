import { useEffect, useState } from "react";
import api from "../services/api";

export default function Analytics() {

    const [analysis, setAnalysis] =
        useState("");

    const [stats, setStats] =
        useState(null);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics =
        async () => {

            try {

                const res =
                    await api.get(
                        "/interview/analytics"
                    );

                setAnalysis(
                    res.data.analysis
                );

                setStats({
                    questionsAnswered:
                        res.data.questions_answered,

                    totalScore:
                        res.data.total_score,

                    averageScore:
                        res.data.average_score
                });

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to load analytics"
                );
            }
        };

    return (

        <div>

            <h1>
                Interview Analytics
            </h1>

            {stats && (

                <div>

                    <h3>
                        Performance
                    </h3>

                    <p>
                        Questions Answered:
                        {" "}
                        {stats.questionsAnswered}
                    </p>

                    <p>
                        Total Score:
                        {" "}
                        {stats.totalScore}
                    </p>

                    <p>
                        Average Score:
                        {" "}
                        {stats.averageScore}
                    </p>

                </div>

            )}

            <h3>
                Analysis
            </h3>

            <pre>
                {analysis}
            </pre>

        </div>

    );
}