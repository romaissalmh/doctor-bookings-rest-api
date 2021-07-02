
var express = require('express'); 
var doctorController = require('../controllers/doctor');

var router= express.Router(); 

router.post('/', doctorController.createDoctor);
router.get('/getDoctor/:id', doctorController.getDoctor);
router.get('/', doctorController.getAllDoctors);
router.delete('/:id', doctorController.deleteDoctor);
router.get('/bySpeciality', doctorController.getDoctorsBySpeciality);

module.exports = router
