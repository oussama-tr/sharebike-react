
require('dotenv').config();


const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const UserModel = require("./models/user.model");

let app = express();
let server = require('http').createServer(app);

let mongoUrl = process.env.MONGO_CONNECTION_STRING;

mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log('Connected to Local MongoDB');
  })
  .catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit();
  });
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Passport Config
require('./config/passport')(passport);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  UserModel.findById(id, function(err, user) {
    cb(err, user);
  });
});

app.set('port', process.env.SERVER_PORT || 4000);
// allow-cors
app.use(cors());

app.use(logger('tiny'));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride());
app.use(cookieParser());

// ******************* call all routes ***************************
app.use('/uploads',express.static('uploads'))
app.use('/api', require('./routes'));

// error handling middleware should be loaded after loading the routes
app.use(errorHandler());

server.listen(app.get('port'), error => {
  if (error) {
    //console.error(`\n${error}`);
    server.close();
    process.exit(1);
  }
  console.log(`Server Listening at http://localhost:${app.get('port')}/`);
});

