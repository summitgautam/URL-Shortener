require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { MongoClient } = require('mongodb');

let db;
let client;

async function startdb(){
    if(db)return db;
    const string = process.env.MONGO_DB_KEY;
    if(!string){
        throw new Error("MONGO_DB_KEY is not defined.");
    }
    client = new MongoClient(string);
    await client.connect();
    db = client.db('url');
    console.log("connected succesfully");
    return db;
   
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.post('/save', async (req,res)=>{
    const url = req.body.url;
    const random_code = req.body.randomcode;
    const urldb = {
        code: random_code,
        url: url
    }
    console.log(urldb)
    try{
        const activedb = await startdb();
    const collection = activedb.collection("urlshortner"); 
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
    try{
    const code = req.params.random_code;
    const activedb = await startdb();
    const collection = activedb.collection('urlshortner');
    const search_code = {code: code};
    const found = await collection.findOne(search_code);
    
    if(found===null){
        return res.status(404).send("link not found on db");
    }
    const url = found.url;
    res.redirect(url);
}catch(e){
    console.error(e);
}
    
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
