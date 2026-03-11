const jwt = require("jsonwebtoken");

const setUser = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // If token is invalid, we just proceed as guest
        next();
    }
};

module.exports = setUser;
