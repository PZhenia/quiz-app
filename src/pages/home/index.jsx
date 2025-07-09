import QuizForm from "../../components/QuizForm";
import styles from "./Home.module.css";

export default function Home({ currentTheme, toggleTheme }) {
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
    );
}
