import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { setUserAnswers } from "../../store/slices/quizSlice.js";
import { decodeHtml } from "../../helpers/index.js";

import { Container } from "react-bootstrap";

import styles from "./Quiz.module.css";

export default function Quiz() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, loading, error } = useSelector(state => state.quiz);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [localUserAnswers, setLocalUserAnswers] = useState([]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        if (questions.length > 0) {
            const newAnswers = [
                ...questions[currentQuestion].incorrect_answers,
                questions[currentQuestion].correct_answer
            ].sort(() => Math.random() - 0.5);
            setShuffledAnswers(newAnswers);
        }
    }, [currentQuestion, questions]);

    const handleClick = () => navigate("/");

    if (loading) return <Container className={styles.loadingText}>Loading questions...</Container>;
    if (error) return <Container className={styles.errorText}>Error: {error}</Container>;
    if (questions.length === 0) return (
        <Container
            className={styles.emptyText}>No questions found.
            <button
                onClick={handleClick}
                className={styles.tryAgainButton}
            >
                Try Again
            </button>
        </Container>
    );

    const question = questions[currentQuestion];

    const handleClickNext = () => {
        setCurrentQuestion(prev => prev + 1);
    };

    const handleClickPrev = () => {
        setCurrentQuestion(prev => prev - 1);
    }

    const handleClickSubmit = () => {
        dispatch(setUserAnswers(localUserAnswers));
        navigate("/result");
    };

    const handleClickQuit = () => {
        if (window.confirm("🔴Do you really want to quit the quiz?\nYour current progress will not be saved.")) {
            navigate("/");
        }
    };

    const handleAnswerSelect = (selectedAnswer) => {
        const updatedAnswers = [...localUserAnswers];
        updatedAnswers[currentQuestion] = selectedAnswer;
        setLocalUserAnswers(updatedAnswers);
    };

    return (
        <Container className={styles.quizContainer}>
            <div className={styles.progressContainer}>
                <p className={styles.progressText}>
                    Question {currentQuestion + 1} of {questions.length}
                </p>
                <button
                    onClick={handleClickQuit}
                    className={styles.quitQuiz}
                    aria-label="Quit quiz"
                    title="Quit quiz"
                >
                    ×
                </button>
            </div>

            <h3 className={styles.questionText}>
                {decodeHtml(question.question)}
            </h3>

            <div className={styles.answersContainer}>
                {shuffledAnswers.map(answer => (
                    <div
                        key={answer}
                        className={styles.answerOption}
                        onClick={() => handleAnswerSelect(answer)}
                    >
                        <input
                            type="radio"
                            name={`question-${currentQuestion}`}
                            value={answer}
                            checked={localUserAnswers[currentQuestion] === answer}
                            onChange={() => handleAnswerSelect(answer)}
                        />
                        <span className={styles.answerOptionText}>
                            {decodeHtml(answer)}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.navigationButtons}>
                {currentQuestion === 0 ? (
                    <div></div>
                ) : (
                    <button
                        onClick={handleClickPrev}
                        className={`${styles.navButton} ${styles.prevButton}`}
                    >
                        Previous
                    </button>
                )}

                {currentQuestion === questions.length - 1 ? (
                    <button
                        onClick={handleClickSubmit}
                        className={`${styles.navButton} ${styles.submitButton}`}
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button
                        onClick={handleClickNext}
                        className={`${styles.navButton} ${styles.nextButton}`}
                    >
                        Next Question
                    </button>
                )}
            </div>
        </Container>
    )
}