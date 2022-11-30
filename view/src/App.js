import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#FF5722',
            dark: '#d50000',
            contrastText: '#fff'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Routes>
                        <Route exact path={"todoapp/"} element={<Home />}/>
                        <Route exact path={"todoapp/login"} element={<Login />}/>
                        <Route exact path={"todoapp/signup"} element={<Signup />}/>
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
        );
    }

export default App;
