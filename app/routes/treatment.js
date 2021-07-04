
var express = require('express'); 
var treatmentController = require('../controllers/treatment');

var router= express.Router(); 

router.post('/', treatmentController. createTreatment);
router.get('/getTreatment/:id', treatmentController.getTreatment);
router.get('/', treatmentController.getAllTreatments);
router.delete('/:id', treatmentController.deleteTreatment);
router.put('/:id', treatmentController.updateTreatment);
router.get('/getPatientCurrentTreatments/:id', treatmentController.getPatientCurrentTreatments);


module.exports = router
