const jwt = require("jsonwebtoken");

const setUser = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    console.log("[setUser] cookies.token exists:", !!req.cookies?.token);
    console.log("[setUser] auth header exists:", !!req.headers.authorization);

    if (!token) {
        console.log("[setUser] No token found, proceeding as guest.");
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("[setUser] User authenticated:", decoded.id);
        next();
    } catch (err) {
        console.error("[setUser] Token verification failed:", err.message);
        // If token is invalid, we just proceed as guest
        next();
    }
};

module.exports = setUser;
