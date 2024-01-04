import React from "react";
import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./utils/authContext";
import Login from './pages/Form';
import Index from './pages/Index';
import Categories from './pages/Categories';
import Source from './pages/NewSource';
import News from './pages/News';
import Register from './pages/Register';
//import PrivateRoute from './routes/PrivateRoute';
//import PublicRoute from './routes/PublicRoute';

function app() {
    return (
        <AuthContextProvider>
            <div className="app">
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/index" element={<Index />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/sources" element={<Source />} />
                      
                    </Routes>
                </Router>
            </div>
        </AuthContextProvider>




    );
}

export default app;
