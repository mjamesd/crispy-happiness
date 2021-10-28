
let trackId = localStorage.getItem("Track ID")


function getTrackInfo(trackInfo) {
  $.ajax({
    url: tadbURL + tadbTrack + trackId,
    method: "GET",
    dataType: "json",
    success: function (result) {
      wikiAPI(result.track[0])
      displayTrackVid(result.track[0])
      displayTrackGenre(result.track[0])
    }
})
}

getTrackInfo()

function wikiAPI(trackInfo) {
  $.ajax({
    url: wikiURL +  trackInfo.strTrack + " (" + trackInfo.strArtist + " song)" + wikiAfterSearch,
    type: "GET",
    dataType: "json",
    success: function (result) {
      displayTrackDesc(trackInfo, result.query.search[0])
    },
    error: function () {
      console.log("error");
    }
  })
}

function displayTrackDesc(trackDescription, wikiResult) {
  let trackName = trackDescription.strTrack
  let trackDesc = trackDescription.strDescriptionEN

  if (trackDescription.strDescriptionEN === null) {
    $("#trackDesc").append(`<b>${wikiResult.title}</b>`).append($(pEl).html(`${wikiResult.snippet} ...`)).append($(pEl).html(`<a href="http://en.wikipedia.org/?curid=${wikiResult.pageid}">... Read More on Wikipedia</a>`))
  } else {
    $("#trackDesc").append(`<b>${trackName}</b><p class="readmore">${trackDesc}`)
    $(".readmore").readmore({
      speed: 75,
      maxHeight: 100
    });
    }
}


function displayTrackVid(trackYouTube) {
  console.log(trackYouTube.strMusicVid)
  if (trackYouTube.strMusicVid === null) {
    console.log("add giphy here")
    $("#trackYouTube").text("giphy image here")
  } else {
  let _href = $("<a>").attr("href", trackYouTube.strMusicVid).text(trackYouTube.strTrack);
  $("#trackYouTube").append(`<b>Visit the YouTube video here:</b><p>`).append(_href)
}
}

function displayTrackGenre(trackGenre) {
  $("#trackGenre").append($("<p>").text(trackGenre.strGenre))
  }
  