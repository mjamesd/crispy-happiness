
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
      adbResult = result
      wikiAPI(adbResult)
    }
})
}

getTrackInfo()

function wikiAPI(trackName) {
  $.ajax({
    url: `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${trackName.track[0].strTrack} (${trackName.track[0].strArtist} song)&format=json&origin=*`,
    type: "GET",
    dataType: "json",
    success: function (result) {
      wikiApiResult = result
      displayTrackDesc()
    },
    error: function () {
      console.log("error");
    }
  })
}

function displayTrackDesc() {
  if (adbResult.track[0].strDescriptionEN === null) {
    $("#trackDesc").append($("<p>").html(`<b>${wikiApiResult.query.search[0].title}</b>`)).append($("<p>").html(`${wikiApiResult.query.search[0].snippet} ...`)).append($("<p>").html(`<a href="http://en.wikipedia.org/?curid=${wikiApiResult.query.search[0].pageid}">... Read More on Wikipedia</a>`))
  } else {
    $("#trackDesc").append(`<b>${wikiApiResult.query.search[0].title}</b><p>${adbResult.track[0].strDescriptionEN}`)
}
chartLyrics()
}

function chartLyrics() {
  console.log(wikiApiResult)
  console.log(adbResult)
}