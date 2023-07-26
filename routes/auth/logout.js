const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    req.session.user = null;
    res.render('login', {
        status: 'success',
        session: req.session,
        message: "",
        cookieName: req.cookies.cookieName
    })
});

module.exports = router;