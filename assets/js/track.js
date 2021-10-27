
let trackId = localStorage.getItem("Track ID")


async function getTrackInfo(trackInfo) {
  let tadbSearch = settings = {
    "async": true,
    "crossDomain": true,
    "url": tadbURL + tadbTrack + trackId,
    "method": "GET"
  };
  return await $.ajax(tadbSearch);
}


async function getTrackLyric(artist, songTitle) {
  let clSearch = settings = {
    "async": true,
    "crossDomain": true,
    "url":clURL+clLyrics_1+artist+clLyrics_2+songTitle,
    "method": "GET"
  };
 
  return await $.ajax(clSearch);
}





function displayTrackDesc(trackDesc) {
  //console.log('trackdescr',trackDesc)
  $("#trackDesc").append($("<p>").text(trackDesc.track[0].strDescriptionEN))
}

function displayTrackVid(trackYouTube, songTitle) {
  let _href = $("<a>").attr("href", trackYouTube).text(songTitle);
  $("#trackYouTube").append(_href)
}

function displayTrackGenre(trackGenre) {
$("#trackGenre").append($("<p>").text(trackGenre.track[0].strGenre))
}

getTrackLyric().then(function(clSearch){
  console.log('clsearch', clSearch)

})


getTrackInfo(trackId).then(function (trackInfo) {
  console.log('trackinfo',trackInfo);
  //console.log("trackyoutube",trackInfo.track[0].strMusicVid)
  //console.log('trackinfor array 0',trackInfo.track[0].strDescriptionEN)
  let trackYouTube = trackInfo.track[0].strMusicVid;
  let songTitle = trackInfo.track[0].strTrack;
  let artist =  trackInfo.track[0].strArtist;
  console.log("song title", songTitle)
  console.log('artist', artist)
  displayTrackDesc(trackInfo)
  displayTrackGenre(trackInfo)
  displayTrackVid(trackYouTube, songTitle)
 
  // $.ajax({
   // method: "GET",
   // url:giURL + giApiKey_dev + giSearch ,
   // crossDomain: true,
   // dataType: 'jsonp',
  //}).then(function(res){
   // console.log('res', res)
  //})
  //getTrackLyric(artist, songTitle);
})


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

