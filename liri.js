// require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var colors = require("colors");
var moment = require("moment");
var spotify = keys.spotify;
var fs = require("fs");

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

switch (action) {
    case "concert-this":
        concertThis(value);
        break;

    case "spotify-this-song":
        spotify(value);
        break;

    case "movie-this":
        movieThis(value);
        break;

    case "do-what-it-says":
        doWhatItSays(value);
        break;
};


function concertThis() {
    var artist = value;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            console.log(colors.magenta("------------"))
            for (var i = 0 ; i < 5 ; i++) {
            console.log(colors.cyan("Artist: " + artist));
            console.log(colors.cyan("Venue: " + response.data[i].venue.name));
            console.log(colors.cyan("City: " + response.data[i].venue.city));
            var eventDate = moment(response.data[i].datetime).format('MM/DD/YYYY');
            console.log(colors.cyan("Date: "+ eventDate));
            console.log(colors.magenta("------------"))
            }
        })
}

function spotify() {
    var songName = value;
    console.log(songName);
    spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function (error, songResponse) {
        if (error) {
            return console.log(error);
        }

        else {
            console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
            console.log("Song: " + songResponse.tracks.items[0].name);
            console.log("URL: " + songResponse.tracks.items[0].preview_url);
            console.log("Album: " + songResponse.tracks.items[0].album.name);
        }
    });

};

function movieThis() {
    var movieName = value;
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function (response) {
            console.log(colors.magenta("------------"))
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log(colors.magenta("------------"))

        }
    );
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var output = data.split(",");
        for (var i = 0; i < output.length; i++) {
            console.log(output[i]);
        }
    });
};












