import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
  } from "react-router-dom";
import Landing from "../Modules/Landing";
import Signin from "../Modules/Signin";
import { Navigate } from "react-router-dom";


const PrivateRouting = ({children})=>{
    const isUserLoggedIn = window.localStorage.getItem('token') || false;
    const isAuthPages = window.location.pathname.includes('signin') || window.location.pathname.includes('signup')
    if (!isUserLoggedIn && isAuthPages) {
        return children;
    } else if(isUserLoggedIn && !isAuthPages){
        return children;
    }
    else if(isUserLoggedIn && isAuthPages){
        return <Navigate to="/" replace/>;
    }
    else{
        return <Navigate to="/signin" replace/>;
    }
}

const Routes = () => {
const backendurl = "https://backend-of-game.onrender.com";
// const backendurl = "http://localhost:5000";

const router = createBrowserRouter(
    createRoutesFromElements(
        <> 
        <Route path="/" element={<PrivateRouting><Landing url={backendurl} /></PrivateRouting> }></Route>
        <Route path="/signin" element={<PrivateRouting><Signin url={backendurl}/></PrivateRouting>}></Route>
        </>
    )
);
return (
    <>
    <RouterProvider router={router}/>
    </>
)



}

 export default Routes;