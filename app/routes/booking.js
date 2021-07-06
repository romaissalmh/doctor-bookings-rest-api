
var express = require('express'); 
var bookingController = require('../controllers/booking');

var router= express.Router(); 

router.post('/', bookingController.createBooking);
router.get('/getBooking/:id', bookingController.getBooking);
router.get('/', bookingController.getAllBookings);
router.get('/byDoctor/:id', bookingController.getBookingsByDoctor);
router.get('/byPatient/:id', bookingController.getBookingsByPatient);
router.post('/notify', bookingController.notify);

router.delete('/:id', bookingController.deleteBooking);
router.put('/:id', bookingController.updateBooking);

module.exports = router
