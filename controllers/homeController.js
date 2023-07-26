const homeView = (req, res) => {
    res.render('home', { session: req.session, cookieName: req.cookies.cookieName });
}
module.exports = {
    homeView,
}