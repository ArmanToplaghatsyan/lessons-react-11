import React from "react";
import { useRoutes } from "react-router-dom";
import { MyError } from "../page/MyError";
import { Layout } from "../page/Layout";
import { Login } from "../page/Login";
import { MyPost } from "../page/MyPost";
import { Profile } from "../page/Profile";
import { Register } from "../page/Register";

export const MyRoutes = React.memo(() => {
    const routes = useRoutes([
        {
            path: '',
            element: <Layout/>,
            children:[
                {path: '', element: <Login/>},
                {path: 'mypost', element: <MyPost/>},
                {path: 'profile', element: <Profile/>},
                {path: 'register', element: <Register/>},

            ]

        },
        {
            path: '*',
            element: <MyError/>
        }
    ]);
    
    return routes
})