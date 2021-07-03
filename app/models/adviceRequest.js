var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const adviceRequestSchema = mongoose.Schema({
  
  description: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true }, 
  idDoctor: {type: Schema.Types.ObjectId, ref: 'Doctor'},
  idPatient: {type: Schema.Types.ObjectId, ref: 'Patient'},


});

module.exports = mongoose.model('AdviceRequest', adviceRequestSchema);

