require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
input = "";

action = process.argv[2];
input = input + process.argv.slice(3).join(" ");
// if (typeof(input) === "") {
//     console.log("bad");
//     input = "booger";
inputlog = action + "," + input + ","   ;
fs.appendFile('message.txt', inputlog, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

console.log("\n----------------------------");
console.log("\nWelcome to LiriBOT. Accepted commands are:");
console.log("\n  'concert-this <?>'");
console.log("  'spotify-this-song <?>'");
console.log("  'movie-this <?>'");
console.log("  'do-what-it-says'");
console.log("\n----------------------------");
// console.log(action);
function concert(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function(response) {  
            console.log("\n" + input + " is next playing a concert at:")  
            console.log("\n----------------------------");
            console.log("\nVenue name: " + response.data[0].venue.name)
            console.log("\nCity: " + response.data[0].venue.city)
            console.log("\nDate and time: " + response.data[0].datetime)
          console.log("\n----------------------------");
          responselog =  + response.data[0].venue.name + response.data[0].venue.city + response.data[0].datetime;
          fs.appendFile('message.txt', responselog, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
        }
      );
    };
    
function spotifysearch(input) {
        spotify.search({ type: 'track', query: input }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // if (input === "") {
            //     input = "the sign";
            //     console.log("No input detected. Searching for " + input + " instead");
            // }
            console.log("\nSpotify song info for: " + input)
            console.log("\n----------------------------");
            console.log("\nArtist Name(s): " + data.tracks.items[0].artists[0].name)
            console.log("\nSong Name: " + data.tracks.items[0].name)
            console.log("\nAlbum Name: " + data.tracks.items[0].album.name)
            console.log("\nPreview link on Spotify: " + data.tracks.items[0].preview_url);
            console.log("\n----------------------------");
            responselog =  + data.tracks.items[0].artists[0].name + data.tracks.items[0].name + data.tracks.items[0].album.name + data.tracks.items[0].preview_url;
            fs.appendFile('message.txt', responselog, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
            // console.log(data.tracks.items[0]); 
        });
};

function moviesearch(input) {
 axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
     function(response) {
        console.log("\nOMDB movie information for: " + input)  
        console.log("\n----------------------------");
        console.log("\nMovie name: " + response.data.Title)
        console.log("\nRelease Year: " + response.data.Year)
        console.log("\nIMDB Rating: " + response.data.imdbRating)
        console.log("\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value)
        console.log("\nProduced in: " + response.data.Country)
        console.log("\nLanguage(s): " + response.data.Language)
        console.log("\nPlot: " + response.data.Plot)
        console.log("\nActors in this movie: " + response.data.Actors)
        console.log("\n----------------------------");
        responselog = response.data.Title + response.data.Year + response.data.imdbRating + response.data.Ratings[1].Value + response.data.Country + response.data.Language + response.data.Plot + response.data.Actors;
        fs.appendFile('message.txt', responselog, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    }
    );
};

// console.log(input);
// if (input.length)  > 1) {
//     input = "lady gaga";
//     console.log("No input detected. Searching for " + input + " instead");
// }  
if (action === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);
        var dataArr = data.split(",");
        var rand = parseInt(Math.random()*dataArr.length)+1
        console.log(rand);
        if (rand === dataArr.length) {rand = 0};
        if (rand === dataArr.length-1) {rand = 0};
        if (rand % 2 == 0) {
            action = dataArr[rand];
            input = dataArr[rand+1];
        }
        else {
            action = dataArr[rand+1];
            input = dataArr[rand+2];

        };
        String.prototype.unquoted = function (){return this.replace (/(^")|("$)/g, '')};
    
        // var str='"hello"'

        // console.log(input.unquoted());
        // console.log(dataArr);
        // console.log(action, input);
        console.log("\nOk, I chosen the following command for you:");
        console.log(action, input);
        console.log("\n----------------------------");
        if (action === "concert-this") {
            concert(input);
        }
        else if (action === "spotify-this-song") {
            spotifysearch(input);
        }
        else if (action === "movie-this") {
           moviesearch(input);
        }
      });
}
else if (action === "concert-this") {
    concert(input);
}
else if (action === "spotify-this-song") {
    spotifysearch(input);
}
else if (action === "movie-this") {
    moviesearch(input);
}

else {
    console.log("try a command that doens't suck next time LOOSER");
};
