const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "scheduler",
});

app.get("/search", (req, res) => {
    db.query(
        `SELECT DISTINCT name FROM teachers WHERE name LIKE '${req.query.name}%'`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.get("/data", (req, res) => {
    db.query(
        `SELECT starttime, endtime, task FROM teachers WHERE name
        = '${req.query.name.toLowerCase()}' AND date LIKE '${req.query.date}%'`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.get("/profile", (req, res) => {
    console.log(req.query.name);
    db.query(
        `SELECT date, starttime, endtime, task FROM teachers 
        WHERE name = '${req.query.name}' ORDER BY date , starttime `,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
// app.get("/day", (req, res) => {
//     console.log("get request to day");
//     db.query(
//         `SELECT starttime,endtime,task FROM teachers WHERE name = ${req.query.name} AND date = ${req.query.date}`,
//         (err, result) => {
//             if (err) {q
//                 console.log(err);
//             } else {
//                 res.send(result);
//             }
//         }
//     );
// });
app.get("/end", (req, res) => {
    db.query("SELECT * FROM teachers", (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.post("/insert", (req, res) => {
  console.log(req);
    db.query(
        "INSERT INTO teachers (name,date,starttime,endtime,task) VALUES (?,?,?,?,?)",
        [
            req.body.params.name.toLowerCase(),
            req.body.params.date,
            req.body.params.start,
            req.body.params.end,
            req.body.params.task.toLowerCase(),
        ],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("insertion Successful");
            }
        }
    );
});
app.get("/check", (req, res) => {
    console.log(req.query.starttime);
    console.log(req.query.endtime);
    console.log(req.query.name);

    db.query(
        `SELECT COUNT(*) FROM teachers WHERE endtime > ${req.query.starttime} AND starttime < ${req.query.endtime}AND name = ${req.query.name}`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.listen(process.env.PORT || PORT, () => {
    console.log("Your server is running on port 3001");
});
// CLEVER_TOKEN=c96ff22614534a5aa72fc167235c2120
// CLEVER_SECRET=50f1f536b1eb48a79e98e205cf5a49d5