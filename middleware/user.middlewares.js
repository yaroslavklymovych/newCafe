function validateUser(req, res, next) {
    const { name, email, password} = req.body;  
    if (!name || name.trim().length < 2 || !email || email.trim().length < 5) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    next();
}
function validateUpdateUser(req, res, next) {
    const { name, email } = req.body; 
    if ((name && name.trim().length < 2) || (email && email.trim().length < 5)) {
        return res.status(400).json({ error: 'Name must be at least 2 characters and email must be valid' });
    }   
    next();
}

module.exports = {
    validateUser,
    validateUpdateUser
};