
var express = require('express'); 
var adviceReqController = require('../controllers/adviceRequest');

var router= express.Router(); 

router.post('/', adviceReqController.createAdviceRequest);
router.get('/', adviceReqController.getAllAdviceRequests);


module.exports = router

