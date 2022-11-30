import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import dayjs from 'dayjs';

import {
    AppBar,
    Box,
    Card,
    CardActions,
    CardContent,
    Dialog,
    IconButton,
    Slide,
    styled,
    Toolbar
} from "@mui/material";
import Typography from "@mui/material/Typography";
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";

const styles = {
    content: {
        flexGrow: 1,
        padding: 3,
    },
    title: {
        marginLeft: 2,
        flex: 1
    },
    submitButton: {
        display: 'block',
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        top: 14,
        right: 10
    },
    floatingButton: {
        position: 'fixed',
        bottom: 0,
        right: 0
    },
    form: {
        width: '98%',
        marginLeft: 13,
        marginTop: 3
    },
    root: {
        minWidth: 470
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    pos: {
        marginBottom: 12
    },
    uiProgress: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '50%',
        top: '35%'
    },
    dialogueStyle: {
        maxWidth: '50%'
    },
    viewRoot: {
        margin: 0,
        padding: 2
    },
    closeButton: {
        position: 'absolute',
        right: 1,
        top: 1,
        color: "grey"
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction={"up"} ref={ref} children={props.children} {...props} />;
})

const Offset = styled('div')(({theme}) => theme.mixins.toolbar)


export default function Todo() {
    const [todos, setTodos] = useState({});
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [todoId, setTodoId] = useState('');
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    const [uiLoading, setUiLoading] = useState(true);
    const [buttonType, setButtonType] = useState('');
    const [viewOpen, setViewOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        authMiddleWare(navigate);
        const authToken = localStorage.getItem("AuthToken");
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        axios
            .get("https://us-central1-todoapp-bf921.cloudfunctions.net/api/todos")
            .then((response) => {
                setTodos(response.data);
                setUiLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    navigate("/login");
                }
                console.log(error);
            })
    }, [navigate]);

    const deleteTodoHandler = (data) => {
        authMiddleWare(navigate);
        const authToken = localStorage.getItem("AuthToken");
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        let todoId = data.todo.todoId;
        axios
            .delete(`https://us-central1-todoapp-bf921.cloudfunctions.net/api/todo/${todoId}`)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleEditClickOpen = (data) => {
        setTitle(data.todo.title);
        setBody(data.todo.body);
        setTodoId(data.todo.todoId);
        setButtonType("Edit");
        setOpen(true);
    }

    const handleViewOpen = (data) => {
        setTitle(data.todo.title);
        setBody(data.todo.body);
        setViewOpen(true);
    }

    const handleClickOpen = () => {
        setTodoId('');
        setTitle('');
        setBody('');
        setButtonType('');
        setOpen(true);
    }

    const handleSubmit = (event) => {
        authMiddleWare(navigate);
        event.preventDefault();

        const userTodo = {
            title: title,
            body: body
        }

        let options;

        if (buttonType === "Edit") {
            options = {
                url: `https://us-central1-todoapp-bf921.cloudfunctions.net/api/todo/${todoId}`,
                method: "put",
                data: userTodo
            };
        } else {
            options = {
                url: "https://us-central1-todoapp-bf921.cloudfunctions.net/api/todo",
                method: "post",
                data:userTodo
            };
        }
        const authToken = localStorage.getItem("AuthToken");
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        axios(options)
            .then(() => {
                setOpen(false);
                window.location.reload();
            })
            .catch((error) => {
                setOpen(true);
                setErrors(error.response.data);
                console.log(error);
            })
    }

    const handleViewClose = () => {
        setViewOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const DialogueContent = styled('DialogContent')(({ theme }) => ({
        viewRoot: {
            padding: theme.spacing(2)
        }
    }))

    dayjs.extend(relativeTime);

    if (uiLoading === true) return (
        <Box sx={styles.content}>
            <Offset />
            {uiLoading && <CircularProgress size={150} sx={styles.uiProgress} />}
        </Box>
    )
    else return (
        <Box sx={styles.content}>
            <Offset />

            <IconButton
                sx={styles.floatingButton}
                color="primary"
                aria-label="Add Todo"
                onClick={handleClickOpen}
            >
                <AddCircleIcon style={{ fontSize: 60 }} />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={styles.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" sx={styles.title}>
                            {buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo'}
                        </Typography>
                        <Button
                            autoFocus
                            color="inherit"
                            onClick={handleSubmit}
                            sx={styles.submitButton}
                        >
                            {buttonType === 'Edit' ? 'Save' : 'Submit'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Offset />
                <Box sx={styles.form}>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="todoTitle"
                                    label="Todo Title"
                                    name="title"
                                    autoComplete="todoTitle"
                                    helperText={errors.title}
                                    value={title}
                                    error={!!errors.title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="todoDetails"
                                    label="Todo Details"
                                    name="body"
                                    autoComplete="todoDetails"
                                    multiline
                                    rows={25}
                                    rowsmax={25}
                                    helperText={errors.body}
                                    value={body}
                                    error={!!errors.body}
                                    onChange={e => setBody(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Dialog>

            <Grid container spacing={2}>
                {todos.map((todo) => (
                    <Grid item xs={12} sm={6} key={todo.todoId}>
                        <Card sx={styles.root} variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {todo.title}
                                </Typography>
                                <Typography sx={styles.pos} color="textSecondary">
                                    {dayjs(todo.createdAt).fromNow()}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {`${todo.body.substring(0, 65)}`}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleViewOpen({ todo })}>
                                    {' '}
                                    View{' '}
                                </Button>
                                <Button size="small" color="primary" onClick={() => handleEditClickOpen({ todo })}>
                                    Edit
                                </Button>
                                <Button size="small" color="primary" onClick={() => deleteTodoHandler({ todo })}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                onClose={handleViewClose}
                aria-labelledby="customized-dialog-title"
                open={viewOpen}
                fullWidth
                PaperProps={{ sx: styles.dialogueStyle }}
            >
                <DialogTitle disabletypography={"true"} id="customized-dialog-title" sx={styles.root} onClose={handleViewClose}>
                    <Typography variant="h6">{title}</Typography>
                    {handleViewClose ? (
                        <IconButton aria-label="close" sx={styles.closeButton} onClick={handleViewClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogueContent>
                    <TextField
                        fullWidth
                        id="todoDetails"
                        name="body"
                        multiline
                        readOnly
                        rows={1}
                        rowsmax={25}
                        value={body}
                        InputProps={{
                            disableunderline: "true"
                        }}
                    />
                </DialogueContent>
            </Dialog>
        </Box>
    )
}