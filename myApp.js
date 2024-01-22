let express = require("express");
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", function (req, res) {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/json", function (req, res) {
  res.json(
    process.env.MESSAGE_STYLE == "uppercase"
      ? { message: "HELLO JSON" }
      : { message: "Hello json" },
  );
});

app.get(
  "/now",
  function currTime(req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  },
);

module.exports = app;
