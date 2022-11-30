import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Account from "../components/account"
import Todo from "../components/todo"
import { authMiddleWare } from "../util/auth"

import {
    AppBar,
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText, styled,
    Toolbar
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import NotesIcon from "@mui/icons-material/Notes";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const drawerWidth = 240

const styles = {
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: 1201
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: 3
    },
    avatar: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0,
        marginTop: 20
    },
    uiProgress: {
        position: 'fixed',
        zIndex: 1000,
        height: '31px',
        width: '31px',
        left: '45%',
        top: '35%'
    },
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);


export default function Home() {
    const [render, setRender] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [uiLoading, setUiLoading] = useState(true);
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("AuthToken");
        navigate("/login")
    }

    useEffect(() => {
        authMiddleWare(navigate);
        const authToken = localStorage.getItem("AuthToken");
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        axios
            .get("https://us-central1-todoapp-bf921.cloudfunctions.net/api/user")
            .then((response) => {
                setFirstName(response.data.userCredentials.firstName);
                setLastName(response.data.userCredentials.lastName);
                setUiLoading(false);
                setProfilePicture(response.data.userCredentials.imageUrl)
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 403) {
                    navigate("/login");
                }
            })
    });

    if (uiLoading) return (
        <Box sx={styles.root}>
            {uiLoading && <CircularProgress size={150} sx={styles.uiProgress} />}
        </Box>
    )
    else return (
        <Box sx={styles.root}>
            <CssBaseline />
            <AppBar position="fixed" sx={styles.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        TodoApp
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={styles.drawer}
                variant="permanent"
                PaperProps={{sx: styles.drawerPaper}}
            >
                <Offset />
                <Divider />
                <center>
                    <Avatar src={profilePicture} sx={styles.avatar} />
                    <p> {firstName} {lastName} </p>
                </center>
                <Divider />
                <List>
                    <ListItemButton key="Todo" onClick={() => setRender(false)}>
                        <ListItemIcon>
                            {' '}
                            <NotesIcon />{' '}
                        </ListItemIcon>
                        <ListItemText primary="Todo" />
                    </ListItemButton>

                    <ListItemButton key="Account" onClick={() => setRender(true)}>
                        <ListItemIcon>
                            {' '}
                            <AccountBoxIcon />{' '}
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItemButton>

                    <ListItemButton key="Logout" onClick={logoutHandler}>
                        <ListItemIcon>
                            {' '}
                            <ExitToAppIcon />{' '}
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Drawer>

            <Box>{render ? <Account /> : <Todo />}</Box>
        </Box>
    )
}