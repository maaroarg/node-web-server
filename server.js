const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

//Registro el dir de partials
hbs.registerPartials(__dirname + '/views/partials');

//Registro una funcion helper sin params
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.set('view_engine','hbs');

//Creo un logger de lo que recibo via express middleware
app.use((req,res,next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n'); //Guardo el log en un archivo
  next();
});

//Mensaje de mantenimiento
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//Le indico a Express donde corre el contenido static del sitio
app.use(express.static(__dirname + '/public'));

//Responde algo ante GET al root directory
app.get('/',( req, res ) => {
  res.render('home.hbs',{
    pageTitle: 'Home!',
    welcomeMessage: 'Welcome dude!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    code: 500,
    message: 'Error cosa'
  });
});

//Levanta el server en un puerto
app.listen(port, () => {
  console.log(`Server up and running...port: ${port}`);
});
