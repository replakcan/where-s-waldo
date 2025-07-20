const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.getAllTargets);

indexRouter.get("/:targetId", indexController.getTargetById);

module.exports = indexRouter;
