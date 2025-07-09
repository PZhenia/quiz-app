import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/home/index.jsx";
import Quiz from "./pages/quiz/index.jsx";
import Result from "./pages/result/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "quiz",
        element: <Quiz />
    },
    {
        path: "result",
        element: <Result />
    },
    {
        path: "*",
        element: <Home />
    },
])

function App() {
  return (<RouterProvider router={router} />)
}

export default App
