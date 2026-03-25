const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
}));

const jwt = require("jsonwebtoken");

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
    (req, res) => {
        // Successful authentication
        if (req.user) {
            const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET || "woofmate_secret", {
                expiresIn: "1h",
            });
            res.cookie("token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                maxAge: 24 * 60 * 60 * 1000,
            });
        }
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
