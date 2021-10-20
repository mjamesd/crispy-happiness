fetch("https://genius.p.rapidapi.com/artists/16775/songs", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "genius.p.rapidapi.com",
		"x-rapidapi-key": "cTibwpa9h9uV1FxoQCYNuzSulZJogL68"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

let artist = "bob dylan"
let requestUrl = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      
      })