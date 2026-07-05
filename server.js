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
const urldb = new Map();

let urls = [];
// let redirectt = {
//     random_code: null,
//     url: null
// }

app.post('/save', (req,res)=>{
    url = req.body.url;
    random_code = req.body.randomcode;
    // random_codes.push(random_code);
    urls.push(url);
    // redirectt = {
    //     random_code: random_code,
    //     url: url
    // }
    // console.log(redirectt);  
    // console.log(random_code);
    // console.log(random_codes)
    // console.log(`The Url is ${url}`);
    urldb.set(random_code, url);
    res.json({
        success: true,
        url:url,
        random_code: random_code
    })
})
app.get('/:random_code',(req,res)=>{
    const code = req.params.random_code;
    if(urldb.has(code)){
        const sending = urldb.get(code);
        res.redirect(sending);
    }else{
        return res.status(400).send("error : link not found");
    }
    // if(redirectt.url==url && redirectt.random_code==random_code){
    //     res.redirect(url);
    // }else{
    //     return res.status(400).send("Error");
    // }
    // if(!url || !random_code || urls.includes(url) || random_codes.includes(random_code) || req.params.random_code !== random_code){
    //     return res.status(400).send("Error: No url or random code found.");
    // }
    
});
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})