var fs = require("fs");
var moment = require('moment');
var request = require("request");
var axios = require("axios");
var dataInput = "";
require("dotenv").config();
//fs.readFile("random.txt", "utf8", function(error, dataRandom) {
//   if (error) {
//      return console.log(error);
//    }
    // We will then print the contents of data
//    console.log(dataRandom);
//});

//fs.readFile("keys.js", "utf8", function(error, data) {
//    if (error) {
//      return console.log(error);
//    }
    // We will then print the contents of data
//    console.log(data);
//});


//var spotify = new spotify(keys.js);



//Input text

var task = process.argv[2];
var dataInput = process.argv[3];

if (task === "do-what-it-says") {
    console.log("DO WHAT IT SAYS");
    fs.readFile("random.txt", "utf8", function(error, dataRandom) {
        if (error) {
          return console.log(error);
        }
        // We will then print the contents of data
        //console.log(dataRandom);
    
    dataArr = dataRandom.split(",");
    task = dataArr[0].trim();
    dataInput = dataArr[1].trim(); 
    console.log("Do what: "+ task);
    console.log("With what data: " + dataInput );
});
}

if (task === "concert-this") {
    console.log("CONCERT THIS");
        axios.get("https://rest.bandsintown.com/artists/"+dataInput+"/events?app_id=codingbootcamp").then(function(response) {
        //console.log(error); 
        console.log (response.data.length);
        console.log("Upcomming concerts for: "+dataInput);
        for (i=0; i<response.data.length; i++) {
            console.log("Venue Name: "+response.data[i].venue.name);
            console.log("Venue Location: "+response.data[i].venue.city);
            console.log("Concert Time: "+response.data[i].datetime);
            }
    
        });

    }
else if (task === "spotify-this-song") {
    console.log("SPOTIFY THIS SONG");
    fs.readFile("keys.js", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        // We will then print the contents of data
        //console.log(data);
    });
    var Spotify = require("node-spotify-api");

    var spotify = new Spotify({
        id: "4cb744ae476f4da78371c59585e3b2e5",
        secret: "fde95638fc624c9e9cc7bbf449da929c"
      });
    if (dataInput === "") {
        dataInput = "The Sign"
        console.log("the sign");
    }   
    console.log("DataInput: "+ dataInput);
    spotify.search({ type: "track", query: dataInput }, function(err, data) {
        if (err) return console.log("Error occurred: " + err);
        var entries = data.tracks.items.length;
        console.log (entries);
        //console.log(data.tracks.items[0].name);
        //console.log(data.tracks.items[0].external_urls.spotify);
        for (i=0; i<entries; i++) {
        console.log("Song Title: "+data.tracks.items[i].name) 
        console.log("Song preview link: " + data.tracks.items[i].external_urls.spotify);
        console.log("Artist Name: "+data.tracks.items[i].album.artists[0].name);
        console.log("The song if from the Album: "+data.tracks.items[i].album.name);
        console.log(" ");

        }
        
        
      });
    

}
else if (task === "movie-this") {
    console.log("MOVIE THIS");
    if (dataInput === "") {
        dataInput = "Mr. Nobody";
    }

    request("https://omdbapi.com/?t=" + dataInput + "&y=&plot=short&apikey=trilogy",function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // Then we print out info
            console.log(JSON.parse(response.body));
            console.log("Movie Title: "+JSON.parse(response.body).Title);
            console.log("Year movie came out: "+JSON.parse(response.body).Year);
            console.log("IMDB Rating: "+JSON.parse(response.body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: "+JSON.parse(response.body).Ratings[1].Value);
            console.log("Country of Production: "+JSON.parse(response.body).Country);
            console.log("Language: "+JSON.parse(response.body).Language);
            console.log("Plot: "+JSON.parse(response.body).Plot);
            console.log("Actors: "+JSON.parse(response.body).Actors);



          }
        });
}
else {
    console.log("Invalid Request.")
}