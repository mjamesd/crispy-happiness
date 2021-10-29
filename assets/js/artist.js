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

const carouselaEl = $("<a>").addClass("carousel-item").append('<img src="https://lorempixel.com/250/250/nature/5">')
const carousela2El = $("<a>").addClass("carousel-item").append('<img src="https://lorempixel.com/250/250/nature/3">')
const carouselEl = $(".carousel")

// Names of dynamically-created elements
const artistBioText = "artistBioText";



// Write the artist image and bio to the "artistBio" element
function displayBio(thisArtist) {
    artistBioEl.empty();
    artistBioEl.append($(imgEl).attr("src", thisArtist.strArtistBanner).attr("alt", `${thisArtist.strArtist} banner image`).attr("class", "responsive-img"));
    artistBioEl.append($(divEl).attr("id", artistBioText).text(thisArtist.strBiographyEN))
    //Adds a read more element to limit or show all the bio
    $("#artistBioText").readmore({
        speed: 75,
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
        console.log("Top Tracks: ", topTracksResponse);
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
    $.ajax(thisSearch).then(function(discographyResponse) {
        thisDiscography = discographyResponse.album;
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
    artistWebsiteEl.html($(aEl).attr("href", `http://${artistInfo.strWebsite}`).attr("target", "_blank").text(artistInfo.strWebsite));
    // Jefrey -- can you slice the Last.fm link so that it goes to their main page instead of the chart?
    artistLastFmEl.html($(aEl).attr("href", artistInfo.strLastFMChart).attr("target", "_blank").text(`${artistInfo.strArtist} on Last.fm`));
    artistTwitterEl.html($(aEl).attr("href", `http://${artistInfo.strTwitter}`).attr("target", "_blank").text(`${artistInfo.strArtist} on Twitter`));
    artistFacebookEl.html($(aEl).attr("href", `http://${artistInfo.strFacebook}`).attr("target", "_blank").text(`${artistInfo.strArtist} on Facebook`));
}


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

  $(document).ready(function(){
    $('.carousel').carousel();
  });


  
// artistFacebookEl.html($(imgEl).src(data[0]));


// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.carousel');
//     var instances = M.Carousel.init(elems, options);
//   });

//   // Or with jQuery

//   $(document).ready(function(){
//     $('.carousel').carousel();
//   });