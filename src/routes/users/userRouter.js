const express = require("express");
const userRouter = express.Router();

//Auth middlewares
const authenticateAdmin = require("../../middlewares/authenticateAdmin");
const authenticateUser = require("../../middlewares/authenticateUser");

//User controllers
const signupUserController = require("../../controller/users/signupUserController");
const loginUserController = require("../../controller/users/loginUserController");
const fetchAllUsers = require("../../controller/users/getAllUsers");
const addUser = require("../../controller/users/addUser");
const deleteUser = require("../../controller/users/deleteUser");
const updatePassword = require("../../controller/users/updatePassword");

//User routes
userRouter.post('/signup', signupUserController);
userRouter.post('/login', loginUserController);
userRouter.get('/users', authenticateAdmin, fetchAllUsers);
userRouter.post('/users/add-user', authenticateAdmin, addUser);
userRouter.delete('/users/:user_id', authenticateAdmin, deleteUser);
userRouter.put('/users/update-password', authenticateUser, updatePassword);

module.exports = userRouter;
