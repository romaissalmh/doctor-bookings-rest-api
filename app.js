var express = require('express');
var dotenv = require('dotenv');
var cors = require('cors');

dotenv.config();

const app = express();

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors());



var connection = mysql.createPool({
    host     : 'localhost',
     user    : 'root',
    password : 'root',
    database : 'Doctors'
  
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
      connection.query(query,[req.params.name],function(error,results){
        if (error) { next(error) } else {
          if(results.length>0) {
            data = results[0]
          }
      res.send(JSON.stringify(data));
      }
    })
    });







//Home
app.use((req, res) => {
	res.send('<h1>Welcome to MedTDM REST API</h1>');
});

module.exports = app;
