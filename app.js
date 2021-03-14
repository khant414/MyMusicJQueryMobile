var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
let serverSongArray = [];


// define a SongObject Constructor
const SongObject = function (
    pSong,
    pArtist,
    pAlbum,
    pGenre,
    pYear,
    pSpotify,
    pYoutube
) {
    this.ID =  Math.random().toString(16).slice(5);
    this.Song = pSong;
    this.Artist = pArtist;
    this.Album = pAlbum;
    this.Genre = pGenre;
    this.Year = pYear;
    this.YoutubeURL = pYoutube;
    this.SpotifyURL = pSpotify;
};

serverSongArray.push(
    new SongObject(
        "Dirty Deeds Done Dirt Cheap",
        "ACDC",
        "Dirty Deeds",
        "Rock",
        1976,
        "https://www.youtube.com/watch?v=UIE4UjBtx-o",
        "https://open.spotify.com/track/2d4e45fmUnguxh6yqC7gNT?si=EzQFFb_CSO2bA8DzrNM77g"
    )
);

serverSongArray.push(
    new SongObject(
        "Solitude",
        "Black Sabbath",
        "Masters Of Reality",
        "Rock",
        1971,
        "https://www.youtube.com/watch?v=vmV8niW5GXs",
        "https://open.spotify.com/track/0wjptUxT1jhKZ3Xm4lX8OF?si=jH-n0eCQTIWUBVPfcuEFTw"
    )
);
serverSongArray.push(
    new SongObject(
        "Straight Through The Heart",
        "Dio",
        "Holy Diver",
        "Rock",
        1983,
        "https://www.youtube.com/watch?v=4vDjoLOAA6k",
        "https://open.spotify.com/track/1dlBMzm6CqwQIUQ8PbT3NP?si=DzMnM4TkSySgcwIiJSxxsw"
    )
);
serverSongArray.push(
    new SongObject(
        "Tribute",
        "Tenacious D",
        "Tenacious D",
        "Rock",
        2001,
        "https://www.youtube.com/watch?v=_lK4cX5xGiQ",
        "https://open.spotify.com/track/6crBy2sODw2HS53xquM6us?si=rEPTfIqIQlqbygcxgyFZVA"
    )
);
serverSongArray.push(
    new SongObject(
        "Slow Dancing in the Dark",
        "Joji",
        "BALLADS 1",
        "Hip Hop",
        2018,
        "https://www.youtube.com/watch?v=K3Qzzggn--s",
        "https://open.spotify.com/track/0rKtyWc8bvkriBthvHKY8d?si=sK2Qf_F0QoKcyVfF5P2MFA"
    )
);
serverSongArray.push(
    new SongObject(
        "Dean Town",
        "Vulfpeck",
        "The Beautiful Game",
        "Funk",
        2016,
        "https://www.youtube.com/watch?v=le0BLAEO93g",
        "https://open.spotify.com/track/1oOD1pV43cV9sHg97aBdLs?si=wEqbmvbET1WNxu6FEmXHXA"
    )
);

serverSongArray.push(
    new SongObject(
        "Whiskey River",
        "Willie Nelson",
        "Heroes",
        "Country",
        2018,
        "https://www.youtube.com/watch?v=oVI4dzbYXMc",
        "https://open.spotify.com/track/6gS6XQ4OqMddkgzHNz40E5?si=Abqs74dtTqWuLVerRdvfwA"
    )
);
// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.sendFile(__dirname+ '/index.html')
});

/* Get SongList*/
app.get('/musicList', function(req, res) {
    res.json(serverSongArray);
});
/* POST to addSong */
app.post('/addSong', function(req, res) {
    console.log(req.body);
    serverSongArray.push(req.body);
    // set the res(ponse) object's status propery to a 200 code, which means success
    res.status(200).send(JSON.stringify('success'));
  
});

app.delete('/removeSong/:id', (req, res) => {
    let id = req.params.id;
    for(let i = 0; i<serverSongArray.length; i++) {
        if(serverSongArray[i].ID === id) {
            serverSongArray.splice(i,1);
            res.send('success');
        }
    }
    //if not found
    res.status(404);
});

// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let errorObject ={
        status: "this is real bad",
        stack: "somebody called #$% somebody who called somebody <awful>"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: errorObject
    });
});




app.listen(3000);  // not setting port number in www.bin, simple to do here
console.log('3000 is the magic port');

module.exports = app;
