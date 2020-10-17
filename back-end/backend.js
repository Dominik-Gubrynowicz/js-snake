require('dotenv').config()
const mongo = require('mongodb');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { response } = require('express');
let pass = process.env.DB_PASS;
let user = process.env.DB_USER;
const db = require('monk')('mongodb+srv://'+user+':'+pass+'@cluster0.ae4xe.azure.mongodb.net/snake?retryWrites=true&w=majority')


const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
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

app.get('/',(req, res) =>{
    console.log("request successful")
    res.json({
        message: 'vibe check'
    });
})
app.post('/insertRanking',(req,res)=>{
//  http://localhost:3000/insertRanking?nick=adam&score=12&time=4
    let response = req.query;
    console.log(response["nick"]);
    let nick = response["nick"];
    console.log(response["score"]);
    let score = response["score"];
    console.log(response["time"]);
    let time = response["time"];
    console.log(req.query)
    
    insertData(nick,score,time);
    res.sendStatus(200);
})
app.listen(3000, function(){
    console.log("listening on 3000")
})