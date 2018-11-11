require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var action = process.argv[2];
var input = process.argv[3]
var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var spotify = new Spotify({
    id: "681e9d2c7ec14d3f9bad1679f0debd2d",
    secret: "70baaf3e6cff451a96a7be45c5f28a7f"
})

switch (action) {
    case "concert-this":
      concertthis();
      break;
    
    case "spotify-this-song":
    spotifythissong();
      break;
    
    case "movie-this":
    moviethis();
      break;
    
    case "do-what-it-says":
    dowhatitsays();
      break;
    }
    function concertthis(){
        var artist = input;
          
            console.log(artist);
   
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=b838734e-7ecf-43ce-936e-3a77dea1950d";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result  =  JSON.parse(body)[0];
        console.log("Venue name " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
    })
}
          
   function spotifythissong(songName){
    var songName = process.argv[3];
    if(!songName){
        songName = "The Sign";
    }
    titles = songName;
    spotify.search({ type: "track", query: titles }, function(err, data) {
        if(!err){
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                    "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(songName)
                    console.log(spotifyResults);
                    
                }
            }
        }	else {
            console.log("Error :"+ err);
            return;
        }
    });
};

   function moviethis(){
       var movie = input;
    if(movie === undefined) {
		movie = "mr nobody";
	}

	// HTTP GET request
	request("http://www.omdbapi.com/?t=" + movie + "=&plot=short&apikey=d1c77793", function(error, response, body) {

	  if (!error && response.statusCode === 200) {
          
	    console.log(" Title of the movie:         " + JSON.parse(body).Title);
	    console.log(" Year the movie came out:    " + JSON.parse(body).Year);
	    console.log(" IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
	    console.log(" Country produced:           " + JSON.parse(body).Country);
	    console.log(" Language of the movie:      " + JSON.parse(body).Language);
	    console.log(" Plot of the movie:          " + JSON.parse(body).Plot);
        console.log(" Actors in the movie:        " + JSON.parse(body).Actors);
        

	    // For loop parses through Ratings object to see if there is a RT rating
	    // 	--> and if there is, it will print it
	    for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
	    	if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	    		console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
	    		if(JSON.parse(body).Ratings[i].Website !== undefined) {
	    			console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
	    		}
	    	}
	    }
      }
    });
} 
function dowhatitsays(){
    fs.readFile("random.txt", "utf8", function(error, data){
    if(error){
        return console.log(error);
    }
     console.log(data);
    
 	});
}



