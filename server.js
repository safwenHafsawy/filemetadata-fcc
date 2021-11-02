var express = require("express");
var cors = require("cors");
require("dotenv").config();
const route = require("./routes/routes");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api/fileanalyse", route);

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
