var db = require("../config/db")

const commentCreate = async (req, res) => {
    const title = req.params.title;
    const { name, comment } = req.body;
    let sql = `SELECT * FROM comments WHERE title = ?`
    var params = [title]
    console.log(req.body)
    db.get(sql, params, async (err, row) => {
        if (err) {
            return res.json({ message: err.message, status: "error", session: req.session, cookieName: req.cookies.cookieName })
        }
        if (row) {
            return res.json({ message: "already commented", status: "error", cookieName: req.cookies.cookieName })
        } else {
            var data = {
                title: title.trim(),
                name: name.trim(),
                comment: comment.trim(),
            }

            var insert_sql = 'INSERT INTO comments (title, name, comment) VALUES (?,?,?)'
            var params = [data.title, data.name, data.comment]

            db.run(insert_sql, params, function (err, result) {
                if (err) {
                    return res.json({ message: err.message, status: "error", session: req.session, cookieName: req.cookies.cookieName })
                }
                return res.json({ message: "Commentted!", comments: data, id: this.lastID, status: "success", session: req.session, cookieName: req.cookies.cookieName })
            });
        }
    });
}

const commentDelete = async (req, res) => {
    const title = req.params.title;
    let sql = `SELECT * FROM comments WHERE title = ?`
    var params = [title]
    db.get(sql, params, async (err, row) => {
        if (err) {
            return res.json({ message: err.message, status: "error", session: req.session, cookieName: req.cookies.cookieName })
        }

        if (row) {
            var delete_sql = 'DELETE FROM comments WHERE title = ?'
            var params = title

            db.run(delete_sql, params, function (err, result) {
                if (err) {
                    return res.json({ message: err.message, status: "error", session: req.session, cookieName: req.cookies.cookieName })
                }
                return res.json({ message: "deleted!", changes: this.changes, status: "success", session: req.session, cookieName: req.cookies.cookieName })
            });

        } else {
            return res.json({ message: "not found", status: "error", cookieName: req.cookies.cookieName })
        }
    });
}

module.exports = {
    commentCreate,
    commentDelete
}
