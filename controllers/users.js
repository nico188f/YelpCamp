const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
    res.render("users/register");
};

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, e => {
            if (e) return next(e);
            req.flash("success", "Welcome to YelpCamp!");
            res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectURL = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectURL);
};

module.exports.logout = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye");
        res.redirect("/campgrounds");
    });
};
