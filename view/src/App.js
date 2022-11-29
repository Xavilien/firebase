import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" exact element={<Login />}/>
                </Routes>
            </div>
        </Router>
        );
    }

export default App;
