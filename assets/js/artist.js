// script for artist page (index.html)

// API info
// for TheAudioDB.com "tadb"
// const tadbApiKey = "523532";
// const tadbURL = "https://theaudiodb.com/api/v1/json/" + tadbApiKey + "/";
// const tadbArtist = "search.php?s="; // give artist name
// const tadbArtistDetails = "artist.php?i=" // give artist ID
// const tadbAllAlbums = "album.php?i="; // give artist ID
// const tadbAlbumTracks = "track.php?m="; // give album ID
// const tadbTrackDetails_1 = "searchtrack.php?s=";
// const tadbTrackDetails_2 = "&t="; // combine TrackDetails_1 & _2
// const tadbTrack = "track.php?h="; // give track ID
// const tadbMusicVideos = "mvid.php?i=" // give artist ID

// chartlyrics "cl"
// const clURL = "http://api.chartlyrics.com/apiv1.asmx/";
// const clLyrics_1 = "SearchLyricDirect?artist=";
// const clLyrics_2 = "&song=";// add artist name and song name and then combine clLyrics_1 & _2

// Giphy "gi"
// const giApiKey_dev = "dc6zaTOxFJmzC";
// const giAPiKey_prod = "";
// const giURL = "https://giphy.p.rapidapi.com/v1/gifs/search?api_key=" + giApiKey_dev
// const giSearch = "&q=";

// DOCUMENT SELECTORS
const searchBtnEl = $("#searchBtn");
const searchArtistInputEl = $("#searchArtist");
const searchTrackInputEl = $("#searchTrack");

searchBtnEl.click(()=>{
    let thisSearch = settings = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbArtist + searchArtistInputEl.val(),
        "method": "GET"
    };
    
    $.ajax(thisSearch).done(function (response) {
        console.log(response);
    });
});