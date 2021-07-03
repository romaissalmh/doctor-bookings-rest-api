
var express = require('express'); 
var patientController = require('../controllers/patient');

var router= express.Router(); 

router.post('/', patientController.createPatient);
router.get('/getPatient/:id', patientController.getPatient);
router.get('/', patientController.getAllPatients);
router.delete('/:id', patientController.deletePatient);
router.post('/login', patientController.loginPatient);
router.put('/:id', patientController.updatePatient);

module.exports = router
