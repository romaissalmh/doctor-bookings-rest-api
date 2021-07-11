var express = require('express'); 
var bookingController = require('../controllers/booking');
var {verifyTokenPatient, verifyTokenDoctor} = require('./verifyToken')
var router= express.Router(); 

router.post('/', bookingController.createBooking);
router.get('/getBooking/:id', bookingController.getBooking);
router.get('/', bookingController.getAllBookings);
router.get('/byDoctor/:id', verifyTokenDoctor, bookingController.getBookingsByDoctor);
router.get('/byPatient/:id', bookingController.getBookingsByPatient);
router.delete('/:id', bookingController.deleteBooking);
router.put('/:id', bookingController.updateBooking);

module.exports = router
