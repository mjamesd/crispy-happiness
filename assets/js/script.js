// API info
// for TheAudioDB.com "tadb"
const tadbApiKey = "523532";
const tadbURL = "https://theaudiodb.com/api/v1/json/" + tadbApiKey + "/";
const tadbArtist = "search.php?s="; // give artist name
const tadbArtistTopTracks = "track-top10.php?s="; // give artist NAME!!
const tadbArtistDetails = "artist.php?i=" // give artist ID
const tadbAllAlbums = "album.php?i="; // give artist ID
const tadbAlbumTracks = "track.php?m="; // give album ID
const tadbTrackDetails_1 = "searchtrack.php?s=";
const tadbTrackDetails_2 = "&t="; // combine TrackDetails_1 & _2
const tadbTrack = "track.php?h="; // give track ID
const tadbMusicVideos = "mvid.php?i=" // give artist ID
const tadbTrendingTracks = "trending.php?country=us&type=itunes&format=singles"; // returns trending music



// Giphy "gi"
const giApiKey_dev = "y77I7HEXZ2xWwdfkxndsOFzyqCYZG2ip";
// y77I7HEXZ2xWwdfkxndsOFzyqCYZG2ip
const giAPiKey_prod = "";
const giURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giApiKey_dev
const giSearch = "&q=";
const giLimit = "&limit=5";
//https://api.giphy.com/v1/gifs/search?api_key=y77I7HEXZ2xWwdfkxndsOFzyqCYZG2ip&q=cat&limit=25&offset=0&rating=g&lang=en

const wikiURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
const wikiAfterSearch = "&format=json&origin=*"
 
// Elements to use for selectors
const divEl = "<div>";
const h1El = "<h1>";
const h2El = "<h2>";
const h3El = "<h3>";
const pEl = "<p>";
const ulEl = "<ul>";
const liEl = "<li>";
const aEl = "<a>";
const imgEl = "<img>";

// Page variables
const localStorageEntity = "cph-";

function giphyAPI(inputVal, selector) {
  $.ajax({
    url: giURL + giSearch + inputVal + giLimit,
    type: "GET",
    dataType: "json",
    success: function (result) {
      $(selector).html($(imgEl).attr("src", result.data[0].images.fixed_height.url));
    }
  })
}

// This will display a Materialize action button with the user's viewed tracks in it
function displayActionButton() {
  let thisActionButton = $("#actionButton");
  thisActionButton.append($(aEl).addClass("btn-floating btn-large red").html(`<i class="large material-icons">library_music</i>`));
  thisTrackList = $(ulEl).attr("id", "trackList");
  let allTrackInfo = JSON.parse(localStorage.getItem(`${localStorageEntity}tracksInfo`)) || [];
  for (let index = allTrackInfo.length-1; index >= 0 ; index--) {
    let thisTrackIcon = `<i class="material-icons">audiotrack</i>`;
    let thisTrack = $(aEl).attr("href", "./track.html").addClass("btn-floating btn tooltipped").attr("data-position", "left").attr("data-tooltip", `${allTrackInfo[index].strTrack} by ${allTrackInfo[index].strArtist}`).html(thisTrackIcon).click(function() {
      localStorage.setItem("Track ID", allTrackInfo[index].idTrack);
      localStorage.setItem("Banner URL", allTrackInfo[index].CPHbannerURL);
    });
    thisTrackList.append(thisTrack);
  }
  thisActionButton.append(thisTrackList);
  $('.fixed-action-btn').floatingActionButton();
  $('.tooltipped').tooltip();
}