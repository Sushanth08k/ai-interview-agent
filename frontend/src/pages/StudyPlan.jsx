import { useEffect, useState } from "react";
import api from "../services/api";

export default function StudyPlan() {

    const [plan, setPlan] =
        useState("");

    const [stats, setStats] =
        useState(null);

    useEffect(() => {

        fetchPlan();

    }, []);

    const fetchPlan =
        async () => {

            try {

                const res =
                    await api.get(
                        "/interview/study-plan"
                    );

                setPlan(
                    res.data.study_plan
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
                    "Failed to load study plan"
                );
            }
        };

    return (

        <div>

            <h1>
                Study Plan
            </h1>

            {stats && (

                <div>

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
                Personalized Study Plan
            </h3>

            <pre>
                {plan}
            </pre>

        </div>

    );
}