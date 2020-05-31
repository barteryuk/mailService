if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
//   const db = require("./config/database");
// const router = require("./routes");
//   const errorHandler = require("./middlewares/errorhandler");

const nodemailer = require("nodemailer");
const body = require("./message");

var transport = {
  service: "gmail",
  auth: {
    user: "barteryukhacktiv8@gmail.com",
    pass: "hacktiv8FINAL!",
  },
};

var transporter = nodemailer.createTransport(transport);

if (process.env.NODE_ENV !== "test") {
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Nodemailer connected to GMAIL");
    }
  });
}

const app = express();

//   db();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(router);
//   app.use(errorHandler);
app.get("/", (req, res, next) => {
  res.send("welcome to mailService");
});
app.post("/sendNewBid", (req, res, next) => {
  const { email } = req.body;

  var mail = {
    from: `Barteryuk <barteryukhacktiv8@gmail.com>`,
    to: email,
    subject: "[Barteryuk] - You got a new bid!!!",
    html: body,
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/assets/logo.png",
        cid: "logo",
      },
    ],
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: "Failed sending email to: " + email,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Email sent to: " + email,
      });
    }
  });
});

module.exports = app;
