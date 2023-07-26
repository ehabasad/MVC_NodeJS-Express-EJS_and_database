var db = require("../../config/db")
var bcrypt = require('bcryptjs')

const signupView = (req, res) => {
    if (req.session.user) {
        return res.render('home', {
            session: req.session,
            cookieName: req.cookies.cookieName
        })
    } else {
        return res.render("signup", { status: "", session: req.session, cookieName: req.cookies.cookieName });
    }

};

const signupUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    let sql = `SELECT * FROM users WHERE LOWER(email) = ?`
    var params = [email.toLowerCase()]
    db.get(sql, params, async (err, row) => {
        if (err) {
            return res.render("signup", { message: err.message, status: "error", session: req.session, cookieName: req.cookies.cookieName })
        }
        if (row) {
            return res.render("signup", { message: "This email is already in use, please choose another one", status: "error", session: req.session, cookieName: req.cookies.cookieName })
        } else {
            const salt = await bcrypt.genSalt(10)
            var hash_password = await bcrypt.hash(password, salt)
            var data = {
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                password: hash_password
            }

            var insert_sql = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)'
            var params = [data.firstname, data.lastname, data.email, data.password]

            db.run(insert_sql, params, function (err, result) {
                if (err) {
                    res.render("signup", { message: err.message, status: "error", session: req.session, cookieName: req.cookies.cookieName })
                }
                res.render("login", { message: "You are now registered!", status: "successLogin", session: req.session, cookieName: req.cookies.cookieName })
            });
        }
    });
}

module.exports = {
    signupView,
    signupUser,
}
