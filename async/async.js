const fetch = require('node-fetch');

let player = {
    init: function () {
        return fetch("http://127.0.0.1:1234/initPlayer", { method: 'GET'});
    }
};
function loadMovie () {
    return fetch("http://127.0.0.1:1234/authMovie", { method: 'GET'});
};

async function play(movieId, cancelButton) {
    var playError;
    //cancelButton.addEventListener("click", function() { playError = "cancelled"});
    let result = [await player.init(), await loadMovie()];
    result[0] = await result[0].json();
    result[1] = await result[1].json();

    return result.reduce( (acc, cur) => {
        return Object.assign(acc, cur);
    }, {});
}

play(1, {}).then(console.log, console.error);