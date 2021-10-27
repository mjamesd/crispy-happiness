
let trackId = localStorage.getItem("Track ID")
let wikiApiResult
let adbResult

function getTrackInfo(trackInfo) {
  $.ajax({
    url: tadbURL + tadbTrack + trackId,
    method: "GET",
    dataType: "json",
    success: function (result) {

      console.log(result)
      adbResults = result
      wikiAPI(result.track[0])
      displayTrackVid(result, result)
      displayTrackGenre(result)
    }
})
}

getTrackInfo()

function wikiAPI(trackInfo) {
  $.ajax({
    url: `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${trackInfo.strTrack} (${trackInfo.strArtist} song)&format=json&origin=*`,
    type: "GET",
    dataType: "json",
    success: function (result) {
      wikiApiResult = result
      displayTrackDesc(trackInfo)
    },
    error: function () {
      console.log("error");
    }
  })
}

function displayTrackDesc(trackDescription) {
  if (trackDescription.strDescriptionEN === null) {
    $("#trackDesc").append($("<p>").html(`<b>${wikiApiResult.query.search[0].title}</b>`)).append($("<p>").html(`${wikiApiResult.query.search[0].snippet} ...`)).append($("<p>").html(`<a href="http://en.wikipedia.org/?curid=${wikiApiResult.query.search[0].pageid}">... Read More on Wikipedia</a>`))
  } else {
    $("#trackDesc").append(`<b>${wikiApiResult.query.search[0].title}</b><p>${trackDescription.strDescriptionEN}`)
}
}

function displayTrackVid(trackYouTube, songTitle) {
  let _href = $("<a>").attr("href", trackYouTube.track[0].strMusicVid).text(songTitle.track[0].strTrack);
  $("#trackYouTube").append(_href)
}

function displayTrackGenre(trackGenre) {
  $("#trackGenre").append($("<p>").text(trackGenre.track[0].strGenre))
  }
  