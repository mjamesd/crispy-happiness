
let trackId = localStorage.getItem("Track ID")
let artistInfo = JSON.parse(localStorage.getItem("cph-artistInfo"))


// Audio DB API Pull -- Page Anchor // 
function getTrackInfo(trackInfo) {
  $.ajax({
    url: tadbURL + tadbTrack + trackId,
    method: "GET",
    dataType: "json",
    success: function (result) {
      wikiAPI(result.track[0])
      displayTrackVid(result.track[0])
      displayTrackGenre(result.track[0])
      displayLyrics(`${result.track[0].strArtist}  ${result.track[0].strTrack}`)
      giphyAPI(`${result.track[0].strArtist}  ${result.track[0].strTrack}`)
      displayBanner(result.track[0].strTrack)
      homeButton(result.track[0].strArtist)
    }
  })
}

// launches everything // 
getTrackInfo() 

function homeButton(artistName) {
  $("#homeBtn").on("click", function(){
    localStorage.setItem("Artist from Tracks", artistName)
  })

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
      console.log("error")
    }
  })
}

// Track lyrics API pull from Happi. Get the track lyrics //
function displayLyrics(artistAndSong) {
  artistAndSong = encodeURIComponent(artistAndSong.trim());
  console.log(artistAndSong);
  let thisSongSearch = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.happi.dev/v1/music?q=${artistAndSong}&limit=&apikey=8aa80fF4TsMsXsB2d59W5W467VbH3gss5bZhonBPURMZMU1opXZCRPQq&type=track&lyrics=1`,
      "method": "GET"
  };
  console.log(thisSongSearch.url);
  $.ajax(thisSongSearch).then(function (songInfo) {
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
          console.log(lyricInfo.result.lyrics)
          ;
          appendLyric(lyricInfo.result.lyrics)

      });
  });
}

// Displays the banner and artist song title to the page //
function displayBanner(artistTrack) {
  let bannerURL = localStorage.getItem("Banner URL")
  $("#bannerOnTracks").html($(`<img src="${bannerURL}" class="responsive-img"><p><h3>"${artistTrack}"</h3></p>`))
}

// Appends the track description information to the page //
function displayTrackDesc(trackDescription, wikiResult) {
  let trackName = trackDescription.strTrack
  let trackDesc = trackDescription.strDescriptionEN

  if (trackDescription.strDescriptionEN === null) {
    $("#trackDesc").append(`<h3>Background Information</h3>`).append($(pEl).html(`${wikiResult.snippet} ...`)).append($(pEl).html(`<a href="http://en.wikipedia.org/?curid=${wikiResult.pageid}">... Read More on Wikipedia</a>`))
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
    let _href = $("<a>").attr("href", trackResults.strMusicVid).text(trackResults.strTrack);
    $("#trackYouTube").html($(pEl).append(`<h3>Visit the YouTube video here:</h3><p>`).append(_href))
  }
}


