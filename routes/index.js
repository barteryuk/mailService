const router = require("express").Router();
// const Routes = require("./mail");

router.get("/", (req, res) => res.send("welcome to mailService"));
// router.use("/mail", Routes);

module.exports = router;
