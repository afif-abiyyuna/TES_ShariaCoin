const routes = require("express").Router();
const userController = require("../controllers/user.controller");

routes.post("/register", userController.register);
routes.post("/login", userController.login);
routes.post("/get", userController.showUser);

module.exports = routes;