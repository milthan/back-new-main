const db = require("../models/index");
const Recipe = db.recipe;
const User = db.user;


// Post a recipe
exports.createRecipe = (req, res) => {
  Recipe.create({
    // recipeID: req.body.recipeID,
    recipeName : req.body.recipeName,
    description: req.body.description,
    time: req.body.time,
    shareOption: req.body.shareOption,
    serveNumber: req.body.serveNumber,
    userID :req.params.userID,
  })
    .then((recipe) => { 
      res.status(200).send({ recipeID: recipe.recipeID });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.editRecipe = (req, res) => {
  Recipe.update({
    // recipeID: req.body.recipeID,
    recipeName : req.body.recipeName,
    description: req.body.description,
    time: req.body.time,
    shareOption: req.body.shareOption,
    serveNumber: req.body.serveNumber
  },
  {
    where:{recipeID: req.params.recipeID}
  })
    .then(() => { 
      res.send({ message: "Recipe created successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
 
exports.findAll = (req, res) => {
  Recipe.findAll({
    where: { shareOption: 1 },
    include: {
      model: User,
      attributes: ["userID", "userName", "name"],
    },
  }).then((recipe) => {
    res.status(200).json(recipe);
  });
};

exports.findByRecipeID = (req, res) => { 
  Recipe.findByPk(req.params.recipeID).then((recipe) => { 
    res.status(200).send([recipe])
  });
}; 

exports.findByUserID = (req, res) => { 
  console.log("userID in controller ", req.params.userID);
  Recipe.findAll({
    where: { userID: req.params.userID } 
  }).then((recipe) => { 
    res.status(200).send(recipe)
  });
}; 

exports.RecipeInUserProfile = (req, res) => { 
  Recipe.findAll({ 
    where: { userID: req.params.userID ,shareOption: 1} 
  }).then((recipe) => { 
    res.status(200).send(recipe)
  });
};

exports.findImage = (req, res) => {
  Recipe.findAll({
    where: {recipeID: req.params.recipeID},
    attributes: ['img']
  }).then((img) => {
    res.status(200).send(img)
  });
};

exports.findImage = (req, res) => {
  Recipe.findAll({
    where: {recipeID: req.params.recipeID},
    attributes: ['img']
  }).then((img) => {
    res.status(200).send(img)
  });
};


exports.delete = (req, res) => {
  const recipeID = req.params.recipeID;
  Recipe.destroy({
    where: { recipeID: req.params.recipeID },
  }).then(() => {
    res.status(200).json({
        status: true,
        message: "Recipe was deleted successfully with id = " + recipeID
    });
  });
};

exports.findByPk = (req, res) => {
  Recipe.findByPk(req.params.userID).then((recipe) => {
    res.status(200).json({
      status: true,
      data: recipe,
    });
  });
};