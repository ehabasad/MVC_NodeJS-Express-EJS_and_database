const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
var db = require("../../config/db")

const loginView = (req, res) => {
    if (req.session.user) {
        return res.render('home', {
            session: req.session,
            cookieName: req.cookies.cookieName
        })
    } else {
        return res.render('login', {
            status: 'success',
            session: req.session,
            message: "",
            cookieName: req.cookies.cookieName
        })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM users WHERE LOWER(email) = ?`
    var params = [email.trim().toLowerCase()]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.render("login", { message: err.message, status: "error", session: req.session, cookieName: req.cookies.cookieName })
        }
        else {
            if (row) {
                bcrypt.compare(password, row.password, async (err, data) => {
                    if (err) res.render("ligin", { message: err.message, status: "error", cookieName: req.cookies.cookieName });
                    if (data) {
                        const token = JWT.sign(
                            {
                                userid: row.id,
                                email: row.email,
                                firstname: row.firstname,
                                lastname: row.lastname
                            },
                            process.env.TOKEN_SECRET,
                            {
                                expiresIn: "24h"
                            }
                        )
                        req.session.user = {
                            userid: row.id,
                            email: row.email,
                            firstname: row.firstname,
                            lastname: row.lastname
                        };
                        return res.render("home", {
                            status: 'success',
                            token: token,
                            session: req.session
                        })
                    } else {
                        return res.render("login", { message: "Invalid Password!", status: "error", session: req.session, cookieName: req.cookies.cookieName })
                    }
                })
            } else {
                return res.render("login",{ message: "Invalid Email Or Password!", status: "error", session: req.session, cookieName: req.cookies.cookieName })
            }
        }
    });
}

module.exports = {
    loginView,
    loginUser,
}
