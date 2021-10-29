
let trackId = localStorage.getItem("Track ID")

// Audio DB API Pull -- Page Anchor // 
function getTrackInfo(trackInfo) {
  $.ajax({
    url: tadbURL + tadbTrack + trackId,
    method: "GET",
    dataType: "json",
    success: function (result) {
      console.log(result)
      wikiAPI(result.track[0])
      displayTrackVid(result.track[0])
      displayTrackGenre(result.track[0])
      displayLyrics(`${result.track[0].strArtist}  ${result.track[0].strTrack}`)
      giphyAPI(`${result.track[0].strArtist} artist`)
    }
  })
}

// launches everything // 
getTrackInfo()


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
    console.log(songInfo.result[0]);
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

// Appends the track Genre to the page //
function displayTrackGenre(trackGenre) {
  $("#trackGenre").html($(pEl).append(`<h5>Genre</h5><p>${trackGenre.strGenre}`))
}

// Appends the track description information to the page //
function displayTrackDesc(trackDescription, wikiResult) {
  let trackName = trackDescription.strTrack
  let trackDesc = trackDescription.strDescriptionEN

  if (trackDescription.strDescriptionEN === null) {
    $("#trackDesc").append(`<h5>${wikiResult.title}</h5>`).append($(pEl).html(`${wikiResult.snippet} ...`)).append($(pEl).html(`<a href="http://en.wikipedia.org/?curid=${wikiResult.pageid}">... Read More on Wikipedia</a>`))
  } else {
    $("#trackDesc").html($(pEl).append(`<h5>${trackName}</h5><p class="readmore">${trackDesc}`))
    $(".readmore").readmore({
      speed: 75,
      maxHeight: 200
    });
  }
}

// Appends the YouTube Link to the page //
function displayTrackVid(trackYouTube) {
  console.log(trackYouTube.strMusicVid)
  if (trackYouTube.strMusicVid === null) {
    console.log("add giphy here")
    $("#trackYouTube").text("giphy image here")
  } else {
    let _href = $("<a>").attr("href", trackYouTube.strMusicVid).text(trackYouTube.strTrack);
    $("#trackYouTube").html($(pEl).append(`<h5>Visit the YouTube video here:</h5><p>`).append(_href))
  }
}


// Appends the track lyrics to the page //
function appendLyric(lyric) {
  $("#trackLyrics").html($(pEl).append(`<h5>Lyrics</h5><p class="readmore">${lyric}`))
  $(".readmore").readmore({
    speed: 75,
    maxHeight: 200
  })
}


result.data[0].images.fixed_height.mp4