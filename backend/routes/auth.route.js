const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
}));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
    (req, res) => {
        // Successful authentication, redirect to frontend.
        res.redirect("http://localhost:5173/");
    }
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("http://localhost:5173/");
    });
});

router.get("/user", (req, res) => {
    res.send(req.user);
});

module.exports = router;
