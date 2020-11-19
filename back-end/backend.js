require('dotenv').config()
const mongo = require('mongodb');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');
let pass = process.env.DB_PASS;
let user = process.env.DB_USER;
const db = require('monk')('mongodb+srv://' + user + ':' + pass + '@cluster0.ae4xe.azure.mongodb.net/snake?retryWrites=true&w=majority')

var corsOptionsProd = {
    origin: 'http://snake.gutowski-dev.pl',
    optionsSuccessStatus: 200
}

const app = express();
app.use(morgan('short'));
app.use(cors(corsOptionsProd));
app.use(express.json());
app.use(helmet());



function insertData(player, scorep, movep) {
    const collection = db.get('ranking');
    collection.insert([{ nick: player, score: scorep, moves: movep }])
        .then((docs) => {
        }).catch((err) => {
        }).then(() => db.close())
}

app.get('/ranking', (req, res) => {
    console.log("request successful")
    const collection = db.get('ranking');
    collection.find({}, function (err, result) {
        if (err) {
            res.send("Error");
        }
        else {
            res.send(result);
        }
    });
})
app.post('/insertRanking', (req, res) => {
    console.log(req.body);
    let response = req.body;
    // inversion on >= checks both for number not being below 0 and not being NaN (NaN is not equal, not bigger and not smaller than any number)
    if (
        typeof response["nick"] !== "string" ||
        !(parseInt(response["score"]) >= 0) ||
        !(parseInt(response["move"]) >= 0)
    )
        res.sendStatus(400);
    else {
        console.log(response["nick"]);
        let nick = response["nick"];
        console.log(response["score"]);
        let score = response["score"];
        console.log(response["move"]);
        let move = response["move"];

        insertData(nick, score, move);
        res.sendStatus(200);
    }
})
app.listen(process.env.PORT, function () {
    console.log(`listening on ${process.env.PORT}`)
})