const express = require('express');
const hbs = require('hbs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials')             //absoluter Pfadname ist wichtig
app.set('view engine', 'hbs');
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


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});



