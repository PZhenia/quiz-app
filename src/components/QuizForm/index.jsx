import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { getQuestions } from "../../store/thunks/quizThunk.js";

import { Formik } from "formik";
import { Container } from "react-bootstrap";

import styles from "./QuizForm.module.css";

export default function QuizForm() {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/quiz");
    }

    useEffect(() => {
        async function getCategories() {
            try {
                const res = await fetch("https://opentdb.com/api_category.php");
                if (!res.ok) {
                    throw new Error("Failed to fetch quiz categories!");
                }
                const data = await res.json();
                setCategories(data.trivia_categories);
            } catch (err) {
                console.log(err);
            }
        }
        getCategories();
    }, []);

    return (
        <Container className={styles.formContainer}>
            <h2 className={styles.formTitle}>Quiz Settings</h2>
            <Formik
                initialValues={{
                    numberOfQuestions: 10,
                    category: "",
                    difficulty: "",
                    typeOfQuestion: "",
                }}
                validate={values => {
                    const errors = {};
                    if (!values.numberOfQuestions || values.numberOfQuestions <= 0) {
                        errors.numberOfQuestions = "Please enter a positive number of questions";
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await dispatch(getQuestions(values)).unwrap();
                        handleClick();
                    } catch (error) {
                        console.error("Failed to fetch questions:", error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={`mb-3 ${styles.formGroup}`}>
                            <label htmlFor="numberOfQuestions" className={styles.formLabel}>
                                Number of Questions
                            </label>
                            <input
                                type="text"
                                id="numberOfQuestions"
                                name="numberOfQuestions"
                                className={`form-control ${styles.formControl}`}
                                placeholder="Enter number of questions"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.numberOfQuestions}
                                min={1}
                            />
                            {errors.numberOfQuestions && touched.numberOfQuestions && (
                                <div className={styles.errorMessage}>{errors.numberOfQuestions}</div>
                            )}
                        </div>

                        <div className={`mb-3 ${styles.formGroup}`}>
                            <label htmlFor="category" className={styles.formLabel}>
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                className={`form-control ${styles.formControl}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}
                            >
                                <option value="">Any Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`mb-3 ${styles.formGroup}`}>
                            <label htmlFor="difficulty" className={styles.formLabel}>
                                Difficulty
                            </label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                className={`form-control ${styles.formControl}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.difficulty}
                            >
                                <option value="">Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div className={`mb-4 ${styles.formGroup}`}>
                            <label htmlFor="typeOfQuestion" className={styles.formLabel}>
                                Question Type
                            </label>
                            <select
                                id="typeOfQuestion"
                                name="typeOfQuestion"
                                className={`form-control ${styles.formControl}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.typeOfQuestion}
                            >
                                <option value="">Any Type</option>
                                <option value="multiple">Multiple Choice</option>
                                <option value="boolean">True / False</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Starting..." : "Start Quiz"}
                        </button>
                    </form>
                )}
            </Formik>
        </Container>
    );
}