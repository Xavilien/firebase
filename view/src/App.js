import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup"

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path={"/login"} element={<Login />}/>
                    <Route exact path={"/signup"} element={<Signup />}/>
                </Routes>
            </div>
        </Router>
        );
    }

export default App;
