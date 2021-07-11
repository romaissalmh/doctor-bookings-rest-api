
var express = require('express'); 
var adviceReqController = require('../controllers/adviceRequest');
var {verifyTokenPatient, verifyTokenDoctor} = require('./verifyToken')

var router= express.Router(); 

router.post('/',verifyTokenPatient,adviceReqController.createAdviceRequest);
router.get('/', adviceReqController.getAllAdviceRequests);
router.get('/byDoctor/:id',verifyTokenDoctor, adviceReqController.getAllAdviceRequestsByDoctor);
router.get('/byPatient/:id',verifyTokenPatient, adviceReqController.getAllAdviceRequestsByPatient);


module.exports = router

