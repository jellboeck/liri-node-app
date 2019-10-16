// require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var colors = require("colors");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

switch (action) {
    case "concert-this":
        concertThis(value);
        break;

    case "spotify-this-song":
        spotifyThis(value);
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
            for (var i = 0; i < 5; i++) {
                console.log(colors.cyan("Artist: " + artist));
                console.log(colors.cyan("Venue: " + response.data[i].venue.name));
                console.log(colors.cyan("City: " + response.data[i].venue.city));
                var eventDate = moment(response.data[i].datetime).format('MM/DD/YYYY');
                console.log(colors.cyan("Date: " + eventDate));
                console.log(colors.magenta("------------"))
            }
        })
}

function spotifyThis() {

    if (value === "") {
        var songName = "Hotel California"
    }

    else {
        var songName = value;
    }

    spotify
        .search({ type: 'track', query: songName, limit: 1 })
        .then(function (response) {
            var song = response.tracks.items[0];
            if (song != undefined) {
                console.log(colors.magenta("------------"))
                for (i = 0; i < song.artists.length; i++) {
                    console.log("Artist: " + song.artists[i].name);
                }
                console.log("Song Name: " + song.name);
                console.log("Preview Link: " + song.preview_url);
                console.log("Album Name: " + song.album.name);
                console.log(colors.magenta("------------"))
            } else {
                console.log(colors.red("Sorry! Can't find this song!"));
            }
        })
}

function movieThis() {
    if (value === "") {
        var movieName = "Mr Nobody"
    }

    else {
        var movieName = value;
    }

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
        output = data.split(",");

        if (output[0] === "spotify-this-song") {
            value = output[1];
            spotifyThis(value);
        }

        if (output[0] === "concert-this") {
            value = output[1];
            concertThis(value);
        }

        if (output[0] === "movie-this") {
            value = output[1];
            movieThis(value);
        }
    })
};











