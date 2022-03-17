const express = require('express')
const router = express.Router();

const pool = require('../database'); //conexion db
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('vehiculo/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    let fechaEntrada = new Date();
    const { Placa, Tarjeta_Propiedad} = req.body;
    const newVehiculo = {
        Placa,
        Tarjeta_Propiedad,
        fechaEntrada
    };
    await pool.query('INSERT INTO vehiculo set ?', [newVehiculo]);
    req.flash('success', 'Registro vehiculo correctamente');
    res.redirect('/vehiculo');
});

router.get('/', isLoggedIn, async(req, res) => {
    const vehiculo = await pool.query('SELECT * FROM vehiculo ')
    console.log(vehiculo)
    res.render('vehiculo/list',  { vehiculo });
});

router.get('/delete/:id_vehiculo', isLoggedIn, async (req, res) => {
    const {id_vehiculo} = req.params;
    await pool.query('DELETE FROM vehiculo WHERE id_vehiculo = ?',[id_vehiculo])
    req.flash('success', 'Elminado de manera correcta');
    res.redirect('/vehiculo')
});


router.get('/sacarCosto/:id_vehiculo',isLoggedIn, async (req, res) => {
    const {id_vehiculo} = req.params;
    var now = new Date();
    const vehiculos = await pool.query('SELECT fechaEntrada FROM vehiculo where id_vehiculo = ?', [id_vehiculo]);     
    var valor = now -  vehiculos[0].fechaEntrada;
    var cuota = 0.000111111;
    var plata = valor*cuota;
    res.render('vehiculo/sacarCosto');
    req.flash('success', 'Costo calculado de manera correcta', plata);
    res.redirect('/vehiculo')
    localStorage.setItem("plata",plata);
});



router.get('/edit/:id_vehiculo', isLoggedIn, async (req, res) => {
    const {id_vehiculo} = req.params;  
    const vehiculos = await pool.query('SELECT * FROM vehiculo where id_vehiculo = ?', [id_vehiculo]);     
    res.render('vehiculo/edit', {vehiculo: vehiculos[0]});

}); 

router.post('/edit/:id_vehiculo', isLoggedIn, async (req,res) =>{
    const { id_vehiculo } = req.params; 
    const { placa, tarjeta_propiedad } = req.body;
    const newVehiculo2 = {
        placa,
        tarjeta_propiedad
    };
    await pool.query('UPDATE vehiculo set ? WHERE id_vehiculo = ?', [newVehiculo2, id_vehiculo]); 
    req.flash('success', 'Actualizado de manera correcta');   
    res.redirect('/vehiculo');

});

module.exports = router;
