
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        // console.log(process.env.SECRET_KEY)
        if (err) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;


