
var express = require('express'); 
var doctorController = require('../controllers/doctor');

var router= express.Router(); 

router.post('/', doctorController.createDoctor);
router.get('/getDoctor/:id', doctorController.getDoctor);
router.get('/', doctorController.getAllDoctors);
router.delete('/:id', doctorController.deleteDoctor);
router.get('/bySpeciality/:id', doctorController.getDoctorsBySpeciality);
router.post('/login', doctorController.loginDoctor);
router.put('/:id', doctorController.updateDoctor);
router.get('/getAvailability', doctorController.getAvailabilityByDoctor);

module.exports = router


