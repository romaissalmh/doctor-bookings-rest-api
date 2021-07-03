var AdviceRequest = require('../models/adviceRequest'); 

 
 // create a advice request in the database giving correct body
 const createAdviceRequest = async (req,res,next) =>{
      
    if (!req.body.description || !req.body.idDoctor || !req.body.idPatient ) {
      res.status(400).json({
        message: "parameters can't be empty!"
      })
      return;
    }
 
    const adviceReq = new AdviceRequest({
      idPatient: req.body.idPatient,
      idDoctor : req.body.idDoctor,
      description : req.body.description,
      
    });

    try {

        await adviceReq.save();
        res.status(201).json({
          message: "Advice request added successfully !"
        })
        
    }catch(e){
      res.status(500).json({ error: e.message  })     
    }
  }; 

   // get the list of all advice requests
   const getAllAdviceRequests = async (req,res,next) =>{
    try
    {
      let advices = await AdviceRequest.find() ; 
      res.status(200).json(advices);
    }
    catch(e)
    {
      res.status(500).json({ error: e.message  });
    }  
  };

  module.exports =  {
    getAllAdviceRequests,
    createAdviceRequest
  }