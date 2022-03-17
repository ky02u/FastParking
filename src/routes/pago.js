const express = require('express')
const router = express.Router();

const pool = require('../database'); //conexion db
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async(req, res) => {
    const pago = await pool.query('SELECT * FROM pago ')
    console.log(pago)
    res.render('pago/list',  { pago });
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('pago/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { costo} = req.body;
    const newPago = {
        costo
    };
    await pool.query('INSERT INTO pago set ?', [newPago]);
    req.flash('success', 'Registro de pago correctamente');
    res.redirect('/pago');
});

router.get('/', isLoggedIn, async(req, res) => {
    const pago = await pool.query('SELECT * FROM pago ')
    console.log(pago)
    res.render('pago/list',  { pago });
});

router.get('/delete/:id_pago', isLoggedIn, async (req, res) => {
    const {id_pago} = req.params;
    await pool.query('DELETE FROM pago WHERE id_pago = ?',[id_pago])
    req.flash('success', 'Pago cancelado de manera correcta!');
    res.redirect('/pago')
});

router.get('/edit/:id_pago', isLoggedIn, async (req, res) => {
    const {id_pago} = req.params;  
    const pagos = await pool.query('SELECT * FROM pago where id_pago = ?', [id_pago]);     
    res.render('pago/edit', {pago: pagos[0]});
    console.log(pagos)

}); 

router.post('/edit/:id_pago', isLoggedIn, async (req,res) =>{
    const { id_pago } = req.params; 
    const {costo} = req.body;
    const newPago2 = {
        costo
    };
    await pool.query('UPDATE pago set ? WHERE id_pago = ?', [newPago2, id_pago]); 
    req.flash('success', 'Pago corregido de manera correcta');   
    res.redirect('/pago');
    console.log(req.body)

});

module.exports = router;
