const signUpTemplate = require('../models/signupModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.createUserData = (createUser, res) => {
  bcrypt.hash(createUser.password, 10, (err, hassPassword) => {
    if (err) {
      console.log(err);
      res.json({
        error: err,
        result: hassPassword,
      });
      return;
    }

    const signedUpUser = new signUpTemplate({
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      email: createUser.email,
      password: hassPassword,
    });
    signedUpUser
      .save()
      .then((user) => {
        res.json({
          user,
          message: 'User added sucessfully',
        });
      })
      .catch((err) => {
        res.json({
          err,
          error: 'An error occured',
        });
      });
  });
};

module.exports.loginUser = async (loginData, res) => {
  const userName = loginData.email;
  const password = loginData.password;

  signUpTemplate.findOne({ email: userName }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
          return;
        }

        if (result) {
          let access_token = jwt.sign({ id: user._id }, 'a(%//5gtrds[]', {
            expiresIn: '1h',
          });
          res.json({ access_token, message: 'Login Succesfully' });
        } else {
          res.json({
            message: 'Incorrect Password',
          });
        }
      });
    } else {
      res.status(404);
      res.json({
        message: 'Invvalid Username / Email address',
      });
    }
  });
};

module.exports.getUserData = async (res) => {
  signUpTemplate.find((err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log('Cannot find model');
    }
  });
};

module.exports.getOneData = async (req, res) => {
  const user = req.params.id;
  signUpTemplate
    .findOne({ user: user })
    .then((result) => {
      if (user) {
        res.send(result);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.deleteData = async (req, res) => {
  const user = req.params.id;
  console.log(user);
  signUpTemplate.findByIdAndRemove(user, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
};
