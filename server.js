const express = require('express');
const hbs = require('hbs');
var fs = require('fs');

var app = new express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`;
    fs.appendFile('server.log', log + '\n', (err)=>{
        console.log(err);
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: "Hello, welcome to our website"
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    })
})

app.get('/bad',(req,res)=>{
    res.send({
     error: "unable to handle request"
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000');
});