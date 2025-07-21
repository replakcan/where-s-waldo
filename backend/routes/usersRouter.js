const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter
  .route("/")
  .get(usersController.findManyUsers)
  .post(usersController.createUser);

module.exports = usersRouter;
