const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);

const { database } = require('./keys');



//Inicializaciones
const app = express();
require('./lib/passport');


//configuraciones servidor
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'Partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewars
app.use(session({
    secret : 'software1 sesion',
    resave : false, 
    saveUninitialized : false,
    store: new MySQLStore(database)

}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//variables globales
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');    
    app.locals.cliente = req.cliente;
    next();
})

//rutas definimos url
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/vehiculo', require('./routes/vehiculo'));
app.use('/plaza', require('./routes/plaza'));

//archivos publicos
app.use(express.static(path.join(__dirname,'public')))

//start servidor
app.listen(app.get('port'),()=> {
    console.log('Servidor en puerto',app.get('port'));

});