const functions = require("firebase-functions");
const app = require("express")();

const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo
} = require("./API/todos");

// Todos
app.get("/todos", getAllTodos);
app.post("/todo", postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put("/todo/:todoId", editTodo);

const {
    loginUser,
    signUpUser
} = require('./API/users')

// Users
app.post("/login", loginUser);
app.post("/signup", signUpUser);

exports.api = functions.https.onRequest(app);
