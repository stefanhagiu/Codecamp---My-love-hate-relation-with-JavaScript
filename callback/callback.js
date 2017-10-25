const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let player = {
    init: function (cb) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                player.initialized = true;
                cb();
            }

            if (this.status && this.status !== 200) {
                cb(this.status);
            }
        }
        xhttp.open("GET", "http://127.0.0.1:1234/initPlayer");
        xhttp.send();
    }
};
function loadMovie (cb) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            cb(null, true);
        }

        if (this.status && this.status !== 200) {
            cb(this.status);
        }
    }
    xhttp.open("GET", "http://127.0.0.1:1234/authMovie");
    xhttp.send();   
};

function play(movieId, cancelButton, callback) {
    var movieTicket,
        playError,
        tryFinish = function() {
            if (playError) {
                callback(playError, null)
            } else if (movieTicket && player.initialized) {
                callback(null, true);
            }
        }
    //cancelButton.addEventListener("click", function() { playError = "cancelled"});
    if (!player.initialized) {
        player.init(function (error) {
            if(playError) return;

            playError = error;
            tryFinish();
        })
    }
    loadMovie(function(err, ticket) {
        if(playError) return;

        playError = err;
        movieTicket = ticket;
        tryFinish();
    })
}

play(1, {}, (err, val) => {
    console.log(`error ${err}, value ${val}`);
})