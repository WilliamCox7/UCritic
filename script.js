var movies = {};
var searchTimeout;

$(document).ready(function(e) {

    $("#target").keyup(function() {
        $(".movie-option-container").html("<h2>Searching...</h2>");
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function () {
          var search = $("#target").val();
          var HTML = "";
          var url = 'http://www.omdbapi.com/?s=*' + search + '*&type=movie';
          $.ajax({
              type: 'GET',
              dataType: 'json',
              url: url,
              success: function (a) {
                  var len = 0;
                  if (a.Response != "False") {
                      if (a.Search.length > 6) { len = 6; }
                      else { len = a.Search.length; }
                      if (len === 0) { HTML += "<h2>No Results</h2>"; }
                      for (var i = 0; i < len; i++) {
                          if (a.Search[i].Poster != "N/A") {
                            HTML += "<div class=\"movie-option\">";
                            HTML += "<a href=\"movie/index.html\">";
                            HTML += "<img src=\"" + a.Search[i].Poster + "\">";
                            HTML += "</a></div>";
                          }
                      }
                  } else { HTML += "<h2>No Results</h2>"; }
                  $(".movie-option-container").html(HTML);
              }
          })
        }, 200);
    });

});

$(document).on({
    click: function () {
        var title = $(this)[0].childNodes[1].innerText;
        var search = movies[title].Title;
        var url = 'http://www.omdbapi.com/?t=' + search + '&type=movie&tomatoes=true';
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: url,
            success: function (a) {
                var movie = JSON.stringify(a);
                movie = btoa(movie);
                localStorage.setItem('_movie', movie);
                window.location = 'movie/index.html'
            }
        })
    }
}, "#x");

$(document).on({
    click: function () {
        $("#content").addClass('act');
        $("#noResult").addClass('act');
        setTimeout(function() {
            $("#noResult h1")[0].innerText = "no search results";
        }, 100);
    }
}, "#target");
