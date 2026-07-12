function checkRole(allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (req.user.role !== allowedRoles) {
            return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }
        next()
    };
}


module.exports = { checkRole };