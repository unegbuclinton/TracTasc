const {
  createUserData,
  loginUser,
  getUserData,
  getOneData,
  deleteData,
} = require('../services/authServices');

module.exports.createUser = (req, res) => {
  const createUser = req.body;

  createUserData(createUser, res);
};

module.exports.loginUser = (req, res) => {
  const loginData = req.body;

  loginUser(loginData, res);
};

module.exports.getRes = async (req, res) => {
  getUserData(res);
};

module.exports.singleUser = async (req, res) => {
  getOneData(req, res);
};

module.exports.deleteUser = async (req, res) => {
  deleteData(req, res);
};
