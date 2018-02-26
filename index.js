var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var Path = require("path");

var db = require("./models");

var PORT = process.env.PORT || 2020;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/newznotes";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/newznotes", {
//   useMongoClient: true
// });

//GET route to scrape website

app.get("/", function(req, res) {
  res.send("Hello World NewzNote App");
});

app.get("/scrape", function(req, res) {
  axios.get("http://www.foxnews.com/lifestyle.html").then(function(response) {
    var $ = cheerio.load(response.data);

    $("h2").each(function(i, element) {
      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      //   console.log(result.title);
      //   console.log(result.link);

      db.Article.create(result)

        .then(function(dbArticle) {
          console.log(dbArticle);
          //return res.json(result);
        })
        .catch(function(error) {
          return res.json(error);
        });
    });
    res.send("Scrape Complete!");
  });
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
      console.log("dbArticle = " + dbArticle);
    })
    .catch(function(error) {
      res.json(error);
    });
});

app.get("/articles/:id", function(req, res) {
  db.Article.find({ _id: req.params.id })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(error) {
      res.json(error);
    });
});
//route not working throwing cast error (?)
app.get("/articles/saved", function(req, res) {
  db.Article.findAll({ saved: true })

  .then(function(dbSaved) {
    console.log("dbSaved=" + dbSaved);
    res.json(dbSaved);
      console.log("dbSaved=" + dbSaved);
  })
  .catch(function(error) {
      res.json(error);
  });

//   var query = { saved: true };
//   db.Article.find(query).ObjectId();
});

app.put("/articles/saved/:id", function(req, res) {
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(error) {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log("App running on port " + PORT + "!");
});
