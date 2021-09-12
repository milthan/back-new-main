const db = require("../models/index");
const Rating = db.rating;

exports.findRating = (req, res) => {
    Rating.findByPk(
        req.params.recipeID
      ).then((rating) => {
      res.status(200).json(    
        rating
      );
    });
  };

  exports.findAllRating = (req, res) => {
    Rating.findAll(
      // { where: { recipeID: req.params.recipeID } }
    ).then((rating) => {
      res.status(200).json(    
        rating
      );
    });
  };