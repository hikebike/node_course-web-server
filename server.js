const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;                          //env variable für Heroku, sonst 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials')             //absoluter Pfadname ist wichtig
app.set('view engine', 'hbs');

app.use((req, res, next) => {                                   //register middleware
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err) {
            console.log('Unable to append to server.log.')
        }
    });

    next();

});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));                 //damit nicht alle pfade mit app.get definiert werden müssen

hbs.registerHelper('getCurrentYear',() => {                     //helpers können funktionen zurückgeben, mit und ohne parameter
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {                      //helpers können funktionen zurückgeben, mit und ohne parameter
    return text.toUpperCase();
})

app.get('/', (req, res) => {            //res, req 
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Hello, this is the welcome message'
    });
});

app.get('/about',(req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad',(req, res) =>{
    res.send({
        message:'this is an error'
    });
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


