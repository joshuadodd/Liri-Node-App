//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

'use strict'

var keys = require("./keys.js");
var spotify = require("spotify");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");
var twitterKeys = keys.twitterKeys;


// console.log(twitterKeys);

var commandArg = process.argv;
var query = [];
// var action = process.argv.slice(2);

for (var i = 2; i < commandArg.length; i++){

  query.push(commandArg[i]);

}

var argOne = query.splice(0,1);
var argTwo = query.join(" ");
var action = String(argOne);
var value = String(argTwo);

console.log("Searching for " +  value);
console.log("What commandArg? " + action);


switch (action){
  case "my-tweets":
  myTweets();
  logAction();
  break;

  case "spotify-this-song":
  spotifyThisSong();
  logAction();
  break;

  case "movie-this":
  movieThis();
  logAction();
  break;

  case "do-what-it-says":
  doThis();
  logAction();
  break;

}

// if the my-tweets commandArg is received
function myTweets() {

	// set up credentials object for Twitter access
	var client = new Twitter(twitterKeys);

	client.get('search/tweets', {q: '@JimGaffigan'}, function(error, tweets, response) {
  
	//console.log(tweets.statuses);
	for (var index = 0; index < tweets.statuses.length; index++) {
		var tweetText = tweets.statuses[index].text;
		console.log('===================================')
		console.log(tweetText);
		
		
	}
  
})
      
// end the myTweets function - YES!!!
};
function mySpotify(){
    console.log("Music for DAYS!");
    var searchTrack;
	if(commandArg === undefined){
		searchTrack = "What's My Age Again?";
	}else{
		searchTrack = commandArg;
	}
    //launch spotify search
	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	        
	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].song[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
	    }
	});

};	

// * `movie-this`
function movieThis(){

  var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=798d16e44bf2357493e013567298dcd5&query=" + value;

request(queryURL, function(error, response, body) {

  
  if (error) {
    console.log("Error occurred: " + error);
    return;
  }

  if(value === ""){

    console.log("************");
    console.log("Movie Name: Mr.Nobody");
    console.log("Release Date: 2009-09-11");
    console.log("Synopsis: Nemo Nobody leads an ordinary existence with his wife and 3 children; one day, he wakes up as a mortal centenarian in the year 2092.");
    console.log("Average Vote: 7.9");
    console.log("Language: en");
    console.log("************");

  }

  else{
    console.log("************");
    console.log("Movie Name: " + JSON.parse(body).results[0].title);
    console.log("Release Date: " + JSON.parse(body).results[0].release_date);
    console.log("Synopsis: " + JSON.parse(body).results[0].overview);
    console.log("Average Vote: " + JSON.parse(body).results[0].vote_average);
    console.log("Language: " + JSON.parse(body).results[0].original_language);
    console.log("************");
}
});

}



function logAction (){

  var logItem = "\nSearch String:" + action + "," + value;
  console.log(logItem);

  fs.appendFile("log.txt",logItem, function(err){

    if (err) {
    console.log(err);
  }

  else {
    console.log("Content Added!");
  }

});
}
// * `do-what-it-says`
function doThis(){

// Feel free to change the text in that document to test out the feature for other commandArgs.
fs.readFile("random.txt", "utf8", function(error,data){

  var content = data.split(",");

  // var array = data.toString().split("\n");
  // console.log(array);

  action = content[0];
  value = content[1];

  switch (action){
  case "my-tweets":
  myTweets();
  break;

  case "spotify-this-song":
  spotifyThisSong();
  break;

  case "movie-this":
  movieThis();
  break;

  case "do-what-it-says":
  doThis();
  break;

}

});

}



