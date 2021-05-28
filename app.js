var express = require('express')
var dotenv = require('dotenv')
var cors = require('cors')
var mysql = require('mysql')

dotenv.config()

const app = express()

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors())




// Connect to DB

const connection = mysql.createConnection(({
  host     : "localhost",
  user     : "root",
  password : "root",
  database : "doctors"
}));

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


  
app.get('/getDoctors',function(req,res,next){  
      var query = "select * from doctors"
      connection.query(query,function(error,results){
        if (error) { next(error) } else {
      res.send(JSON.stringify(results));
      }
    })
    });
    
  
app.get('/getDoctor/:lastName',function(req,res,next){ 
      var data = Object() 
      var query = "select * from doctors where lastName=?"
      connection.query(query,[req.params.lastName],function(error,results){
        if (error) { next(error) } else {
          if(results.length>0) {
            data = results[0]
          }
      res.send(JSON.stringify(data));
      }
    })
    });



//Lien vers la branche déployée : https://app-doctor-bookings.herokuapp.com/


//Home
app.use((req, res) => {
	res.send('<h1>Welcome to MedTDM REST API</h1>');
});

module.exports = app;
