import mongoose from 'mongoose';


const bookingSchema = mongoose.Schema({
  
  bookingId: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true }, 
  idDoctor: {type: ObjectId, ref: 'Doctor'},
  idPatient: {type: ObjectId, ref: 'Patient'},


});

module.exports = mongoose.model('Booking', bookingSchema);

