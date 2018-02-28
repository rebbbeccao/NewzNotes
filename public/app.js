$(document).ready(function() {
  var articleContainer = $("#article-container");
  initialize();

  $(document).on("click", "#scrape-articles", Scrape);
  // $(document).on("click", "#go-to-saved", initializeSaved);

  $(document).on("click", ".save-article", function() {
    var articleToSave = $(this).attr("id");
    var currentCardId = $("#card" + articleToSave).attr("id");
    console.log(
      "JSON.stringify(articleToSave)=" + JSON.stringify(articleToSave)
    );
   
    console.log("currentCard = " + currentCardId);


    $.ajax({
      method: "PUT",
      url: "/articles/saved/" + articleToSave
    }).then(function() {
      console.log(" Save article post success!");
    });

    

    $("#"+currentCardId).remove();
    $("#"+articleToSave).remove();


    return articleContainer;
  });

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
      '<div class="card-div" id="card' +
        article._id +
        '">' +
        '<div class="card-container">' +
        '<a class="card-header article-header card-link" href=' +
        articleLink +
        '>' +
        article.title +
        '</a>',
      '<a href="#" class="btn btn-primary save-article" id=' +
        article._id +
        '>Save article</a>' +
        '</div>' +
        // '<p class="card-text">' data[i].summary + '</p>'
        '</div>'
    );

    // Card CSS
    $(".card-div").css("height", "40px");
    $(".card-div").css("width", "100%");
    $(".card-div").css("margin", "25px");
    $(".card-div").css("border", "2px");
    $(articleContainer).css("padding", "10px");
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
