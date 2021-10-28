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

// chartlyrics "cl"
const clURL = "http://api.chartlyrics.com/apiv1.asmx/";
const clLyrics_1 = "SearchLyricDirect?artist=";
const clLyrics_2 = "&song=";// add artist name and song name and then combine clLyrics_1 & _2

// Giphy "gi"
const giApiKey_dev = "y77I7HEXZ2xWwdfkxndsOFzyqCYZG2ip";
// y77I7HEXZ2xWwdfkxndsOFzyqCYZG2ip
const giAPiKey_prod = "";
const giURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giApiKey_dev
const giSearch = "&q=";
const giLimit = "limit=5";
//https://api.giphy.com/v1/gifs/search?api_key=y77I7HEXZ2xWwdfkxndsOFzyqCYZG2ip&q=cat&limit=25&offset=0&rating=g&lang=en

const wikiURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
const wikiAfterSearch = "&format=json&origin=*"

// Elements to use for selectors
const divEl = "<div>";
const h1El = "<h1>";
const h2El = "<h2>";
const h3El = "<h3>";
const pEl = "<p>";
const liEl = "<li>";
const aEl = "<a>";
const imgEl = "<img>";

// Page variables
const localStorageEntity = "cph-";


function giphyAPI(giphyTrack) {
    $.ajax( {
      url: giURL + giSearch + giphyTrack + giLimit,
      type: "GET",
      dataType: "json",
      success: function (result) {
      console.log(result)
      }
    })
  }
  