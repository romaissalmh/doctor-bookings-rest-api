var Patient = require('../models/patient'); 
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const loginPatient = async(req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
      res.status(400).send({ success: false, error: "Please provide your phone number and password" })
  }
  // check for patient
  else {
      const patient = await Patient.findOne({ phone: phone  })

      if (!patient) {
          res.status(401).send({ success: false, error: "Invalid credentials" })
      } else {

          const passwordCorrect = await bcrypt.compare(password, patient.password);

          if (!passwordCorrect) {
              res.status(401).send({ success: false, error: "Invalid credentials" })

          } else {
             
              const token = jwt.sign({ id: patient._id, role: "patient" }, process.env.JWT_SECRET);
              res.send({ success: true, token: token, userId: patient._id, role:"patient"});
      
          }
      }
  }
}
    // create a patient in the database giving correct body
    const createPatient = async (req,res,next) =>{
      
      if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.password || !req.body.bloodType) {
        res.status(400).json({
          message: "parameters can't be empty!"
        })
        return;
      }
      
      var salt = bcrypt.genSaltSync(10);
      var hashPassword = bcrypt.hashSync(req.body.password, salt);
      const patient = new Patient({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
        password: hashPassword,
        birthDate : req.body.birthDate,
        address: req.body.address,
        phone : req.body.phone,
        gender : req.body.gender,
        email : req.body.email,
        weight: req.body.weight,
        height : req.body.height,
        bloodType : req.body.bloodType,
        personalDisease : req.body.personalDisease

      });

      try {

          let p = Patient.findOne({phone: req.body.phone})
          if(p!=null){
            res.status(400).json({
                message: "This phone number is already used!"
              })
              return ;
          }
          await patient.save();
          res.status(201).json({
            message: "Patient added successfully !"
          })
          
      }catch(e){
        res.status(500).json({ error: e.message  })     
      }
    }; 



    // get a specific patient by id 
    const getPatient = async (req,res,next) =>{
       // Validate request

      if (!req.params.id) {
        res.status(400).send({
          message: "params 'id' can not be empty!"
        });

        return;
      }

      try
      {
         let patient = await Patient.findOne({_id: req.params.id});
         if(patient != null){
          res.status(200).json(patient);
        }
         else {
          res.status(404).json({ message: "There is no patient with id = " + req.params.id});
          return ;
         }
      } 
      catch(e)
      {
        res.status(404).json({ error: e.message   })
      }
    };

    // get the list of all patients
    const getAllPatients = async (req,res,next) =>{
      try
      {
        let patients = await Patient.find() ; 
        res.status(200).json(patients);
      }
      catch(e)
      {
        res.status(500).json({ error: e.message  });
      }  
    };

    // remove a patient from the db
    const deletePatient = async (req,res,next) =>{
     
      let patient = await Patient.findOne({_id: req.params.id});
        if(patient== null)
        {
          res.status(404).json({ message: "There is no patient with this id"  });
          return ;
        }
        try
        {
          await Patient.deleteOne({_id: req.params.id});
          res.status(200).json({ message: 'Patient Deleted successfully !' });
        }
        catch(e)
        {
          res.status(500).json({ error: e.message  });
        }
      
     
    };



    // update a patient 
    const updatePatient = async (req,res,next) =>{
    try {
        const patient = await Patient.findOne({
            _id: req.params.id
        });
        if (patient) {    // Check if record exists in db
          let updatedPatient = await patient.updateOne(req.body)
          if (updatedPatient) {
            res.status(200).send({
              data: updatedPatient,
              message: 'Patient updated successfully.',
            });
          } 
        } else {
          res.status(404).send({
            message: "Cannot find patient with id"+ req.params.id
          });
        }
      } catch (err) {
        res.status(500).send({
          message: err.message || "Some error occured while updating patient with id: " + req.params.id
        });
      }
    }




    module.exports =  {
      createPatient,
      getPatient,
      getAllPatients,
      deletePatient,
      loginPatient,
      updatePatient
    }