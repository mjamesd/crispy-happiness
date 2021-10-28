
let trackId = localStorage.getItem("Track ID")


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
      displayLyrics(`${result.track[0].strArtist}  ${result.track[0].strTrack}` )
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

function appendLyric(lyric) {
  $("#trackLyrics").html($(pEl).append(lyric))
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
  

