const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const treatmentSchema = mongoose.Schema({
  
  disease: { type: String, required: true },
  treatmentDescription: { type: String, required: true },
  treatmentDate: { type: Date, required: true },
  idBooking: {type: Schema.Types.ObjectId, ref: 'Booking'},

});

module.exports = mongoose.model('Treatment', treatmentSchema);

