const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const passport = require('passport');
const JWT = require("jsonwebtoken");
const stripeApi = require('stripe')(process.env.STRIPESECRETKEY);
// import models
const {UserModel} = require('../models');

//tinsech il stripe

const JWT_SECRET = process.env.TOKEN_KEY;
signToken = user => {
  return JWT.sign(
      {
        iss: "bikeaholic backend server",
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getMonth() + 1),
        user: user
      },
      JWT_SECRET
  );
};


// get all users
router.get('/', passport.authenticate('jwt', { session: false }),(req, res) => {
  UserModel.find((err, users) => {
    if (err) console.log(err);
    return res.json(users);
  });
});

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { username, password, email} = req.body;
  UserModel.findOne({ "local.email" :email }).then(user => {
    if (user) {
      return res.status(400).json('Email already exists !');
    }
    const avatar = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);
    const newUser = new UserModel({
      method: 'local',
      local:
          {
            username:username,
            email:email,
            avatar:avatar,
            password:password,
            role:"admin"}
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.local.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.local.password = hash;
        newUser
            .save((err) => {
              if (err)  {
                console.log(err.toString());
                res.status(400).json('Register has failed')
              }
              else
                return res.status(200).json('User is succsessfully added');
            })

      });
    });
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  // Find user by username
  UserModel.findOne({ "local.username" :username }).then(user => {
    // Check for user
    if (!user) {
      return res.status(400).json('user not found');
    }
    // Check Password
    if (user.local.role==="admin"){
      bcrypt.compare(password, user.local.password).then(isMatch => {
        if (isMatch) {
          const id = user;
          const {  username, email, avatar } = user.local;
          const payload = { id, username, email, avatar };
          // Sign Token
          jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "20 days" }, (err, token) => {
            return res.json({
              success: true,
              token,
            });
          });
        } else {
          return res.status(400).json('Password incorrect');
        }
      });
    }
  });
});


router.post('/mobile/signin', (req, res,done) => {
  passport.authenticate("local", { session: false }, function(err, user, info)
  {
    if (err) res.send(err);
    if (!user) res.send("unauthorized");
    if (user) done();
  })(req, res, done);

  const token = signToken(new UserModel(req.body));
  res.status(200).send({ token });


});
router.post('/mobile/oauth/google', (req, res,done) => {
  passport.authenticate("google-id-token", { session: false }, function(err, user, info)
  {
    if (err) res.send(err);
    else if (user == false)
      res.status(401).send(info);
    else {
      req.body = user;
      const token = signToken(new UserModel(req.body));
      res.status(200).send({ token });
      done();
    }
  })(req, res, done);

  console.log(req.body);


});

router.post('/mobile/oauth/facebook', (req, res,done) => {
  passport.authenticate("facebookToken", { session: false }, function(err, user, info)
  {
    if (err) res.send(err);
    else if (user == false)
      res.status(401).send(info);
    else {
      req.body = user;
      const token = signToken(new UserModel(req.body));
      res.status(200).send({ token });
      done();
    }
  })(req, res, done);



});

router.post('/mobile/sendsms', (req, res,done) => {
  client.messages
      .create({
        from: +18605533250,
        to: +21651381454,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });

});



router.post('/mobile/signup/local', (req, res,done) => {
  const { fullname, email, password, number } = req.body;

  const newUser = new UserModel({
    method: 'local',
    local: {
      fullname: fullname,
      email: email,
      password: password,
      number: number
    }
  });
  try {
    newUser.save();
    // generate a JWT token
    const token = signToken(newUser);

    // create a customer and associate the user ID with the customer object
    stripeApi.customers.create(
        {
          id: newUser.id,
          email: newUser.local.email,
          name: newUser.local.fullname,
          phone: newUser.local.number,
        },
        function(err, customer) {
          // asynchronously called
          console.log(err);

        }
    );

    // respond with token
    res.status(200).send({ token });
  } catch (err) {
    throw (err);
  }


});

router.post('/mobile/signup/google', (req, res,done) => {
  const { google_id, fullname, email, number } = req.body;

  //TODO : check for email preSign up ( real time client side call)
  const newUser = new UserModel({
    method: 'google',
    google: {
      id: google_id,
      fullname: fullname,
      email: email,
      number: number
    }
  });
  try {
    newUser.save();
    // generate a JWT token
    const token = signToken(newUser);

    // create a customer and associate the user ID with the customer object
    stripeApi.customers.create(
        {
          id: newUser.id,
          email: newUser.google.email,
          name: newUser.google.fullname,
          phone: newUser.google.number,
        },
        function(err, customer) {
          // asynchronously called
          console.log(err);

        }
    );

    // respond with token
    res.status(200).send({ token });
  } catch (err) {
    throw (err);
  }



});

router.post('/mobile/signup/facebook', (req, res,done) => {
  const { facebook_id, fullname, email, number } = req.body;
  const newUser = new UserModel({
    method: 'facebook',
    facebook: {
      id: facebook_id,
      fullname: fullname,
      email: email,
      number: number
    }
  });
  try {
     newUser.save();
    // generate a JWT token
    const token = signToken(newUser);

    // create a customer and associate the user ID with the customer object
    stripeApi.customers.create(
        {
          id: newUser.id,
          email: newUser.facebook.email,
          name: newUser.facebook.fullname,
          phone: newUser.facebook.number,
        },
        function(err, customer) {
          // asynchronously called
          console.log(err);

        }
    );

    // respond with token
    res.status(200).send({ token });
  } catch (err) {
    throw (err);
  }
});









// get user by id
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    return res.json(user);
  });
});

// update user
router.post('/update/:id', (req, res) => {
  var { email, password } = req.body;
  UserModel.findById(req.params.id, function(err, doc) {
    if (err)
      console.log(err);
    doc.email = email;
    doc.avatar = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, false);
    doc.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    doc.save((err, doc) => {
      if (err) res.send(err);
      else {
        const {id, username , email, avatar, createdAt } = doc;
        res.send({id, username , email, avatar, createdAt});}
    });
  });
});

module.exports = router;
