import { useEffect, useState } from "react";
import QuizForm from "../../components/QuizForm";

import styles from "./Home.module.css";

export default function Home() {
    const [currentTheme, setCurrentTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.className = `${savedTheme}-theme`;
        setCurrentTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.className = `${newTheme}-theme`;
        localStorage.setItem('theme', newTheme);
        setCurrentTheme(newTheme);
    };

    return (
        <div className={styles.homeContainer}>
            <button
                className={styles.themeToggle}
                onClick={toggleTheme}
            >
                {currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <h1 className={styles.title}>Let's Take the Quiz</h1>
            <p className={styles.subtitle}>
                Test your knowledge with our interactive quiz. Customize your quiz experience by selecting your preferred settings below.
            </p>
            <QuizForm />
        </div>
    )
}