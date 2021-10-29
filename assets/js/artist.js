// script for artist page (index.html)

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

const carouselaEl = $("<a>").addClass("carousel-item").append('<img src="https://lorempixel.com/250/250/nature/5">')
const carousela2El = $("<a>").addClass("carousel-item").append('<img src="https://lorempixel.com/250/250/nature/3">')
const carouselEl = $(".carousel")

// FUNCTIONS

// Write the artist image and bio to the "artistBio" element
function displayBio(artistInfo) {
    artistBioEl.html($(imgEl).attr("src", artistInfo.strArtistBanner).attr("alt", `${artistInfo.strArtist} banner image`).attr("class", "responsive-img"));
    artistBioEl.append($(divEl).attr("id", "artistBioText").text(`${artistInfo.strBiographyEN.substr(0,200)}... (read more)`));
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
        topTracksListEl.empty();
        for (let index = 0; index < topTracksResponse.track.length; index++) {
            topTracksListEl.append($(liEl).html($(aEl).attr("href", `./track.html?trackId=${topTracksResponse.track[index].idTrack}`).attr("name", topTracksResponse.track[index].idTrack).text(topTracksResponse.track[index].strTrack).on("click", function () {
                localStorage.setItem("Track ID", $(this).attr("name"))
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
    $.ajax(thisSearch).then(function (discographyResponse) {
        thisDiscography = discographyResponse.album;
        // console.log("Discography: ", thisDiscography);
        console.log(discographyResponse)
        console.log("Discography: ", thisDiscography);
        artistDiscographyListEl.empty();
        carouselEl.empty();
        
        for (let index = 0; index < thisDiscography.length; index++) {

        let carouselaEl = $("<a>").addClass("carousel-item").attr("href", `#${index}`)
        if (thisDiscography[index].strAlbumThumb == null || thisDiscography[index].strAlbumThumb == '') {
            carouselaEl.append('<img src="https://lorempixel.com/250/250/nature/2">')  
        } else {
            carouselaEl.html($(imgEl).attr("src", thisDiscography[index].strAlbumThumb).attr("alt", thisDiscography[index].strAlbum).addClass("discographyThumbnail"))
        }
  
            carouselEl.append(carouselaEl)
            carouselaEl.append(`${thisDiscography[index].strAlbum}, ${thisDiscography[index].intYearReleased}`);
            thisAlbum = $(liEl).html($(imgEl).attr("src", thisDiscography[index].strAlbumThumb).attr("alt", thisDiscography[index].strAlbum).addClass("discographyThumbnail"));
            thisAlbum.append(`${thisDiscography[index].strAlbum}, ${thisDiscography[index].intYearReleased}`);
            
            // TO DO: add .click event to show more info in jQuery UI widget 'dialog' box.

            // By default, only show the first five albums (most popular) but write all of them to the page

        $('.carousel').carousel();

        }
    });
}

// Write artist links to the corresponding elements.
// Links open in a new window/tab.
function displayLinks(artistInfo) {
    // console.log(artistInfo);
    artistWebsiteEl.html($(aEl).attr("href", `http://${artistInfo.strWebsite}`).attr("target", "_blank").text(artistInfo.strWebsite));
    // Jefrey -- can you slice the Last.fm link so that it goes to their main page instead of the chart?
    let lastFmSubstrPos = (artistInfo.strLastFMChart).search("\+charts")-1;
    // console.log(lastFmSubstrPos);
    let lastFmMain = artistInfo.strLastFMChart.substr(0, 20);
    // console.log(lastFmMain);
    artistLastFmEl.html($(aEl).attr("href", lastFmMain).attr("target", "_blank").text(`${artistInfo.strArtist} on Last.fm`));
    // artistLastFmEl.html($(aEl).attr("href", artistInfo.strLastFMChart).attr("target", "_blank").text(`${artistInfo.strArtist} on Last.fm`));
    artistTwitterEl.html($(aEl).attr("href", `http://${artistInfo.strTwitter}`).attr("target", "_blank").text(`${artistInfo.strArtist} on Twitter`));
    artistFacebookEl.html($(aEl).attr("href", `http://${artistInfo.strFacebook}`).attr("target", "_blank").text(`${artistInfo.strArtist} on Facebook`));
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
    // make API call to get the trending tracks
    let thisSearch = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbTrendingTracks,
        "method": "GET"
    };
    $.ajax(thisSearch).then(function (trendingTracks) {
        // pick a random one
        let randomTrendingTrack = Math.floor(Math.random() * trendingTracks.trending.length);
        // then search for it and render the page
        let thisArtistSearch = {
            "async": true,
            "crossDomain": true,
            "url": tadbURL + tadbArtist + trendingTracks.trending[randomTrendingTrack].strArtist,
            "method": "GET"
        };
        $.ajax(thisArtistSearch).then(function (artistInfo) {
            renderArtistPage(artistInfo, false); // render, but do not save to localStorage
        });
    });
}

init();


searchBtnEl.click(() => {
    let thisSearch = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbArtist + searchArtistInputEl.val(),
        "method": "GET"
    };
    $.ajax(thisSearch).then(function (artistInfo) {
        renderArtistPage(artistInfo);
    });
});
