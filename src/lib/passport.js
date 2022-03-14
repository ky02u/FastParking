const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, usuario, password, done) => {
  const rows = await pool.query('SELECT * FROM Cliente WHERE usuario = ?', [usuario]);
  if (rows.length > 0) {
    const cliente = rows[0];
    const validPassword = await helpers.matchPassword(password, cliente.password)
    if (validPassword) {
      done(null, cliente, req.flash('success', 'Welcome ' + cliente.usuario));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'The Username does not exists.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, usuario, password, done) => {
  const { nombre, apellido, tipo_documento, documento, telefono, correo } = req.body;
  const newCliente = {
      nombre,
      apellido,
      tipo_documento,
      documento,
      telefono,
      correo,
      usuario,
      password
  };
  newCliente.password = await helpers.encryptPassword(password);    
  const result = await pool.query('INSERT INTO Cliente SET ? ', newCliente);
  newCliente.id = result.insertId;
  return done(null, newCliente);
}));

//serializar user
passport.serializeUser((cliente, done) => {
  done(null, cliente.id);
  console.log(cliente.id);
});
//deserializar user
passport.deserializeUser(async (id_cliente, done) => {
    const rows = await pool.query('SELECT * FROM Cliente WHERE id_cliente = ?', [id_cliente]);
    done(null, rows[0]);
});