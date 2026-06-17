const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.post('/save', (req,res)=>{
    const url = req.body.url;
    console.log(`The Url is ${url}`);
    res.json({
        success: true,
        url: url
    })
})
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})