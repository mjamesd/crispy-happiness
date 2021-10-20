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