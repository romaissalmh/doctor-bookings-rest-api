var mongoose = require('mongoose');


const doctorSchema = mongoose.Schema({
  
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: { type: String, required: false },
  address: { type: String, required: false },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  speciality: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  facebookPage: { type: String, required: false },
  pictureUrl: { type: String, required: false },

});

module.exports = mongoose.model('Doctor', doctorSchema);

