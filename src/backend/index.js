const express = require('express');
const bcrypt = require("bcrypt");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("./db");

const Users = require("./models/user_schema");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", function(req, res, next) {
    return res.send("Hello Nodejs");
});

app.post("/register", async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8);
        await Users.create(req.body);
        res.json({ result: "success", message: "Register successfully" });
    } catch (err) {
        res.json({ result: "error", message: err.errmsg });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log("Server is running... on port " + port);
});



