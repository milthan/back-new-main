const db = require("../models/index");
const Foodtag = db.foodtag;


exports.createFoodtag = (req, res) => {
    Foodtag.create({
      tagName : req.body.tagName,
    })
      .then(() => { 
        res.send({ message: "Tag created successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.findFoodtag = (req, res) => {
    Foodtag.findAll(
      
    ).then((foodtag) => {
      res.status(200).json(    
        foodtag
      );
    });
  };

  exports.findByPk = (req, res) => {
    Foodtag.findByPk(req.params.tagID).then((foodtag) => {
      res.status(200).json({
        status: true,
        data: foodtag,
      });
    });
  };

  
