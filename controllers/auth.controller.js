const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    username: req.body.username,
    userEmail: req.body.userEmail,
    userPassword: bcrypt.hashSync(req.body.userPassword, 8),
  })
    .then((user) => {
      collectionServices.insertCollectionForUser(user.userID);
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.userPassword,
        user.userPassword
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.userID }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        userID: user.userID,
        name: user.name,
        username: user.username,
        userEmail: user.userEmail,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
