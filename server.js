const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// const random_code = crypto.randomBytes(5).toString('base64url')
let url = null;
let random_code = null;

app.post('/save', (req,res)=>{
    url = req.body.url;
    random_code = req.body.randomcode;
    console.log(random_code);
    console.log(`The Url is ${url}`);

    res.json({
        success: true,
        url: url
    })
})
app.get('/:random_code', (req,res)=>{
    if(!url || !random_code || req.params.random_code !== random_code){
        return res.status(400).send("Error: No url or random code found.");
    }
    res.redirect(url);
});
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})