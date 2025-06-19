// Route Protection
// responsible for checking if a user is already authenticated before granting access to protected resources.

module.exports = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/auth/login');
}


