import { useState } from "react";
import api from "../services/api";

export default function Interview() {

    const [topic, setTopic] =
        useState("");

    const [question, setQuestion] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    const [evaluation, setEvaluation] =
        useState("");

    const [stats, setStats] =
        useState(null);

    const startInterview =
        async () => {

            try {

                const res =
                    await api.post(
                        "/interview/start",
                        {
                            topic
                        }
                    );

                setQuestion(
                    res.data.question
                );

                setEvaluation("");

                setStats(null);

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to start interview"
                );
            }
        };

    const submitAnswer =
        async () => {

            try {

                const res =
                    await api.post(
                        "/interview/answer",
                        {
                            answer
                        }
                    );

                setEvaluation(
                    res.data.evaluation
                );

                setQuestion(
                    res.data.next_question
                );

                setStats({
                    questionsAnswered:
                        res.data.questions_answered,

                    totalScore:
                        res.data.total_score,

                    averageScore:
                        res.data.average_score
                });

                setAnswer("");

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to submit answer"
                );
            }
        };

    const endInterview =
        async () => {

            try {

                const res =
                    await api.post(
                        "/interview/end"
                    );

                alert(
                    res.data.summary
                );

                setQuestion("");

                setAnswer("");

                setEvaluation("");

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to end interview"
                );
            }
        };

    return (

        <div>

            <h1>
                Mock Interview
            </h1>

            <input
                type="text"
                placeholder="Enter Topic"
                value={topic}
                onChange={(e) =>
                    setTopic(
                        e.target.value
                    )
                }
            />

            <button
                onClick={
                    startInterview
                }
            >
                Start Interview
            </button>

            <br />
            <br />

            {question && (

                <div>

                    <h3>
                        Question
                    </h3>

                    <p>
                        {question}
                    </p>

                    <textarea
                        rows="8"
                        cols="60"
                        value={answer}
                        onChange={(e) =>
                            setAnswer(
                                e.target.value
                            )
                        }
                    />

                    <br />
                    <br />

                    <button
                        onClick={
                            submitAnswer
                        }
                    >
                        Submit Answer
                    </button>

                    <button
                        onClick={
                            endInterview
                        }
                    >
                        End Interview
                    </button>

                </div>

            )}

            <br />

            {evaluation && (

                <div>

                    <h3>
                        Evaluation
                    </h3>

                    <pre>
                        {evaluation}
                    </pre>

                </div>

            )}

            {stats && (

                <div>

                    <h3>
                        Progress
                    </h3>

                    <p>
                        Questions Answered:
                        {" "}
                        {
                            stats.questionsAnswered
                        }
                    </p>

                    <p>
                        Total Score:
                        {" "}
                        {
                            stats.totalScore
                        }
                    </p>

                    <p>
                        Average Score:
                        {" "}
                        {
                            stats.averageScore
                        }
                    </p>

                </div>

            )}

        </div>

    );
}