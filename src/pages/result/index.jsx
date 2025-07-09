import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { resetQuiz } from "../../store/slices/quizSlice.js";
import { decodeHtml } from "../../helpers/index.js";

import { Container } from "react-bootstrap";

import styles from "./Result.module.css";

export default function Result() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { questions, userAnswers } = useSelector(state => state.quiz);

    const score = questions.reduce((total, question, index) => {
        const userAnswer = userAnswers[index];
        if(userAnswer === question.correct_answer) {
            return total + 1;
        }
        return total;
    }, 0);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.className = `${savedTheme}-theme`;
    }, []);

    const percentage = Math.round((score / questions.length) * 100);

    const handleClick = () => {
        dispatch(resetQuiz());
        navigate("/");
    }

    return (
        <Container className={styles.resultContainer}>
            <h2 className={styles.scoreHeader}>Quiz Results</h2>

            <div className="text-center mb-4">
                <p className={styles.scoreText}>You scored:</p>
                <p className={styles.scoreValue}>
                    {score} / {questions.length} ({percentage}%)
                </p>
            </div>

            {questions.map((question, index) => {
                const isCorrect = userAnswers[index] === question.correct_answer;
                const userAnswer = userAnswers[index] || 'No answer provided';

                return (
                    <div key={index} className={styles.questionItem}>
                        <p className={styles.questionText}>
                            Question {index + 1}: {decodeHtml(question.question)}
                        </p>

                        <p className={`${styles.answerText} ${isCorrect ? styles.correctAnswer : styles.incorrectAnswer}`}>
                            <strong>Your answer:</strong> {decodeHtml(userAnswer)}
                        </p>

                        {!isCorrect && (
                            <p className={`${styles.answerText} ${styles.correctAnswer}`}>
                                <strong>Correct answer:</strong> {decodeHtml(question.correct_answer)}
                            </p>
                        )}

                        <p className={`${styles.resultIndicator} ${isCorrect ? styles.correct : styles.incorrect}`}>
                            {isCorrect ? 'Correct ✅' : 'Incorrect ❌'}
                        </p>
                    </div>
                )
            })}

            <button
                onClick={handleClick}
                className={styles.playAgainButton}
            >
                Play Again
            </button>
        </Container>
    )
}