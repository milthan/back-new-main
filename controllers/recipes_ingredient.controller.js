const db = require("../models/index");
const RecipeIngre = db.recipes_ingredient;

// exports.findIngreRecipe = (req, res) => {
//   RecipeIngre.findByPk(req.params.recipeID).then((IngreRecipe) => {
//     res.status(200).json(
//       [IngreRecipe]
//     );
//   });
// };

exports.findMainIngre = (req, res) => {
  RecipeIngre.findAll({
    where: { recipeID: req.params.recipeID, categoryID: 1 },
  }).then((MainIngre) => {
    res.status(200).json(MainIngre);
  });
};

exports.findSubIngre = (req, res) => {
  RecipeIngre.findAll({
    where: { recipeID: req.params.recipeID, categoryID: 2 },
  }).then((SubIngre) => {
    res.status(200).json(SubIngre);
  });
};

exports.findFlavoring = (req, res) => {
  RecipeIngre.findAll({
    where: { recipeID: req.params.recipeID, categoryID: 3 },
  }).then((Flavoring) => {
    res.status(200).json(Flavoring);
  });
};

exports.createRecipeIngredient = (req, res) => {
  console.log("createRecipeIngredient");
  console.log(req.body);
  for (i = 0; i < req.body.length; i++) {
    console.log(req.body[i]);
    RecipeIngre.create({
      quantityValue: req.body[i].quantityValue,
      ingredientsName: req.body[i].ingredientsName,
      categoryID:req.body[i].categoryID,
      recipeID: req.params.recipeID,
    })
      .then(() => {})
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
  
  res.send({ message: "Ingredients created successfully!" }); 
};

exports.editRecipeIngredients = (req, res) => {
  console.log("****EditRecipeIngredients");
  console.log("****req.body ",req.body);
    RecipeIngre.update({
      re_IngredientsID: req.params.re_IngredientsID,
      quantityValue: req.body.quantityValue,
      ingredientsName: req.body.ingredientsName,
      recipeID: req.body.recipeID,
      categoryID: req.body.categoryID
    },
    {
      where:{re_IngredientsID: req.params.re_IngredientsID}
    })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  
  res.send({ message: "edit Ingredients เข้ามาตรงหลังบ้านแล้ว" }); 
};

exports.createRecipeIngredientsFormEdit = (req, res) => {
  console.log("createRecipeIngredients");
  console.log(req.body);
    RecipeIngre.create({
      quantityValue: req.body.quantityValue,
      ingredientsName: req.body.ingredientsName,
      recipeID: req.params.recipeID,
      categoryID: req.body.categoryID
    })
      .then(() => {res.send({ message: "Ingredients created successfully!" }); })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
};

exports.findAllIngre = (req, res) => {
  RecipeIngre.findAll({
    // where: { userID: req.params.userID }
  }).then((Flavoring) => {
    res.status(200).json(    
      Flavoring
    );
  });
  // res.status(200).json(    
  //     ["ingredient"]
  // );
};


exports.deleteByRecipeID = (req, res) => {
  const recipeID = req.params.recipeID;
  RecipeIngre.destroy({
    where: { recipeID: req.params.recipeID },
  }).then(() => {
    res.status(200).json({
        status: true,
        message: "cooking process was deleted successfully with id = " + recipeID
    });
  });
};

exports.deleteByRecipeIngreID = (req, res) => {
  console.log("Body",req.body);
  for (i = 0; i < req.body.length; i++) {
    const re_IngredientsID = req.body[i].re_IngredientsID;
    RecipeIngre.destroy({
      where: { re_IngredientsID: req.body[i].re_IngredientsID },
    }).then(() => {
      console.log("deleted successfully");
      res.status(200).json({
        message: "RecipeIngre deleted successfully with id = " + re_IngredientsID
      });
    })
    .catch((err) => {
      console.log("deleted error");
      res.status(500).send({ message: err.message });
    });
  }
};