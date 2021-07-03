
var express = require('express'); 
var bookingController = require('../controllers/booking');

var router= express.Router(); 

router.post('/', bookingController.createBooking);
router.get('/getBooking/:id', bookingController.getBooking);
router.get('/', bookingController.getAllBookings);
router.delete('/:id', bookingController.deleteBooking);
router.put('/:id', bookingController.updateBooking);

module.exports = router
