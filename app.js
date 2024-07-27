const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const authRouter = require("./routes/auth");
const hisaabRouter = require("./routes/hisaab")

require("dotenv").config();
console.log(process.env.EXPRESS_KEY);
const db = require("./config/mongoose-connection")

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);

app.use("/hisaab", hisaabRouter);

app.listen(process.env.PORT || 3000);