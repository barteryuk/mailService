if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
//   const db = require("./config/database");
const router = require("./routes");
//   const errorHandler = require("./middlewares/errorhandler");

const nodemailer = require("nodemailer");
var transport = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("All works fine, congratz!");
  }
});

const app = express();

//   db();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(router);
//   app.use(errorHandler);

app.post("/send", (req, res, next) => {
  const name = req.body.name || "test";
  const email = req.body.email || "robinsalim222@gmail.com";
  const message = req.body.messageHtml || "testing nodemailer";

  var mail = {
    from: name,
    to: email,
    subject: "[Barteryuk] - You got a new bid invite!!!",
    html: message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail",
      });
    } else {
      res.json({
        msg: "success",
      });
    }
  });
});

module.exports = app;
