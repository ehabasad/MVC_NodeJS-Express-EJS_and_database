var sqlite3 = require('sqlite3').verbose()
var bcrypt = require('bcryptjs')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname text, 
            lastname text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            async (err) => {
                if (err) {
                    // Table already created
                } else {
                    const salt = await bcrypt.genSalt(10)
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)'
                    db.run(insert, ["admin", "admin", "admin@example.com", await bcrypt.hash("admin123456", salt)])
                    db.run(insert, ["user", "user", "user@example.com", await bcrypt.hash("user123456", salt)])
                }
            });
        db.run(`CREATE TABLE comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title text, 
                name int, 
                comment text
                )`,
            async (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO comments (title, name, comment) VALUES (?,?,?)'
                    db.run(insert, ["admin", "admin", "comment"])
                    db.run(insert, ["user", "user", "comment"])
                }
            });
    }
});


module.exports = db