var Doctor = require('../models/doctor'); 


    // create a doctor in the database giving correct body
    const createDoctor = async (req,res,next) =>{
      
      if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.latitude || !req.body.longitude || !req.body.password || !req.body.speciality) {
        res.status(400).json({
          message: "parameters can't be empty!"
        })
        return;
      }

      const doctor = new Doctor({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
        password: req.body.password,
        birthDate : req.body.birthDate,
        address: req.body.address,
        phone : req.body.phone,
        gender : req.body.gender,
        email : req.body.email,
        speciality: req.body.speciality,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        facebookPage : req.body.facebookPage,
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
    }