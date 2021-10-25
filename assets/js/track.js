// fetch("https://genius.p.rapidapi.com/artists/16775/songs", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "genius.p.rapidapi.com",
// 		"x-rapidapi-key": "cTibwpa9h9uV1FxoQCYNuzSulZJogL68"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });


// var storedMusic = JSON.parse(localStorage.getItem("music")) || [];

// var musicApi = "https://genius.p.rapidapi.com/";
// var lyricsApi = "";

// var musicApiKey = "";
// var lyricApiKey = "";

// $("#searchBtn").on('click', function(){
//   var searchInput = $("#input").val();
  // console.log('search input',searchInput)

  //we need to make the call
  //add the parameter
  //(later time) check for errors 
  //make sure we get successfull response
  //we now need to distrubute that data
  //define your top ten 
  // create an object and svae the data that you need to pass to the second page
  //save the object on local storage 
  //display the selected data onto your new page
  // then create the list 
  // create the new route for the selected song
  //create a link to the second page
  //
// })
let trackId = localStorage.getItem("Track ID")

async function getTrackInfo(trackInfo) {
  let thisSearch = settings = {
      "async": true,
      "crossDomain": true,
      "url": tadbURL + tadbTrack + trackId,
      "method" : "GET"
  };
  return await $.ajax(thisSearch);

  
}

function displayTrackDesc(trackDesc) {
  console.log(trackDesc)
  $("#trackDesc").append($("<p>").text(trackDesc.track[0].strDescriptionEN))

}

getTrackInfo(trackId).then(function(trackInfo) {
  console.log(trackInfo);
  console.log(trackInfo.track[0].strDescriptionEN)
  displayTrackDesc(trackInfo)
}
)
