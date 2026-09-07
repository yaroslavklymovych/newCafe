const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function authMiddleware(req, res, next) {
    // 1. Исправлено res на req
    const authHeader = req.headers.authorization;

    // 2. Исправлено startWith на startsWith (с 's' на конце)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

// Экспортируем функцию напрямую (как default export в CJS)
module.exports = authMiddleware;
