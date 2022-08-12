const express = require('express');
const app = express();

const hbs = require('hbs');
const path = require('path');

const PORT = 3000;

const public_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./template");

app.use(express.static(public_path));

app.set('view engine' , 'hbs');
app.set('views',template_path);

app.get("/",(req , res) => {
    res.render("Covid");
} );

app.listen(PORT,()=>{
    console.log(`Running at port ${PORT}`);
})