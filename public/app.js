// Grab the scrapped articles as a json
$.getJSON("/articles", function(data) {
//   var resultdata = JSON.stringify(data);
//   console.log("data[] = " + resultdata);
  for (var i = 0; i < data.length; i++) {
    
    
    //   console.log(data[i].link);
    //   console.log(data[i].title);
    //   console.log(data[i].summary);
    console.log(JSON.stringify(data[i]));

    
    $(".article-header").append(
    
        '<a class="card-header article-header" href=' +
        data[i].link +
        'class="card-link">' +
        data[i].title +
        "</a>" 
    );

    $(".card-body").append(
      
        '<p class="card-text">' +
        data[i].summary +
        "</p>" +
        '<a href="#" class="btn btn-primary">' +
        "Save article" +
        "</a>" 
    )
};
});
