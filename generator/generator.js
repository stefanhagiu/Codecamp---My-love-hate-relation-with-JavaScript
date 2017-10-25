const fetch = require('node-fetch');
let player = {
    init: function () {
        return fetch("http://127.0.0.1:1234/initPlayer", { method: 'GET'});
    }
};
function loadMovie () {
    return fetch("http://127.0.0.1:1234/authMovie", { method: 'GET'});
};

function* play(movieId, cancelButton) {
    var playError;
    //cancelButton.addEventListener("click", function() { playError = "cancelled"});
    let result = [yield player.init(), yield loadMovie()];
    result[0] = yield result[0].json();
    result[1] = yield result[1].json();

    return result.reduce( (acc, cur) => {
        return Object.assign(acc, cur);
    }, {});
}

function spawn (generator) {
    return new Promise((resp, reje) => {
        let onResult = (lastPromiseResult) => {
            let {value, done} = generator.next(lastPromiseResult);
            if (!done) {
                value.then(onResult, reje);
            } else {
                resp(value);
            }
        }
        onResult();
    });
}
spawn(play(1, {})).then(console.log, console.error);