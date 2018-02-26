$(document).ready(function() {
  var articleContainer = $("#article-container");
  initialize();

  $(document).on("click", "#scrape-articles", Scrape);

  $(document).on("click", ".save-article", function() {
    var articleToSave = $(this).attr("id");
    console.log(
      "JSON.stringify(articleToSave)=" + JSON.stringify(articleToSave)
    );
    $.ajax({
      method: "PUT",
      url: "/articles/saved/" + articleToSave
    }).then(function() {
      alert("Post success!");
    });
  });

  function initialize() {
    $.get("/articles").then(function(data) {
      articleContainer.empty();
      for (var i = 0; i < data.length; i++) {
        if (!data[i]) {
          renderEmpty();
        } else {
          createCard(data[i]);
        }
      }
    });
  }

  function initialize() {
    $.get("/articles").then(function(data) {
      articleContainer.empty();
      if (data == "") {
        renderEmpty();
      } else {
        for (var i = 0; i < data.length; i++) {
          createCard(data[i]);
        }
      }
    });
  }

  function createCard(article) {
    console.log("createCard, article= " + article);
    
    var articleLink = "http://www.foxnews.com/" + article.link;
    // working -> console.log("createCard, articleLink= " + articleLink);
    articleContainer.append(
      '<div class="card-div>' +
        '<a class="card-header article-header card-link" href=' +
        articleLink +
        '>' +
        article.title +
        '</a>',
      '<a href="#" class="btn btn-primary save-article" id=' +
        article._id +
        '>Save article</a>' +
        // '<p class="card-text">' data[i].summary + '</p>'
        '</div>'
    );

    // Card CSS
    $(".card-div").css("height", "100px");
    $(".card-div").css("width", "100%");
  }

  function renderEmpty() {
    articleContainer.append(
      '<div id="article-container">',
      '<div class="card articles">',
      '<h2 class="card-header article-header">Uh oh! No articles yet :/</h2>',
      '<div class="card-body">',
      '<p class="card-text">Please scrape for acrticles above!</p>',
      "</div>",
      "</div>",
      "</div>"
    );
    // Card CSS
    $(".card-div").css("height", "100px");
    $(".card-div").css("width", "100%");
  }

  function Scrape() {
    $.get("/scrape").then(function(data) {
      initialize();
    });
  }
});
