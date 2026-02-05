import  {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import JobDetails from "../pages/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply";
import MyApplication from "../pages/MyApplication";
import AddJob from "../pages/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <MainLayout></MainLayout>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path : '/register',
                element : <Register></Register>
            },
            {
                path : '/login',
                element : <Login></Login>
            },
            {
                path : '/addJob',
                element : <AddJob></AddJob>
            },
            {
                path : '/myPostedJobs',
                element : <MyPostedJobs></MyPostedJobs>
            },
            {
                path : '/viewApplications/:job_ids',
                element : <ViewApplications></ViewApplications>,
                loader : ({params}) => fetch(`http://localhost:5000/job_applications/jobs/${params.job_ids}`)
            },
            {
                path : '/apply/:id',
                element : <PrivateRoute>
                    <JobApply></JobApply>
                </PrivateRoute>
            },
            {
                path : '/myApplication',
                element : <PrivateRoute>
                    <MyApplication></MyApplication>
                </PrivateRoute>
            },
            {
                path : '/details/:id',

                element : <PrivateRoute>
                    <JobDetails></JobDetails>,
                </PrivateRoute>,
                loader : ({params}) => fetch(`http://localhost:5000/jobs/${params.id}`)
            }
        ]
    }
])