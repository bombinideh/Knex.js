const express = require("express");
const knex = require("./database");

const routes = express.Router();

const UserController = require("./controllers/UserController");

routes.get("/users", UserController.index);
routes.post("/users", UserController.create);
routes.put("/users/:id", UserController.update);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

module.exports = routes;
