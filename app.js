const path = require("path");
const express = require("express");

const connect = require("./connection/connect");
const adminRouter = require("./routes/admin");
const ownerRouter = require("./routes/owner");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", adminRouter);
app.use("/", ownerRouter)

app.use(function (error, req, res, next) {
  res.send("Oop something goes wrong!");
});

connect()
  .catch((err) => {
    throw err;
  })
  .then(() => {
    app.listen(3000, console.log("App is running at: http://localhost:3000"));
  });
