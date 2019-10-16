# LIRI-Node-App

LIRI is like iPhone's SIRI, however, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in one of four parameters and gives you back data. LIRI uses the following commands:

- concert-this
- spotify-this-song
- movie-this
- do-what-it-says

## Technologies Used:

- Node.js 
- JavaScript
- NPM Packages: Axios, Colors, Moment, Node-Spotify-API
- APIs: Spotify API, OMDB API, and Bands In Town API

## concert-this:

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

- Name of the venue
- Venue location
- Date of the Event (use moment to format this as "MM/DD/YYYY")


### Function: 

![Image of concert-this function](/Images.concert-this.PNG)

### Input:

![Image of concert-this input/command](/Images.concert-this-command.PNG)


### Output:

![Image of concert-this output](/Images.concert-this-output.PNG)


## spotify-this-song:

This will show the following information about the song in your terminal/bash window

- Artist(s)
- The song's name
- A preview link of the song from Spotify
- The album that the song is from

## movie-this:

This will output the following information to your terminal/bash window:

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.

## do-what-it-says:

LIRI will use the text from “random.txt” and call on of LIRI’s commands. It should run Spotify-this-song for “I want it That way”.
