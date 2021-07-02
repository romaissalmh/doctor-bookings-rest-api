var mongoose = require('mongoose');


const adviceSchema = mongoose.Schema({
  
  description: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true }, 
  idDoctor: {type: ObjectId, ref: 'Doctor'},
  idPatient: {type: ObjectId, ref: 'Patient'},


});

module.exports = mongoose.model('Advice', adviceSchema);

