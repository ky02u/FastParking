const express = require('express')
const router = express.Router();

const pool = require('../database'); //conexion db
const { isLoggedIn } = require('../lib/auth');

router.get('/add',isLoggedIn,(req, res) => {
    res.render('reserva/add');
});

router.post('/add',isLoggedIn, async (req, res) => {
    const { fecha, hora} = req.body;
    const newreserva = {
        fecha,
        hora,
    };
    await pool.query('INSERT INTO reserva set ?', [newreserva]);
    req.flash('success', 'Reserva registrada exitosamente');
    res.redirect('/reserva/list');
});

router.get('/list',isLoggedIn, async(req, res) => {
    const reserva = await pool.query('SELECT * FROM reserva ')
    console.log(reserva)
    res.render('reserva/list',  { reserva });
});

router.get('/delete/:id_reserva',isLoggedIn, async (req, res) => {
    const {id_reserva} = req.params;
    await pool.query('DELETE FROM reserva WHERE id_reserva = ?',[id_reserva])
    req.flash('success', 'Elminado de manera correcta');
    res.redirect('/reserva/list')
});

router.get('/edit/:id_reserva',isLoggedIn, async (req, res) => {
    const {id_reserva} = req.params;  
    const reservas = await pool.query('SELECT * FROM reserva where id_reserva = ?', [id_reserva]);     
    res.render('reserva/edit', {reserva: reservas[0]});

}); 

router.post('/edit/:id_reserva',isLoggedIn, async (req,res) =>{
    const { id_reserva } = req.params; 
    const { fecha,hora  } = req.body;
    const newreserva2 = {
        fecha,
        hora,
    };
    await pool.query('UPDATE reserva set ? WHERE id_reserva = ?', [newreserva2, id_reserva]); 
    req.flash('success', 'Actualizado de manera correcta');   
    res.redirect('/reserva/list');

});

module.exports = router;
