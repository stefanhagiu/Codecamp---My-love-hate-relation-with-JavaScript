"use strict";

const express    = require('express');
const app        = express();       
const bodyParser = require('body-parser');

app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

const port = process.env.PORT || 1234;

function addTimeRandomness(cb) {
    let time = Math.random() * 8000;
    setTimeout(cb, time);
    console.log(`next response set to trigger in ${time}`);
}

function addStatuRandomness(cb) {
    let time = Math.floor(Math.random() * 2);
    let requestStatus;
    time = 0;
    switch(time) {
        case 0:
            requestStatus = 200;
            break;
        case 1:
            requestStatus = 401;
            break;
        case 2:
            requestStatus = 500;
            break;
        default:
            requestStatus = 200;
    }
    cb(requestStatus);
}

function addNrResponsesRandomnes(cb) {
    let time = Math.floor(Math.random() * 2);
    time = 1;
    for (let i = 0; i < time; i++) {
        cb()
    }
}

const router = express.Router();
router
    .get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    })
    .get('/loadPlayer', function(req, res) {
        addTimeRandomness(() => {
            addStatuRandomness((status) => {
                addNrResponsesRandomnes(() => {
                    res.status(status);
                    res.json({playerLaoded: true});
                });
            });
        });
    })
    .get('/authMovie', function(req, res) {
        addTimeRandomness(() => {
            addStatuRandomness((status) => {
                addNrResponsesRandomnes(() => {
                    res.status(status);
                    res.json({movieLaoded: true});
                });
            });
        });
    })
    .get('/initPlayer', function(req, res) {
        addTimeRandomness(() => {
            addStatuRandomness((status) => {
                addNrResponsesRandomnes(() => {
                    res.status(status);
                    res.json({initPlayer: true});
                });
            });
        });
    });

app
    .use('/', router)
    .listen(port);
