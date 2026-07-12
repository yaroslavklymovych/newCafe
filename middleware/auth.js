const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
        
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {auth};  