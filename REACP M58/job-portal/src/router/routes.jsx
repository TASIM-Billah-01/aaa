import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Register from "../pages/Register";

export const routes = createBrowserRouter([
    {
        path : '/',
        element : <MainLayout></MainLayout>,
        children : [
            {
                path : '/register',
                element : <Register></Register>
            }
        ]
    }
])