
$(document).ready(function() {
  var articleContainer = $("#article-container");
  initialize();

  $(document).on("click", "#scrape-articles", Scrape);
  $(document).on("click", "#save-article", ArticleSave);

  function initialize() {
    
    $.get("/articles").then(function(data) {
        articleContainer.empty();
        for (var i = 0; i < data.length; i++) {
        if (data[i]) {
          createCard(data[i]);
        } else {
          renderEmpty();
        }
      }
    });
  }

  function createCard(article) {
    console.log("createCard, article= " + article);
    articleContainer.append(
        '<div class="card-div">' +
      '<a class="card-header article-header card-link" href=' +
        article.link +
        '>' +
        article.title +
        "</a>",
      '<a href="#" class="btn btn-primary" id="save-article">Save article</a>' +
      // '<p class="card-text">' data[i].summary + '</p>'
        '</div>'
    );
    
    articleContainer.attr("id", article._id);
    $(".card-div").css("height", "100px");
    $(".card-div").css("width", "100%");
    // $(".card-div").css("align-content", "stretch");
    // $(".card-header article-header card-link").css("display", "inline-block");
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
  }

  function ArticleSave() {
    var articleToSave = $(this);
    console.log(articleToSave);
  }

  function Scrape() {
    $.get("/scrape").then(function(data) {
      initialize();
    });
  }
});
