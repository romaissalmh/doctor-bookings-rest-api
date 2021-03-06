const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const bookingSchema = mongoose.Schema({
  
  bookingDate: { type: String, required: true },
  bookingTime: { type: String, required: true },
  state : {type:String},
  createDate: {
    type: Date,
    default: Date.now,
  },
  idDoctor: {type: Schema.Types.ObjectId, ref: 'Doctor'},
  idPatient: {type: Schema.Types.ObjectId, ref: 'Patient'},
  QRCode : {type: String},


});

module.exports = mongoose.model('Booking', bookingSchema);


  //bookingDateEndTime: { type: Date, required: true },
 /* status: {
    type: String,
    lowercase: true,
    enum: ['accepted', 'pending', 'declined'],
    required: true,
    default: 'pending',
  },*/
