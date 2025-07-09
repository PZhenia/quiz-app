import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/home/index.jsx";
import Quiz from "./pages/quiz/index.jsx";
import Result from "./pages/result/index.jsx";

function App() {
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

    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <Home currentTheme={currentTheme} toggleTheme={toggleTheme} />,
            },
            {
                path: "quiz",
                element: <Quiz />,
            },
            {
                path: "result",
                element: <Result />,
            },
            {
                path: "*",
                element: <Home currentTheme={currentTheme} toggleTheme={toggleTheme} />,
            },
        ],
        {
            basename: "/quiz-app",
        }
    );

    return <RouterProvider router={router} />;
}

export default App;
