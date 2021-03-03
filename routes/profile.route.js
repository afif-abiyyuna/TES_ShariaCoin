const routes = require("express").Router();
const profileController = require("../controllers/profile.controller");
const authJwt = require("../middlewares/authJwt");

routes.use(authJwt);
routes.post("/input", profileController.inputProfile);
routes.patch("/edit", profileController.editProfile);
routes.delete("/delete", profileController.deleteProfile);





module.exports = profileController;