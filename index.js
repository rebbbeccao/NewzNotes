var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 2020;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });

//GET route to scrape website

app.get("/scrape", (req, res) => {
  axios.get("http://www.foxnews.com/lifestyle.html").then(function(response) {
    var $ = cheerio.load(response.data);

    $("article", ".m").each(function(i, element) {
      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr('href');

    //   return result;

      // ,

      // $('.dek').each(function(i, element) {
      //     result.summary = $(this)
      //         .children('a')
      //         .text();
      //     return result;
      // })

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(error) {
          return res.json(error);
        });
    });
    res.send("Scrape Complete!");
  });
});

app.listen(PORT, () => {
  console.log("App running on port " + PORT + "!");
});
