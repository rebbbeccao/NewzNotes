
$(document).ready(function() {
  var articleContainer = $("#article-container");
  initialize();

  $(document).on("click", "#scrape-articles", Scrape);
  $(document).on("click", "#save-article", ArticleSave);

  function initialize() {
    articleContainer.empty();
    $.get("/articles").then(function(data) {
      for (var i = 0; i < data.length; i++) {
        // console.log("data[i].title=" + data[i].title);
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
      '<a class="card-header article-header" href=' +
        article.link +
        'class="card-link">' +
        article.title +
        "</a>",
      '<a href="#" class="btn btn-primary" id="save-article">Save article</a>'
      // '<p class="card-text">' data[i].summary + '</p>'
    );

    articleContainer.attr("id", article._id);

  }

  function renderEmpty() {
    var emptycard = $(


      [
        '<div id="article-container">',
        '<div class="card articles">',
        '<h2 class="card-header article-header">Uh oh! No articles yet :/</h2>',
        '<div class="card-body">',
        '<p class="card-text">Please scrape for acrticles above!</p>',
        "</div>",
        "</div>",
        "</div>"
      ] /*.join("")*/
    );
    articleContainer.append(emptycard);
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
