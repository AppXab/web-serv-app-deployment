const express = require('express');
const hbs = require('hbs'); //readyMade html  templates library handlebars
const fs = require('fs');

const port = process.env.PORT || 3000;



var app = express();

app.set('view engine', 'hbs'); //set vew engine
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials'); //common template we can use in multiple  hbs files 

app.use(express.static(__dirname + '/public')); //render static html page

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log); //it will log date get/post method and url to the terminal
  fs.appendFile('server.log', log + '\n');
  next(); //imp to  navigate 
});


app.use((req, res, next) => {
  // res.render('maintanance.hbs');
  next();
})

app.get('/', (req, res) => {
  // res.send('hello express');//normal text
  res.send({ //json format
    yo: "man",
    go: "man"
  })
});

app.get('/home', (req, res) => {
  res.render('home.hbs', { //handalbar file
    pageTitle: "Home", //dynamic values , put this value in double curly bracket {{}} at .hbs files
    heading: "welcome to home",
    currentYear: new Date().getFullYear()
  })
})


app.get('/about', (req, res) => {
  // res.send("abt page");
  res.render('about.hbs', {
    pageTitle: 'abt page',
    currentYear: new Date().getFullYear()
  });
})
app.get('/portfolio', (req, res) => {
  // res.send("abt page");
  res.render('portfolio.hbs', {
    pageTitle: 'here are our portfolios',
    currentYear: new Date().getFullYear()
  });
})
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});