const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "signup"
})
app.post('/signup',(req, res) => {
    const sql = "INSERT INTO login ('name' , 'email', 'password') VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data)=>{
        if (err){
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.listen(3306,() => {
    console.log("listening");
})