const express = require("express");
const {httpError} = require("../helpers");
const ctrl = require("../../controllers/auth");
const router = express.Router();
const {authenticate} = require("../../middlewares");
const {schemas} = require("../../models/user");



const validateBody = schema => {
    const func = (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error) {
          next(httpError(400, error.message));
        }
        next()
    }
    return func;
}

router.get("/users/verify/:verificationToken", ctrl.register);

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/users/verify", validateBody(schemas.userEmailSchema),);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/user/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;