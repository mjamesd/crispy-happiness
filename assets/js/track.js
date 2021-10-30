
let trackId = localStorage.getItem("Track ID") || null;
let artistInfo = JSON.parse(localStorage.getItem(`${localStorageEntity}artistInfo`)) || null;

$("#homeClick").click(() => {
  localStorage.removeItem(`${localStorageEntity}artistInfo`);
});

// Audio DB API Pull -- Page Anchor // 
function getTrackInfo(trackInfo) {
  $.ajax({
    url: tadbURL + tadbTrack + trackId,
    method: "GET",
    dataType: "json",
    success: function (result) {
      result.track[0].CPHbannerURL = localStorage.getItem("Banner URL");
      saveTrackInfo(result.track[0]);
      wikiAPI(result.track[0])
      displayLyrics(`${result.track[0].strArtist}  ${result.track[0].strTrack}`)
      displayTrackVid(result.track[0])
      displayTrackGenre(result.track[0])
      // giphyAPI(`${result.track[0].strArtist}  ${result.track[0].strTrack}`)
      displayBanner(result.track[0].strTrack)
      // homeButton(result.track[0].strArtist)
    }
  })
}

function saveTrackInfo(trackInfo) {
  let allTrackInfo = JSON.parse(localStorage.getItem(`${localStorageEntity}tracksInfo`)) || [];
  for (let index = 0; index < allTrackInfo.length; index++) {
    if (allTrackInfo[index].idTrack == trackInfo.idTrack) {
      return;
    }
  }
  allTrackInfo.push(trackInfo);
  localStorage.setItem(`${localStorageEntity}tracksInfo`, JSON.stringify(allTrackInfo))
}

// changed functionality of homeButton, so this is not needed
function homeButton(artistName) {
  // $("#homeClick").on("click", function () {
  //   localStorage.setItem("Artist from Tracks", localStorage.getItem(`${localStorageEntity}artistInfo`))
  // })
}

// Wikipedia API pull. This is a back-up to the track description if there is no information on AudioDB//
function wikiAPI(trackInfo) {
  $.ajax({
    url: wikiURL + trackInfo.strTrack + " (" + trackInfo.strArtist + " song)" + wikiAfterSearch,
    type: "GET",
    dataType: "json",
    success: function (result) {

      displayTrackDesc(trackInfo, result.query.search[0])
    },
    error: function () {
    
    }
  })
}

// Track lyrics API pull from Happi. Get the track lyrics //
function displayLyrics(artistAndSong) {
  artistAndSong = encodeURIComponent(artistAndSong.trim());
  let thisSongSearch = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.happi.dev/v1/music?q=${artistAndSong}&limit=&apikey=8aa80fF4TsMsXsB2d59W5W467VbH3gss5bZhonBPURMZMU1opXZCRPQq&type=track&lyrics=1`,
    "method": "GET"
  };
  $.ajax(thisSongSearch).then(function (songInfo) {
    if (songInfo.result.length == 0) {
      $("#trackLyrics").html($(pEl).append(`Unfortunately, there are no lyrics available for this song. Here's a gif!`));
      $("#trackLyrics").append(giphyAPI(artistAndSong, ));
      return;
    }
    artistId = songInfo.result[0].id_artist;
    albumId = songInfo.result[0].id_album;
    trackId = songInfo.result[0].id_track;
    let thisLyricSearch = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.happi.dev/v1/music/artists/${artistId}/albums/${albumId}/tracks/${trackId}/lyrics?apikey=8aa80fF4TsMsXsB2d59W5W467VbH3gss5bZhonBPURMZMU1opXZCRPQq`,
      "method": "GET"
    };
    $.ajax(thisLyricSearch).then(function (lyricInfo) {
      appendLyric(lyricInfo.result.lyrics)
    });
  });
}

// Displays the banner and artist song title to the page //
function displayBanner(artistTrack) {
  let bannerURL = localStorage.getItem("Banner URL")
  $("#bannerOnTracks").html($(`<img src="${bannerURL}" class="responsive-img" alt="${artistInfo.strArtist} banner image" /><p><h3>"${artistTrack}"</h3></p>`))
}

// Appends the track description information to the page //
function displayTrackDesc(trackDescription, wikiResult) {
  let trackName = trackDescription.strTrack
  let trackDesc = trackDescription.strDescriptionEN
  
  if (trackDescription.strDescriptionEN == "" && wikiResult.snippet === null) {
    $("#trackDesc").hide();
  } else if (trackDescription.strDescriptionEN === null || trackDescription.strDescriptionEN == "") {
    $("#trackDesc").append(`<h3>Background Information</h3>`).append($(pEl).html(`${wikiResult.snippet} ...`)).append($(pEl).html(`<a href="http://en.wikipedia.org/?curid=${wikiResult.pageid}" target="_blank">... Read More on Wikipedia</a>`))
  } else {
    $("#trackDesc").append(`<h3>Background Information</h3><p class="readmore">${trackDesc}</p><p></p> `)
    $(".readmore").readmore({
      speed: 750,
    });
  }
}

// Appends the track lyrics to the page //
function appendLyric(lyric) {
  $("#trackLyrics").html($(pEl).append(`<h3>Lyrics</h3><p class="readmore">${lyric}</p>`))
  $(".readmore").readmore({
    speed: 750,
  })
}

// Appends the track Genre to the page //
function displayTrackGenre(trackGenre) {
  $("#trackGenre").html($(pEl).append(`<h3>Genre</h3><p>${trackGenre.strGenre}`))
}

// Appends the YouTube Link to the page //
function displayTrackVid(trackResults) {
  if (trackResults.strMusicVid === null) {
    giphyAPI(trackResults.strArtist, $("#trackYouTube"))
  } else {
    let _href = $("<a>").attr("href", trackResults.strMusicVid).attr("target", "_blank").text(trackResults.strTrack);
    $("#trackYouTube").html($(pEl).append(`<h3>Visit the YouTube video here:</h3><p>`).append(_href))
  }
}


// launches everything // 
getTrackInfo()
// write the action button to the page <-- MUST BE AT END OF CODE EXECUTION
displayActionButton();