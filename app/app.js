var express = require('express')
var dotenv = require('dotenv')
var cors = require('cors')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var doctorRoutes = require('./routes/doctor');
var adviceRequestsRoutes = require('./routes/adviceRequest');

dotenv.config()



const app = express()

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//Connexion à la base de données
console.log(process.env.DEV_DATABASE_URL)
mongoose.connect(process.env.DEV_DATABASE_URL,
	{ useNewUrlParser: true,
	  useUnifiedTopology: true })
	.then(() => console.log('Successful connection to MongoDB !'))
	.catch(() => console.log('Connection to MongoDB failed !'));


app.use(express.static('public/images'));


//Lien vers la branche déployée : https://app-doctor-bookings.herokuapp.com/

app.use('/api/doctors',doctorRoutes);
app.use('/api/adviceRequests',adviceRequestsRoutes);

//Home
app.use((req, res) => {
	res.send('<h1>Welcome to MedTDM REST API</h1>');
});



module.exports = app;
