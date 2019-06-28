liri-node-app
This project is a siri clone, except for a command line interface. It will take several different commands and arguments and then run the argument through the appropriate API to generate a response which is then output to the screen. If no arguments are given, default values will be substituted.

Getting Started
To run the program, first install the correct dependencies with npm. A package.json file is supplied. You will need to provide your own API keys and place them in the keys.js file with the following syntax:
--------------------------
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
---------------------------

Prerequisites
Node.js must be installed on machine. See https://nodejs.org/en/download/ for instructions.

Overview
Please see the homework instructions for full installation requirements. Once installed, the following commands are recognized:

concert-this <?>
spotify-this-song <?>
movie-this <?>
do-what-it-says

Test Videos:
https://youtu.be/OQJUa90TNFE

Deployment
Navigate to https://github.com/aaaronmiller/liri-node-app to clone.

Built With
Visual Studio Code

Versioning
We use github for version control (https://github.com/your/project/tags).

In development
    -input is not verified, if the search term does not exist in the API database it will return errors.
    -the randomize function will not call the first or last values in the array due to how it chooses if the  number refers to a command or search in the array; the result is increased by 1 if it does not align properly which then never chooses value 0 and is undefined if the value is the maximum.
    -the randomize function will not work with movies or concerts because of an asyncronous error where removing the quotes from the input variable is executed after the associated API request.

Author
Aaron Miller

License
This project is not licensed.

Acknowledgments
Joe Rehfuss
Trae Shanks
Lan Truong
James Hanley

The LIRI app uses the following APIs:

Bands in Town Artist Events API
Spotify
OMDB