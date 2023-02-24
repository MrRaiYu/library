import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./helper";
import SignUp from "./Auth/SignUp";
import Home from "./home";
import SignIn from "./Auth/SignIn";
import CreateBooks from "./Books/createBooks";
import ImageUpload from "./test";
import Profile from "./Profile";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={getToken() ? <Home /> : <Navigate to="/login" />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/createBook" element={<CreateBooks />} />
            <Route path="/Profile" element={<Profile />} />
        </Routes>
    );
};

export default AppRoutes;