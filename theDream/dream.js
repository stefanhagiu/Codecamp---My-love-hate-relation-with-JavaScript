const fetch = require('node-fetch');

let player = {
    init: function () {
        return fetch("http://127.0.0.1:1234/initPlayer", { method: 'GET'});
    }
};
function loadMovie () {
    return fetch("http://127.0.0.1:1234/authMovie", { method: 'GET'});
};

function play(movieId, cancelButton) {
    let playError;
    //cancelButton.addEventListener("click", function() { playError = "cancelled"});
    let result = [player.init(), loadMovie()];
    return result.reduce( (accumulator, current) => {
        return Object.assign(accumulator, current);
    }, {});
}

console.log(play(1, {}));