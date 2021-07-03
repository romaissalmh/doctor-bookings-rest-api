var Doctor = require('../models/doctor'); 
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const loginDoctor = async(req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
      res.status(400).send({ success: false, error: "Please provide your phone number and password" })
  }
  // check for doctor
  else {
      const doctor = await Doctor.findOne({ phone: phone  })

      if (!doctor) {
          res.status(401).send({ success: false, error: "Invalid credentials" })
      } else {

          const passwordCorrect = await bcrypt.compare(password, doctor.password);

          if (!passwordCorrect) {
              res.status(401).send({ success: false, error: "Invalid credentials" })

          } else {
             
              const token = jwt.sign({ id: doctor._id, role: "doctor" }, process.env.JWT_SECRET);
              res.send({ success: true, token: token, userId: doctor._id, role:"doctor"});
      
          }
      }
  }
}
    // create a doctor in the database giving correct body
    const createDoctor = async (req,res,next) =>{
      
      if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.latitude || !req.body.longitude || !req.body.password || !req.body.speciality) {
        res.status(400).json({
          message: "parameters can't be empty!"
        })
        return;
      }
      var salt = bcrypt.genSaltSync(10);
      var hashPassword = bcrypt.hashSync(req.body.password, salt);
      const doctor = new Doctor({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
        password: hashPassword,
        birthDate : req.body.birthDate,
        address: req.body.address,
        phone : req.body.phone,
        gender : req.body.gender,
        email : req.body.email,
        speciality: req.body.speciality,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        facebookPage : req.body.facebookPage,
        pictureUrl : req.body.pictureUrl,

      });

      try {
  
          await doctor.save();
          res.status(201).json({
            message: "Doctor added successfully !"
          })
          
      }catch(e){
        res.status(500).json({ error: e.message  })     
      }
    }; 



    // get a specific doctor by id 
    const getDoctor = async (req,res,next) =>{
       // Validate request

      if (!req.params.id) {
        res.status(400).send({
          message: "params 'id' can not be empty!"
        });

        return;
      }

      try
      {
         let doctor = await Doctor.findOne({_id: req.params.id});
         if(doctor != null){
          res.status(200).json(doctor);
        }
         else {
          res.status(404).json({ message: "There is no doctor with id = " + req.params.id});
          return ;
         }
      } 
      catch(e)
      {
        res.status(404).json({ error: e.message   })
      }
    };

    // get the list of all doctors
    const getAllDoctors = async (req,res,next) =>{
      try
      {
        let doctors = await Doctor.find() ; 
        res.status(200).json(doctors);
      }
      catch(e)
      {
        res.status(500).json({ error: e.message  });
      }  
    };

    // get doctors according to a specific speciality
    const getDoctorsBySpeciality = async (req,res,next) =>{
      try
      {
        let doctors = await Doctor.find({
          speciality : req.body.speciality
        }) ; 
        if (doctors != null && doctors.length != 0) {
          res.status(200).json(doctors);

        }
        else {
          res.status(404).json({ message: "There is no doctor found with speciality:"+ req.body.speciality });
          return ;
        }
      }
      catch(e)
      {
        res.status(500).json({ error: e.message  });
      }  
    };
    // remove a doctor from the db
    const deleteDoctor = async (req,res,next) =>{
     
      let doctor = await Doctor.findOne({_id: req.params.id});
        if(doctor== null)
        {
          res.status(404).json({ message: "There is no doctor with this id"  });
          return ;
        }
        try
        {
          await Doctor.deleteOne({_id: req.params.id});
          res.status(200).json({ message: 'Doctor Deleted successfully !' });
        }
        catch(e)
        {
          res.status(500).json({ error: e.message  });
        }
      
     
    };

    module.exports =  {
      createDoctor,
      getDoctor,
      getAllDoctors,
      deleteDoctor,
      getDoctorsBySpeciality,
      loginDoctor
    }