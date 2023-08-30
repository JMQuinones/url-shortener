require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dns = require("node:dns");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

let sites = [];

app.post("/api/shorturl", (req, res) => {
  var isValidUrl = /^https?\:\/\//i.test(req.body.url);
  const last_id = sites.length ? [...sites].pop().id : 0;

  if (isValidUrl) {
    sites.push({ id: last_id + 1, url: req.body.url });
    res.json({
      original_url: req.body.url,
      short_url: last_id + 1,
    });
  } else {
    res.json({ error: "invalid url" });
  }
});

app.get("/api/shorturl/:url", (req, res) => {
  const { url } = req.params;
  if (site) {
    res.redirect(site.url);
  } else {
    res.json({ error: "invalid url" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
