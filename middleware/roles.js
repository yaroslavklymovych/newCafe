const checkRole = (requiredRole) => {
    return (req, res, next) => {
        // Если пользователя нет в req (токен не был передан)
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Если роль пользователя не совпадает с требуемой
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        next();
    };
};

module.exports = { checkRole };