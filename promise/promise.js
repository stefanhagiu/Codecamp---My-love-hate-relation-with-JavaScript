const fetch = require('node-fetch');

fetch('flowers.jpg').then(function(response) {
    return response.blob();
}).then(function(myBlob) {
    var objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
});

let player = {
    init: function () {
        return fetch("http://127.0.0.1:1234/initPlayer", { method: 'GET'});
    }
};
function loadMovie () {
    return fetch("http://127.0.0.1:1234/authMovie", { method: 'GET'});
};

function play(movieId, cancelButton, callback) {
    var playError;
    //cancelButton.addEventListener("click", function() { playError = "cancelled"});

    Promise.all([player.init(), loadMovie()])
    .then(
        (data) => {
            if (data[0]) {
                player.initialized = true;
            }
            if (playError) {
                callback(playError, null)
            }
            callback(null, data.map(res => res.json()));
        },
        (error) => {
            callback(error, null)
        }
    )
    .catch(console.error);
}

play(1, {}, (err, val) => {
    if (err) {
        console.log(`error ${err}`);
    }
    val.map( obj => {
        obj.then(console.log, console.error);
    });
});