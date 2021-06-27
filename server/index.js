const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "u2fjo01yctnytsen",
    host: "baa2yyqzyjtiq90fifsr-mysql.services.clever-cloud.com",
    password: "ezKyOhnLDLUXau5estNG",
    database: "baa2yyqzyjtiq90fifsr",
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
