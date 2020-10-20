require('dotenv').config()
const mongo = require('mongodb');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');
let pass = process.env.DB_PASS;
let user = process.env.DB_USER;
const db = require('monk')('mongodb+srv://'+user+':'+pass+'@cluster0.ae4xe.azure.mongodb.net/snake?retryWrites=true&w=majority')

var corsOptionsProd = {
    origin: 'http://snake.gutowski-dev.pl',
    optionsSuccessStatus: 200
}

const app = express();
app.use(morgan('short'));
app.use(cors(corsOptionsProd));
app.use(express.json());
app.use(helmet());



function insertData(player,scorep,timep){
    const collection = db.get('ranking');
    collection.insert([{nick: player,score: scorep, time: timep}])
      .then((docs) => {
      }).catch((err) => {
      }).then(() => db.close())
}

app.get('/',(req, res) =>{
    console.log("request successful")
    res.json({
        message: 'vibe check'
    });
})
app.get('/ranking',(req, res) =>{
    console.log("request successful")
    const collection = db.get('ranking');
    collection.find({}, function(err, result) {
        if (err) {
            res.send("Error");
        }
        else {
            res.send(result);
        }
    });
})
app.post('/insertRanking',(req,res)=>{
    console.log(req.body);
    let response = req.body;
    console.log(response["nick"]);
    let nick = response["nick"];
    console.log(response["score"]);
    let score = response["score"];
    console.log(response["time"]);
    let time = response["time"];
    
    insertData(nick,score,time);
    res.sendStatus(200);
})
app.listen(process.env.PORT, function(){
    console.log(`listening on ${process.env.PORT}`)
})