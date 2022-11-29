import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { authMiddleWare } from "../util/auth"

import {Box, Card, CardActions, CardContent, Divider, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const styles = {
    content: {
        flexGrow: 1,
        padding: 3
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
    root: {},
    details: {
        display: 'flex'
    },
    avatar: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    locationText: {
        paddingLeft: '15px'
    },
    buttonProperty: {
        position: 'absolute',
        top: '50%'
    },
    uiProgress: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    progress: {
        position: 'absolute'
    },
    uploadButton: {
        marginLeft: '8px',
        margin: 1
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    submitButton: {
        marginTop: '10px'
    }
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);


export default function Account(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [username, setUsername] = useState('');
    const [uiLoading, setUiLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [imageError, setImageError] = useState('');
    const [image, setImage] = useState(Object);
    const navigate = useNavigate();

    useEffect(() => {
        authMiddleWare(navigate);
        const authToken = localStorage.getItem("AuthToken");
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        axios
            .get("/user")
            .then((response) => {
                setFirstName(response.data.userCredentials.firstName);
                setLastName(response.data.userCredentials.lastName);
                setEmail(response.data.userCredentials.email);
                setPhoneNumber(response.data.userCredentials.phoneNumber);
                setCountry(response.data.userCredentials.country);
                setUsername(response.data.userCredentials.username);
                setUiLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    navigate("/login");
                }
                console.log(error);
            })
    });

    const profilePictureHandler = (event) => {
        event.preventDefault();
        setUiLoading(true);
        authMiddleWare(navigate);
        const authToken = localStorage.getItem('AuthToken');
        let form_data = new FormData();
        form_data.append('image', image);
        // form_data.append('content', content);
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        axios.defaults.headers.post["Content-Type"] = 'multipart/form-data'
        axios
            .post('/user/image', form_data)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error);
                setUiLoading(false);
                setImageError('Error in posting the data');
            });
    };

    const updateFormValues = (event) => {
        event.preventDefault();
        setButtonLoading(true);
        authMiddleWare(navigate);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        const formRequest = {
            firstName: firstName,
            lastName: lastName,
            country: country
        };
        axios
            .post('/user', formRequest)
            .then(() => {
                setButtonLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    navigate('/login');
                }
                console.log(error);
                setButtonLoading(false);
            });
    };

    if (uiLoading === true) return (
        <Box sx={styles.content}>
            <Offset />
            {uiLoading && <CircularProgress size={150} sx={styles.uiProgress} />}
        </Box>
    )
    else return (
        <Box sx={styles.content}>
            <Offset />
            <Card {...props}>
                <CardContent>
                    <Box sx={styles.details}>
                        <div>
                            <Typography sx={styles.locationText} gutterBottom variant="h4">
                                {firstName} {lastName}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                size="small"
                                startIcon={<CloudUploadIcon />}
                                sx={styles.uploadButton}
                                onClick={profilePictureHandler}
                            >
                                Upload Photo
                            </Button>
                            <input type="file" onChange={e => setImage(e.target.files[0])} />

                            {imageError ? (
                                <Box sx={styles.customError}>
                                    {' '}
                                    Wrong Image Format || Supported Format are PNG and JPG
                                </Box>
                            ) : false}
                        </div>
                    </Box>
                    <Box sx={styles.progress} />
                </CardContent>
                <Divider />
            </Card>

            <br />
            <Card {...props}>
                <form autoComplete="off" noValidate>
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="First name"
                                    margin="dense"
                                    name="firstName"
                                    variant="outlined"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    margin="dense"
                                    name="lastName"
                                    variant="outlined"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="dense"
                                    name="email"
                                    variant="outlined"
                                    disabled={true}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    margin="dense"
                                    name="phone"
                                    type="number"
                                    variant="outlined"
                                    disabled={true}
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="User Name"
                                    margin="dense"
                                    name="userHandle"
                                    disabled={true}
                                    variant="outlined"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    margin="dense"
                                    name="country"
                                    variant="outlined"
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions />
                </form>
            </Card>
            <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={styles.submitButton}
                onClick={updateFormValues}
                disabled={
                    buttonLoading ||
                    !firstName ||
                    !lastName ||
                    !country
                }
            >
                Save details
                {buttonLoading && <CircularProgress size={30} sx={styles.progress} />}
            </Button>
        </Box>
    )
}