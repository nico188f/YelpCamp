const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const users = require("../controllers/users");

const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middleware");

router
    .route("/register")
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register));

router
    .route("/login")
    .get(users.renderLoginForm)
    .post(
        storeReturnTo,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        users.login
    );

router.get("/logout", users.logout);

module.exports = router;
