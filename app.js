let express = require('express');
let compression = require('compression');

let app = express();

let personas =[
    {id:1, nombre: "Pepe", email: "pepe@nada.com" },
    {id:2, nombre: "Hugo", email: "hugo@nada.com"} ,
    {id:3, nombre: "Juan", email: "juan@nada.com"} ,
    // Nuevas casos de prueba:
    // Un espacio en blanco en el nombre
    {id:4, nombre: "Diego Armando", email: "da@nada.com"},
    // Acentos en el nombre
    {id:5, nombre: "José", email: "jose@nada.com"}
    ]


// Middleware global   
function capturaURL(req, res, next) {
   console.log(req.url);
   next();
}    

app.use(capturaURL);
//app.use(compression());

// devuelve la version
app.get('/version', function (req, res) {
    res.send('v 1.0.0');
  });
  
// devuelve todas las personas
app.get('/personas', function (req, res) {
  console.log(personas);
  res.send(personas);
});

// devuelve una persona por id
app.get('/personas/:id', function (req, res) {
    let id = req.params.id;
    let personaBuscada = personas.find(persona => persona.id == id);
    if (personaBuscada) {
        console.log(personaBuscada)
        res.send(personaBuscada);   
    } else {
        res.status(400).json('Dato no encontrado');
    }
});
  

// devuelve una persona por nombre
app.get('/personas/buscar/:text', function (req, res) {
    let text = req.params.text;
    let personaBuscada = personas.find(persona => persona.nombre == text);
    if (personaBuscada) {
        console.log(personaBuscada)
        res.send(personaBuscada);   
    } else {
        res.status(400).json('Dato no encontrado');
    }

});


app.listen(3000, function () {
  console.log('Escuchando el puerto 3000!');
});