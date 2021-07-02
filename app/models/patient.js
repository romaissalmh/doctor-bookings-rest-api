import mongoose from 'mongoose';


const patientSchema = mongoose.Schema({
  
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  bloodType: { type: Number, required: true },
  personalDisease: { type: String, required: true },
});

module.exports = mongoose.model('Patient', patientSchema);

