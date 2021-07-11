
var express = require('express'); 
var adviceReqController = require('../controllers/adviceRequest');
var {verifyTokenPatient, verifyTokenDoctor} = require('./verifyToken')

var router= express.Router(); 

router.post('/',adviceReqController.createAdviceRequest);
router.get('/', adviceReqController.getAllAdviceRequests);
router.get('/byDoctor/:id',verifyTokenDoctor, adviceReqController.getAllAdviceRequestsByDoctor);
router.get('/byPatient/:id', adviceReqController.getAllAdviceRequestsByPatient);


module.exports = router

