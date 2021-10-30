// DOCUMENT SELECTORS
const homeLogoEl = $("#homeCl");
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


// FUNCTIONS

// Write the artist image and bio to the "artistBio" element
function displayBio(thisArtist, topArtist = false) {
    artistBioEl.empty();
    if (topArtist === true) {
        artistBioEl.append($(h3El).text(`One of today's top artists:`).attr("style", "margin-top: 0.25em"));
    }
    artistBioEl.append($(imgEl).attr("src", thisArtist.strArtistBanner).attr("alt", `${thisArtist.strArtist} banner image`).attr("class", "responsive-img"));
    artistBioEl.append($(divEl).attr("id", artistBioText).text(thisArtist.strBiographyEN))
    //Adds a read more element to limit or show all the bio
    $("#artistBioText").readmore({
        speed: 750,
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
    $.ajax(thisSearch).then(function (discographyResponse) {
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

// renderArtistPage() saves the artist to localStorage and calls the functions that render individual sections of the page
// It accepts artistInfo, which could be sent from a user search or from a randomly grabbed artist from top tracks.
function renderArtistPage(artistInfo, topArtist = false) {
    localStorage.setItem(`${localStorageEntity}artistInfo`, JSON.stringify(artistInfo));
    localStorage.setItem("Banner URL", artistInfo.strArtistBanner);
    displayBio(artistInfo, topArtist);
    displayTopTracks(artistInfo.strArtist);
    displayDiscography(artistInfo.idArtist);
    displayLinks(artistInfo);
}

// const tadbTrendingTracks = "trending.php?country=us&type=itunes&format=singles"; // returns trending music
function init() {
    // Check if an artist is in localStorage
    let artistInfo = JSON.parse(localStorage.getItem(`${localStorageEntity}artistInfo`)) || null;
    // If there is an artist in localStorage, render the page
    if (artistInfo !== null) {
        renderArtistPage(artistInfo);
    } else {
        // If there is NOT an artist in localStorage, get one from top tracks
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
            let thisArtist = trendingTracks.trending[randomTrendingTrack].strArtist;
            let thisArtistSearch = {
                "async": true,
                "crossDomain": true,
                "url": tadbURL + tadbArtist + thisArtist,
                "method": "GET"
            };
            // some sort of do...while loop here?
            $.ajax(thisArtistSearch).then(function (artistInfo) {
                artistInfo = artistInfo.artists[0];
                // Only use this artist if they have a banner, bio, and at least one media
                if (artistInfo.strArtistBanner !== null && artistInfo.strArtistBanner !== "" &&
                artistInfo.strBiographyEN  !== null && artistInfo.strBiographyEN  !== "" //&&
                // (
                //     (artistInfo.strWebsite      !== null && artistInfo.strWebsite       !== "") ||
                //     (artistInfo.strLastFMChart  !== null && artistInfo.strLastFMChart   !== "") ||
                //     (artistInfo.strTwitter      !== null && artistInfo.strTwitter       !== "") ||
                //     (artistInfo.strFacebook     !== null && artistInfo.strFacebook      !== "")
                //     )
                ) {
                    // Render
                    renderArtistPage(artistInfo, true);
                } else {
                    // If they don't have a banner, bio, or at least one media, try again
                    init();
                }
            });
        });
    }
}



// BEGIN CODE EXECUTION HERE:

// Attach event listeners
searchBtnEl.click(() => {
    let thisSearch = {
        "async": true,
        "crossDomain": true,
        "url": tadbURL + tadbArtist + searchArtistInputEl.val(),
        "method": "GET"
    };
    $.ajax(thisSearch).then(function (artistInfo) {
        // If there is no data returned from API call, inform the user and exit the function.
        if (artistInfo.artists === null) {
            M.toast({ html: "Your search did not return any results." });
            return;
        }
        artistInfo = artistInfo.artists[0];
        renderArtistPage(artistInfo);
    });
});


homeLogoEl.click(() => {
    localStorage.removeItem(`${localStorageEntity}artistInfo`);
});


// Run initializing function
init();

// write the action button to the page <-- MUST BE AT END OF CODE EXECUTION
displayActionButton();

// eof