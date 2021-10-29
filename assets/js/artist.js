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
const artistDiscographyEl = $("#artistDiscography");
const artistDiscographyListEl = $("#artistDiscographyList");
const mediaContainerEl = $("#mediaContainer");
const artistWebsiteEl = $("#artistWebsite");
const artistLastFmEl = $("#artistLastFm");
const artistTwitterEl = $("#artistTwitter");
const artistFacebookEl = $("#artistFacebook");
const artistInfoEl = $("#artistInfo");
const showMoreEl = $("#showMore")
const carouselEl = $(".carousel")

// Names of dynamically-created elements
const artistBioText = "artistBioText";


<<<<<<< HEAD
=======
// FUNCTIONS
>>>>>>> main

// Write the artist image and bio to the "artistBio" element
function displayBio(thisArtist) {
    artistBioEl.empty();
    artistBioEl.append($(imgEl).attr("src", thisArtist.strArtistBanner).attr("alt", `${thisArtist.strArtist} banner image`).attr("class", "responsive-img"));
    artistBioEl.append($(divEl).attr("id", artistBioText).text(thisArtist.strBiographyEN))
    //Adds a read more element to limit or show all the bio
    $("#artistBioText").readmore({
<<<<<<< HEAD
        speed: 75,
=======
        speed: 750,
>>>>>>> main
      })

}

// Write artist's top tracks as list items in "topTracksList" ordered list
// Accepts artist name as parameter
function displayTopTracks(artistName) {
    let thisSearch = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbArtistTopTracks + artistName,
        "method": "GET"
    };
    let thisTopTracks = $.ajax(thisSearch).then(function (topTracksResponse) {
        // console.log("Top Tracks: ", topTracksResponse);
        topTracksListEl.empty();// remove any existing tracks (i.e., from the last search)
        for (let index = 0; index < topTracksResponse.track.length; index++) {
            // Append track to list as link to track.html page. Passes track to localStorage.
            topTracksListEl.append($(liEl).html($(aEl).attr("name", topTracksResponse.track[index].idTrack).text(topTracksResponse.track[index].strTrack).on("click", function () {
                localStorage.setItem("Track ID", $(this).attr("name"));
                window.location = "./track.html"; // .attr("href", `./track.html?trackId=${topTracksResponse.track[index].idTrack}`)
            })))
        }
    });
}

// Write artist discography (i.e., all albums, singles, etc.) to the "artistDiscography" element.
// Accepts an artist ID
// Uses "All Albums" API call -- this gets more info than tadb's discography API call.
function displayDiscography(artistId) {
    let thisSearch = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbAllAlbums + artistId,
        "method": "GET"
    };
    $.ajax(thisSearch).then(function(discographyResponse) {
        thisDiscography = discographyResponse.album;
        carouselEl.empty(); // remove any existing albums (i.e., from the last search)
        for (let index = 0; index < thisDiscography.length; index++) {
            let carouselaEl = $(aEl).addClass("carousel-item").attr("href", `#${index}`);
            // If no album art exists in TADB, display random pic 
            if (thisDiscography[index].strAlbumThumb == null || thisDiscography[index].strAlbumThumb == '') {
                carouselaEl.append($(imgEl).attr("src", "https://lorempixel.com/250/250/nature/2"));
            } else {
                carouselaEl.html($(imgEl).attr("src", thisDiscography[index].strAlbumThumb).attr("alt", thisDiscography[index].strAlbum).addClass("discographyThumbnail"));
            }
            // Add album to page
            carouselaEl.append(`${thisDiscography[index].strAlbum}, ${thisDiscography[index].intYearReleased}`);
            carouselEl.append(carouselaEl)
            // Initialize the carousel with the newly-created elements
            $('.carousel').carousel();

        }
    });
}

// Write artist links to the corresponding elements.
// Links open in a new window/tab.
function displayLinks(artistInfo) {
    artistWebsiteEl.html($(aEl).attr("href", `http://${artistInfo.strWebsite}`).attr("target", "_blank").text(artistInfo.strWebsite));
    // Slice the Last.fm link so that it goes to their main page instead of the chart
    let lastFmSubstrPos = artistInfo.strLastFMChart.search("charts") - 2; // why doesn't ("\+") work?
    let lastFmMain = artistInfo.strLastFMChart.substr(0, lastFmSubstrPos);
    artistLastFmEl.html($(aEl).attr("href", lastFmMain).attr("target", "_blank").text(`${artistInfo.strArtist} on Last.fm`));
    if (artistInfo.strTwitter !== null && artistInfo.strTwitter !== "") {
        artistTwitterEl.html($(aEl).attr("href", `http://${artistInfo.strTwitter}`).attr("target", "_blank").text(`${artistInfo.strArtist} on Twitter`));
    } else {
        giphyAPI(`${artistInfo.strArtist} twitter`, artistTwitterEl.attr("id"));
    }
    if (artistInfo.strFacebook !== null && artistInfo.strFacebook !== "") {
        artistFacebookEl.html($(aEl).attr("href", `http://${artistInfo.strFacebook}`).attr("target", "_blank").text(`${artistInfo.strArtist} on Facebook`));
    } else {
        giphyAPI(`${artistInfo.strArtist} facebook`, artistFacebookEl.attr("id"));
    }
}

function renderArtistPage(artistInfo, save = true) {
    artistInfo = artistInfo.artists[0];
    if (save === true) {
        localStorage.setItem(`${localStorageEntity}artistInfo`, JSON.stringify(artistInfo));
    }
    displayBio(artistInfo);
    displayTopTracks(artistInfo.strArtist);
    displayLinks(artistInfo);
    displayDiscography(artistInfo.idArtist);
}

// const tadbTrendingTracks = "trending.php?country=us&type=itunes&format=singles"; // returns trending music
function init() {
    // Make an API call to get the trending tracks
    let thisSearch = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbTrendingTracks,
        "method": "GET"
    };
    $.ajax(thisSearch).then(function (trendingTracks) {
        // Pick a random one...
        let randomTrendingTrack = Math.floor(Math.random() * trendingTracks.trending.length);
        // Then search for its artist and render the page
        let thisArtistSearch = {
            "async": true,
            "crossDomain": true,
            "url": tadbURL + tadbArtist + trendingTracks.trending[randomTrendingTrack].strArtist,
            "method": "GET"
        };
        $.ajax(thisArtistSearch).then(function (artistInfo) {
            // Render, but do not save to localStorage (only user searches are saved)
            renderArtistPage(artistInfo, false);
        });
    });
}


// BEGIN CODE EXECUTION HERE

// Initialize carousel
// $(document).ready(function () {
//     $('.carousel').carousel();
// });

// Attach event listener
searchBtnEl.click(() => {
    let thisSearch = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbArtist + searchArtistInputEl.val(),
        "method": "GET"
    };
    $.ajax(thisSearch).then(function (artistInfo) {
        artistInfo = artistInfo.artists[0];
        localStorage.setItem(`${localStorageEntity}artistInfo`, JSON.stringify(artistInfo));
        console.log(artistInfo);
        displayBio(artistInfo);
        displayTopTracks(artistInfo.strArtist);
        displayLinks(artistInfo);
        displayDiscography(artistInfo.idArtist);
    });
});

// Run initializing function
init();


// eof
