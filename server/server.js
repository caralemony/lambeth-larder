const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const routes = require("./controllers/routes");

app.set("port", process.env.PORT || 3001);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.listen("port", () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
