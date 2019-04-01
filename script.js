

function clearClick(){
    $(".film, .tv").hide();
}

function printInfoFilm(title, originalTitle, language, vote, imgUrlFinal){

  var container = $("#film");
  var data = {
    title: title,
    originalTitle : originalTitle,
    language: language,
    vote: createStars(vote),
    imgUrl: imgUrlFinal
  }

  if (language== "en") {
    data.language = "🇬🇧"
  } else if (language== "it") {
    data.language = "🇮🇹"
  }

  var template = $("#entry-template").html();
  var compiled = Handlebars.compile(template);
  var final = compiled(data);
  container.append(final)

}

function printInfoTV (name, originalName, language, vote, imgTVUrl) {

  var container = $("#tv");
  var data = {
    name: name,
    originalName : originalName,
    language: language,
    vote: createStars(vote),
    imgTVUrl: imgTVUrl
  }

  if (language== "en") {
    data.language = "🇬🇧"
  } else if (language== "it") {
    data.language = "🇮🇹"
  }

  var template = $("#entry-template-TV").html();
  var compiled = Handlebars.compile(template);
  var final = compiled(data);
  container.append(final)
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
        var imgUrl = results[i].poster_path;
        var imgUrlFinal = "https://image.tmdb.org/t/p/w185" + imgUrl;

        vote = Math.floor((vote)/2);
        console.log(imgUrlFinal);

        printInfoFilm(title, originalTitle, language, vote, imgUrlFinal);

      }
    },
    error: function(request, state, error){}

  })

  $.ajax({

    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: outdata,
    success: function(data){

      var results = data.results;

      for (var i = 0; i < results.length; i++) {
        var name = results[i].name;
        var originalName = results[i].original_name;
        var language = results[i].original_language;
        var vote = results[i].vote_average;
        var imgUrl = results[i].poster_path;
        var imgUrlFinal = "https://image.tmdb.org/t/p/w185" + imgUrl;
        vote = Math.floor((vote)/2)
        console.log(name);

        printInfoTV(name, originalName, language, vote, imgUrlFinal)
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
