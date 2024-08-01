const { Router } = require("express");
const { Health } = require("../handlers/health");

const healthRouter = Router();

healthRouter.get("/", Health);

module.exports = {
  healthRouter,
};
