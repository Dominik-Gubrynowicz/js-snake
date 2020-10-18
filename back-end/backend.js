require('dotenv').config()
const mongo = require('mongodb');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');
const { response } = require('express');
let pass = process.env.DB_PASS;
let user = process.env.DB_USER;
const db = require('monk')('mongodb+srv://'+user+':'+pass+'@cluster0.ae4xe.azure.mongodb.net/snake?retryWrites=true&w=majority')
var corsOptions = {
    origin: 'localhost',
    optionsSuccessStatus: 200
}
var corsOptionsProd = {
    origin: 'htpp://clan-dpp.pl',
    optionsSuccessStatus: 200
}

const app = express();
app.use(morgan('tiny'));
app.use(cors(corsOptionsProd));
app.use(express.json());
app.use(helmet());



function insertData(player,scorep,timep){
    const collection = db.get('ranking');
    collection.insert([{nick: player,score: scorep, time: timep}])
      .then((docs) => {
        // docs contains the documents inserted with added **_id** fields
        // Inserted 3 documents into the document collection
      }).catch((err) => {
        // An error happened while inserting
      }).then(() => db.close())
}
function fetchRanking(){

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
            res.send(result); // json object
        }
    });
})
app.post('/insertRanking',(req,res)=>{
/* http://localhost:3000/insertRanking
json
{
	"nick": "adam",
	"score": 69,
	"time": 40	
}*/
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
app.listen(3000, function(){
    console.log("listening on 3000")
})