const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const string = process.env.MONGO_DB_KEY;
const client = new MongoClient(string);
let db;

async function startdb(){
    try{
    await client.connect();
    db = client.db('url');
    console.log("connected succesfully");
    }catch(e){
        console.error(error);
    }
}

startdb();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
let url = null;
let random_code = null;
let urldb = {
    code: null,
    url: null
}

app.post('/save', async (req,res)=>{
    url = req.body.url;
    random_code = req.body.randomcode;
    urldb = {
        code: random_code,
        url: url
    }
    console.log(urldb)
    try{
    const collection = db.collection("urlshortner"); 
    const result = await collection.insertOne(urldb);
    console.log('saved successfully');
    }catch(e){
        console.error(e);
    }
    res.json({
        success: true,
        url:url,
        random_code: random_code
    })
})

app.get('/:random_code', async (req,res)=>{
    const code = req.params.random_code;
    const collection = db.collection('urlshortner');
    const search_code = {code: code};
    const found = await collection.findOne(search_code);
    const url = found.url;

    if(found===null){
        return res.status(404).send("link not found on db");
    }
    res.redirect(url);
    
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})