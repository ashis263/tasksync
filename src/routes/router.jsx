import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Sidebar from "../components/Sidebar/Sidebar";

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout></MainLayout>,
        children:([
            {
                path:"/",
                element: <Home></Home>
            },
            {
                path:"/log",
                element: <Home></Home>
            }
        ])
    }
]);

export default router;