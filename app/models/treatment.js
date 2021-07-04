const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const treatmentSchema = mongoose.Schema({
  
  disease: { type: String, required: true },
  treatmentDescription: { type: String, required: true },
  treatmentBeginDate: { type: Date, required: false },
  idBooking: {type: Schema.Types.ObjectId, ref: 'Booking', require:true},
  idPatient :{type: Schema.Types.ObjectId, ref: 'Patient', require:true}, 
  idDoctor:{type: Schema.Types.ObjectId, ref: 'Doctor', require:true}, 
  medicaments: [{
    nomMed: String,
    doseMed: String,
    treatmentEndDate: Date,
  }],

});

module.exports = mongoose.model('Treatment', treatmentSchema);

