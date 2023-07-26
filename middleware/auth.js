const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config()

const auth = (req, res, next) => {
    const session = req.session.user

    if (!session || session === 'undefined') {
        return res.redirect('/login')
    } else {
        return res.render('home', {session: req.session})
    }
}

module.exports = auth