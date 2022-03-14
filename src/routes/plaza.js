const express = require('express')
const router = express.Router();

const pool = require('../database'); //conexion db


router.get('/add',(req, res) => {
    res.render('plaza/add');
});

router.post('/add', async (req, res) => {
    const { localizacion, tipo_servicio,nivel,estado} = req.body;
    const newPlaza = {
        localizacion,
        tipo_servicio,
        nivel,
        estado
    
    };
    await pool.query('INSERT INTO Plaza set ?', [newPlaza]);
    req.flash('success', 'Registro de plaza correctamente');
    res.redirect('/plaza');
});

router.get('/', async(req, res) => {
    const plaza = await pool.query('SELECT * FROM Plaza ')
    console.log(plaza)
    res.render('plaza/list',  { plaza });
});

router.get('/delete/:id_plaza', async (req, res) => {
    const {id_plaza} = req.params;
    await pool.query('DELETE FROM Plaza WHERE id_plaza = ?',[id_plaza])
    req.flash('success', 'Plaza eliminada de manera correcta!');
    res.redirect('/plaza')
});

router.get('/edit/:id_plaza', async (req, res) => {
    const {id_plaza} = req.params;  
    const plazas = await pool.query('SELECT * FROM Plaza where id_plaza = ?', [id_plaza]);     
    res.render('plaza/edit', {plaza: plazas[0]});
    console.log(plazas)

}); 

router.post('/edit/:id_plaza', async (req,res) =>{
    const { id_plaza } = req.params; 
    const {localizacion, tipo_servicio,nivel,estado } = req.body;
    const newPlaza2 = {
        localizacion,
        tipo_servicio,
        nivel,
        estado
    };
    await pool.query('UPDATE Plaza set ? WHERE id_plaza = ?', [newPlaza2, id_plaza]); 
    req.flash('success', 'Actualizado de manera correcta');   
    res.redirect('/plaza');
    console.log(req.body)

});

module.exports = router;
