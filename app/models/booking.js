import mongoose from 'mongoose';


const bookingSchema = mongoose.Schema({
  
  bookingDate: { type: Date, required: true },
  bookingTime: { type: Date, required: true },

  //bookingDateEndTime: { type: Date, required: true },
 /* status: {
    type: String,
    lowercase: true,
    enum: ['accepted', 'pending', 'declined'],
    required: true,
    default: 'pending',
  },*/
  createDate: {
    type: Date,
    default: Date.now,
  },
  idDoctor: {type: ObjectId, ref: 'Doctor'},
  idPatient: {type: ObjectId, ref: 'Patient'},


});

module.exports = mongoose.model('Booking', bookingSchema);

