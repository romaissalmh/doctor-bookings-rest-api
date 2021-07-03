
var express = require('express'); 
var adviceReqController = require('../controllers/adviceRequest');

var router= express.Router(); 

router.post('/', adviceReqController.createAdviceRequest);
router.get('/', adviceReqController.getAllAdviceRequests);
router.get('/byDoctor/:id', adviceReqController.getAllAdviceRequestsByDoctor);
router.get('/byPatient/:id', adviceReqController.getAllAdviceRequestsByPatient);


module.exports = router

