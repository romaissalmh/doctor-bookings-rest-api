import mongoose from 'mongoose';


const treatmentSchema = mongoose.Schema({
  
  treatmentId: { type: Number, required: true },
  disease: { type: String, required: true },
  treatmentDescription: { type: String, required: true },
  treatmentDate: { type: Date, required: true },
  idBooking: {type: ObjectId, ref: 'Booking'},

});

module.exports = mongoose.model('Treatment', treatmentSchema);

