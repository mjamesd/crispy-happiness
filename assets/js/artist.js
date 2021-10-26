// script for artist page (index.html)

// API info
// for TheAudioDB.com "tadb"
// const tadbApiKey = "523532";
// const tadbURL = "https://theaudiodb.com/api/v1/json/" + tadbApiKey + "/";
// const tadbArtist = "search.php?s="; // give artist name
// const tadbArtistDetails = "artist.php?i=" // give artist ID
// const tadbArtistTopTracks = "track-top10.php?s="; // give artist NAME!!
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
const artistBioContainer = $("#artistBioContainer");
const artistBioEl = $("#artistBio");
const topTracksContainerEl = $("#topTracksContainer");
const topTracksEl = $("#topTracks");
const topTracksListEl = $("#topTracksList");
const mediaContainerEl = $("#mediaContainer");
const artistWebsiteEl = $("#artistWebsite");
const artistLastFmEl = $("#artistLastFm");
const artistTwitterEl = $("#artistTwitter");


// Elements to use for selectors
liEl = "<li>";
aEl = "<a>";
pEl = "<p>";
divEl = "<div>";

async function getArtistInfo(artistName) {
    let thisSearch = settings = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbArtist + artistName,
        "method": "GET"
    };
    return await $.ajax(thisSearch);
}

function displayBio(thisArtist) {
    artistBioEl.empty();
    artistBioEl.append($("<img>").attr("src", thisArtist.strArtistBanner).attr("alt", `${thisArtist.strArtist} banner image`).attr("class", "responsive-img"));
}


function displayTopTracks(artistName) {
    // tadbArtistTopTen
    let thisSearch = settings = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbArtistTopTracks + artistName,
        "method": "GET"
    };
    let thisTopTracks = $.ajax(thisSearch).then(function(topTracksResponse) {
        console.log(topTracksResponse);
        topTracksListEl.empty();
        for (let index = 0; index < topTracksResponse.track.length; index++) {
            topTracksListEl.append($(liEl).html($(aEl).attr("href", `./track.html?trackId=${topTracksResponse.track[index].idTrack}`).attr("name", topTracksResponse.track[index].idTrack).text(topTracksResponse.track[index].strTrack).on("click", function(){
                localStorage.setItem("Track ID", $(this).attr("name"))
            })))
        
        }

    });
}


function displayLinks(artistInfo) {
    artistWebsiteEl.html($(aEl).attr("href","http://" + artistInfo.strWebsite).attr("target", "_blank").text(artistInfo.strWebsite))
    artistLastFmEl.html($(aEl).attr("href", artistInfo.strLastFMChart).attr("target", "_blank").text(artistInfo.strArtist + " on Last.fm"))
    artistTwitterEl.html($(aEl).attr("href","http://" + artistInfo.strTwitter).attr("target", "_blank").text(artistInfo.strArtist + " on Twitter"))
}


searchBtnEl.click(() => {
    getArtistInfo(searchArtistInputEl.val()).then(function(artistInfo) {
        artistInfo = artistInfo.artists[0];
        console.log(artistInfo);
        displayBio(artistInfo);
        displayTopTracks(artistInfo.strArtist);
        displayLinks(artistInfo);
    });
});