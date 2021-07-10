var Booking = require('../models/booking'); 
var Patient = require('../models/patient'); 
const PushNotifications = require('@pusher/push-notifications-server');

/*
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer B7D2A225BF8F47F0EEC5CB649D7B03C3A027E96798E31B44CD1BF540C1EBA350" \
     -X POST "https://15d051a2-862d-46d0-b3b6-68f3f8004b70.pushnotifications.pusher.com/publish_api/v1/instances/15d051a2-862d-46d0-b3b6-68f3f8004b70/publishes" \
     -d '{"interests":["hello"],"fcm":{"notification":{"title":"Hello", "body":"Hello, world!"}}}'

*/


const fs = require('fs');

var QRCode = require('qrcode');

    const notify = async (req,res,next) => {
      try {
        let pushNotifications = new PushNotifications({
          instanceId: process.env.instanceId,
          secretKey: process.env.secretKey
        });
    
        let publishResponse = await pushNotifications.publishToInterests(['hello'], {
            fcm: {
              notification: {
                title: 'Bonjour Dr',
                body: 'Vous avez un nouveau rendez-vous!',
              },
            },
          })
         console.log('Just published:', publishResponse.publishId);
         res.status(200).json(publishResponse);


      } catch (err) {
        console.error(err)
        res.status(500).json(err);

      }
    }
    // create a booking in the database giving correct body
    const createBooking = async (req,res,next) =>{
      
      if (!req.body.bookingDate || !req.body.idDoctor || !req.body.idPatient) {
        res.status(400).json({
          message: "parameters can't be empty!"
        })
        return;
      }
   
      const booking = new Booking({
        bookingDate: req.body.bookingDate,
        bookingTime: req.body.bookingTime,
        idDoctor : req.body.idDoctor,
        idPatient : req.body.idPatient,
        state : "attente",
      });

      
     
      try {
        
          let d = await booking.save();
          let patient = await Patient.findOne({
            _id : d.idPatient
          })
          let result = {
                _id : d._id,
                bookingDate : d.bookingDate,
                bookingTime : d.bookingTime,
                idDoctor : d.idDoctor,
                idPatient : d.idPatient,
                address : patient.address,
                birthDate : patient.birthDate,
                firstNamePatient : patient.firstName,
                lastNamePatient:patient.lastName,
                phonePatient: patient.phone,
                genderPatient : patient.gender,
                email: patient.email,
                weightPatient: patient.weight,
                heightPatient: patient.height,
                bloodTypePatient: patient.bloodType,
                personalDiseasePatient: patient.personalDisease,
                
          }
          // Converting the data into String format
          let stringdata = JSON.stringify(result)
    
         // await QRCode.toFile('../samyimage.jpeg',stringdata);

          // Converting the data into base64
          let QRcodeRes = await QRCode.toDataURL(stringdata)
          let pushNotifications = new PushNotifications({
            instanceId: process.env.instanceId,
            secretKey: process.env.secretKey
          });
      
          let publishResponse = await pushNotifications.publishToInterests(['hello'], {
              fcm: {
                notification: {
                  title: 'Bonjour Dr',
                  body: 'Vous avez un nouveau rendez-vous!',
                },
              },
            })
           console.log('Just published:', publishResponse.publishId);
          res.status(201).json({QRCode : QRcodeRes})
         
          
      }catch(e){
        res.status(500).json({ error: e.message  })     
      }
    }; 



    // get a specific booking by id 
    const getBooking = async (req,res,next) =>{
       // Validate request

      if (!req.params.id) {
        res.status(400).send({
          message: "params 'id' can not be empty!"
        });

        return;
      }

      try
      {
         let booking = await Booking.findOne({_id: req.params.id});
         if(booking != null){
          res.status(200).json(booking);
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

    // get the list of all bookings
    const getAllBookings = async (req,res,next) =>{
      try
      {
        let bookings = await Booking.find() ; 
        res.status(200).json(bookings);
      }
      catch(e)
      {
        res.status(500).json({ error: e.message  });
      }  
    };

      // get the list of bookings by doctor
      const getBookingsByDoctor = async (req,res,next) =>{
        try
        {
          let bookings = await Booking.find({
            idDoctor : req.params.id,
            state : "attente",
          },
          { bookingDate: 1, bookingTime: 1,idPatient:1,idDoctor:1}
          ) ; 
          res.status(200).json(bookings);
        }
        catch(e)
        {
          res.status(500).json({ error: e.message  });
        }  
      };
            // get the list of bookings by patient
            const getBookingsByPatient = async (req,res,next) =>{
              try
              {
                let bookings = await Booking.find({
                  idPatient : req.params.id,
                  state : "attente",
                },
                {  bookingDate: 1, bookingTime: 1,idPatient:1,idDoctor:1}) ; 
                res.status(200).json(bookings);
              }
              catch(e)
              {
                res.status(500).json({ error: e.message  });
              }  
            };
    
    // remove a booking from the db
    const deleteBooking = async (req,res,next) =>{
     
      let booking = await Booking.findOne({_id: req.params.id});
        if(booking== null)
        {
          res.status(404).json({ message: "There is no booking with this id"  });
          return ;
        }
        try
        {
          await Booking.deleteOne({_id: req.params.id});
          res.status(200).json({ message: 'Booking Deleted successfully !' });
        }
        catch(e)
        {
          res.status(500).json({ error: e.message  });
        }
      
     
    };

    // update a booking 
    const updateBooking = async (req,res,next) =>{
      try {
          const booking = await Booking.findOne({
              _id: req.params.id
          });
          if (booking) {    // Check if record exists in db
            let updated = await booking.updateOne(req.body)
            if (updated) {
              res.status(200).send({
                data: updated,
                message: 'booking updated successfully.',
              });
            } 
          } else {
            res.status(404).send({
              message: "Cannot find booking with id"+ req.params.id
            });
          }
        } catch (err) {
          res.status(500).send({
            message: err.message || "Some error occured while updating booking with id: " + req.params.id
          });
        }
      }

      

    module.exports =  {
      createBooking,
      getBooking,
      getAllBookings,
      deleteBooking,
      updateBooking,
      getBookingsByPatient,
      getBookingsByDoctor,
      notify
    }