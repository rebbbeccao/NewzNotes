$(document).ready(function() {
  var articleContainer = $("#saved-article-container");
  initializeSaved();

  function initializeSaved() {
    $.get("/articles/saved").then(function(data) {
      articleContainer.empty();
      if (data == "") {
        renderSavedEmpty();
      } else {
        for (var i = 0; i < data.length; i++) {
          console.log(
            "renderSavedArticles(data[i]), data[i]= " + JSON.stringify(data[i])
          );
          renderSavedArticles(data[i]);
        }
      }
    });
  }

  function renderSavedArticles(savedarticle) {
    console.log("createCard, savedarticle= " + savedarticle);
    var articleLink = "http://www.foxnews.com/" + savedarticle.link;
    // working -> console.log("createCard, articleLink= " + articleLink);
    $("#saved-article-container").append(
      '<div class="card-div>' +
        '<a class="card-header saved-article-header card-link" href=' +
        articleLink +
        ">" +
        savedarticle.title +
        "</a>",
      '<a href="#" class="btn btn-primary add-note" id=' +
        savedarticle._id +
        ">Add Note</a>" +
        // '<p class="card-text">' data[i].summary + '</p>'
        "</div>"
    );
    // Card CSS
    $(".card-div").css("height", "100px");
    $(".card-div").css("width", "100%");
  }

  function renderSavedEmpty() {
    articleContainer.append(
      '<div class="card saved-articles">',
      '<h2 class="card-header saved-article-header">Uh oh! No saved articles yet :/</h2>',
      '<div class="card-body">',
      '<p class="saved-card-text">Please return to the Homepage to save acrticles</p>',
      "</div>",
      "</div>",
      "</div>"
    );
    // Saved Card CSS
    // $(".saved-card-div").css("height", "100px");
    // $(".saved-card-div").css("width", "100%");
  }

  // $(document).on("click", ".add-note", function() {
  //   var thisId = $(this).attr("id");

  //   console.log("JSON.stringify(thisId)=" + JSON.stringify(thisId));

  //   $.ajax({
  //     method: "POST",
  //     url: "/articles/notes/" + thisId,
  //     data: {
  //       body: $("textarea").val()
  //     }
  //   }).then(function(data) {
  //     console.log("data=" + JSON.stringify(data));
  //   });



    // $.get("/articles/notes/:id").then(function(data) {
    //   articleContainer.empty();
    //   if (data == "") {
    //     renderSavedEmpty();
    //   } else {
    //     for (var i = 0; i < data.length; i++) {
    //       console.log("renderSavedArticles(data[i]), data[i]= " + JSON.stringify(data[i]));
    //       renderSavedArticles(data[i]);
    //     }
    //   }
    // });
    // }
  });
// };
