

function clearClick(){
    $("li").hide();
}

function printInfo(title, originalTitle, language, vote){

  var ul = $("#ul");
  var data = {
    title: title,
    originalTitle : originalTitle,
    language: language,
    vote: createStars(vote)
  }

  var template = $("#entry-template").html();
  var compiled = Handlebars.compile(template);
  var final = compiled(data);
  ul.append(final)

}

function createStars(vote){

  var finalHtml = "";

  for (var i = 1; i <= 5; i++) {
    if (i <= vote) {
      finalHtml += "<i class=\"fas fa-star\"></i>";
    } else {
      finalHtml += "<i class=\"far fa-star\"></i>";
      
    }
  }

  return finalHtml;

}

function getData (){

  var query = $("#input").val();

  var outdata = {
    api_key: "0b65689c44315b59b457fc2369ad89c7",
    language: "it-IT",
    query: query,
  }

  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outdata,
    success: function(data){

      var results = data.results;

      for (var i = 0; i < results.length; i++) {
        var title = results[i].title;
        var originalTitle = results[i].original_title;
        var language = results[i].original_language;
        var vote = results[i].vote_average;
        vote = Math.floor((vote)/2)
        console.log(vote);

        printInfo(title, originalTitle, language, vote)
      }
    },
    error: function(request, state, error){}

  })
}





function init() {

  $("button").click(function(){

    getData();
    clearClick();

  });

}

$(document).ready(init)
