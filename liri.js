var fs = require("fs");
require("dotenv").config();
//fs.readFile("random.txt", "utf8", function(error, dataRandom) {
//    if (error) {
//      return console.log(error);
//    }
//    return dataArr = dataRandom.split(",");
    //return console.log(dataRandom);
//});
//console.log("Data from random.txt: "+dataArr);
var moment = require('moment');
var request = require("request");
var axios = require("axios");
var dataInput = "";
var key =require("./keys.js");


//Input text

var task = process.argv[2];
var dataInput = process.argv[3];
for (i=4; i<process.argv.length; i++) {
    var dataInput = dataInput + " " +process.argv[i];
    }
//console.log("Arg 2: "+ task);
//console.log("Arg 3: "+dataInput);

if (task == "do-what-it-says") {
    console.log("DO WHAT IT SAYS");
    fs.readFile("random.txt", "utf8", function(error, dataRandom) {
        if (error) {
          return console.log(error);
        }
    
    dataArr = dataRandom.split(",");
    task = dataArr[0].trim();
    dataInput = dataArr[1].trim(); 
    console.log("Do what: "+ task);
    console.log("With what data: " + dataInput );
    if (task === "spotify-this-song") {console.log("Spotify True")};
    if (task === "concert-this") {console.log("Concert True")};
    if (task === "movie-this") {console.log("Movie True")};

    });
    
}
console.log("Task is: "+task);
if (task === "concert-this") {
    console.log("CONCERT THIS");
    console.log(" ");
    if (dataInput == null) {
        var dataInput = "Fleetwood Mac";
    }
        axios.get("https://rest.bandsintown.com/artists/"+dataInput+"/events?app_id=codingbootcamp").then(function(response) {
        console.log(response.data.length+" Upcomming concerts for: "+dataInput);
        console.log(" ");
        for (i=0; i<response.data.length; i++) {
            console.log("Venue Name: "+response.data[i].venue.name);
            console.log("Venue Location: "+response.data[i].venue.city);
            console.log("Concert Time: "+response.data[i].datetime);
            console.log(" ");
            }
    
        });

    }
else if (task === "spotify-this-song") {
    console.log("SPOTIFY THIS SONG");
    console.log(" ");
    var Spotify = require("node-spotify-api");
    var spotify = new Spotify(key.spotify);
    if (dataInput == null) {
        dataInput = "The Sign"
    }   
    spotify.search({ type: "track", query: dataInput }, function(err, data) {
        if (err) return console.log("Error occurred: " + err);
        var entries = data.tracks.items.length;
        console.log(entries +" Songs with: "+ dataInput+" in the title");
        console.log(" ");
        for (i=0; i<entries; i++) {
            console.log("Song Title: "+data.tracks.items[i].name) 
            console.log("Song preview link: " + data.tracks.items[i].external_urls.spotify);
            console.log("Artist Name: "+data.tracks.items[i].album.artists[0].name);
            console.log("The song is from the Album: "+data.tracks.items[i].album.name);
            console.log(" ");

            }
        
      });
    

}
else if (task === "movie-this") {
    console.log("MOVIE THIS");
    console.log(" ");
    if (dataInput == null) {
        dataInput = "Mr. Nobody";
    }

    request("https://omdbapi.com/?t=" + dataInput + "&y=&plot=short&apikey=trilogy",function(error, response, body) {
        if (!error && response.statusCode === 200) {

            //console.log(JSON.parse(response.body));
            if (JSON.parse(response.body).Title == null) {
                console.log("**** Movie not Found ****");
            }
            else {
                console.log("Movie Title: "+JSON.parse(response.body).Title);
                console.log("Movie released in: "+JSON.parse(response.body).Year);
                console.log("IMDB Rating: "+JSON.parse(response.body).Ratings[0].Value);
                if (JSON.parse(response.body).Ratings[1] == null) {
                    console.log("**** No Rotten Tomatoes Rating ****");
                    }
                    else {
                    console.log("Rotten Tomatoes Rating: "+JSON.parse(response.body).Ratings[1].Value);
                    }
                console.log("Country of Production: "+JSON.parse(response.body).Country);
                console.log("Language: "+JSON.parse(response.body).Language);
                console.log("Plot: "+JSON.parse(response.body).Plot);
                console.log("Actors: "+JSON.parse(response.body).Actors);
                }
            }
        });
}
else {
    console.log("**** Invalid Request ****")
}
