var Treatment = require('../models/treatment'); 

    // create a Treatment in the database giving correct body
    const createTreatment = async (req,res,next) =>{
      
      if (!req.body.disease || !req.body.idBooking || !req.body.treatmentDescription || !req.body.treatmentDate) {
        res.status(400).json({
          message: "parameters can't be empty!"
        })
        return;
      }
   
      const treatment = new Treatment({
        disease: req.body.disease,
        treatmentDescription : req.body.treatmentDescription,
        treatmentDate : req.body.treatmentDate ? req.body.treatmentDate : Date.now(),
        idBooking : req.body.idBooking
      });

      try {
          await treatment.save();
          res.status(201).json({
            message: "Treatment added successfully !"
          })
          
      }catch(e){
        res.status(500).json({ error: e.message  })     
      }
    }; 



    // get a specific treatment by id 
    const getTreatment = async (req,res,next) =>{
       // Validate request

      if (!req.params.id) {
        res.status(400).send({
          message: "params 'id' can not be empty!"
        });

        return;
      }

      try
      {
         let treatment = await Treatment.findOne({_id: req.params.id});
         if(treatment != null){
          res.status(200).json(treatment);
        }
         else {
          res.status(404).json({ message: "There is no booking with id = " + req.params.id});
          return ;
         }
      } 
      catch(e)
      {
        res.status(404).json({ error: e.message   })
      }
    };

    // get the list of all treatments
    const getAllTreatments = async (req,res,next) =>{
      try
      {
        let treatments = await Treatment.find() ; 
        res.status(200).json(treatments);
      }
      catch(e)
      {
        res.status(500).json({ error: e.message  });
      }  
    };

    
    // remove a treatment from the db
    const deleteTreatment = async (req,res,next) =>{
     
      let treatment = await Treatment.findOne({_id: req.params.id});
        if(treatment== null)
        {
          res.status(404).json({ message: "There is no treatment with this id"  });
          return ;
        }
        try
        {
          await Doctor.deleteOne({_id: req.params.id});
          res.status(200).json({ message: 'Treatment Deleted successfully !' });
        }
        catch(e)
        {
          res.status(500).json({ error: e.message  });
        }
      
     
    };

    // update a treatment 
    const updateTreatment = async (req,res,next) =>{
      try {
          const treatment = await Treatment.findOne({
              _id: req.params.id
          });
          if (treatment) {    // Check if record exists in db
            let updated = await treatment.updateOne(req.body)
            if (updated) {
              res.status(200).send({
                data: updated,
                message: 'treatment updated successfully.',
              });
            } 
          } else {
            res.status(404).send({
              message: "Cannot find treatment with id"+ req.params.id
            });
          }
        } catch (err) {
          res.status(500).send({
            message: err.message || "Some error occured while updating treatment with id: " + req.params.id
          });
        }
      }
    module.exports =  {
      createTreatment,
      getTreatment,
      getAllTreatments,
      deleteTreatment,
      updateTreatment
    }