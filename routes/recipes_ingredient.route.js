const { authJwt } = require("../middleware");
const recipes_ingredient = require("../controllers/recipes_ingredient.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/find/MainIngre/:recipeID", recipes_ingredient.findMainIngre); //get
  app.get("/api/find/SubIngre/:recipeID", recipes_ingredient.findSubIngre); //get 
  app.get("/api/find/Flavoring/:recipeID", recipes_ingredient.findFlavoring); //get
  app.post("/api/ingredient/createRecipeIngredient/:recipeID", recipes_ingredient.createRecipeIngredient); //create
  app.put("/api/ingredient/editRecipeIngredients/:re_IngredientsID", recipes_ingredient.editRecipeIngredients); //edit 
  app.get("/api/find/All/ingredient", recipes_ingredient.findAllIngre); //get all
  app.delete("/api/ingredient/deleteByRecipeID/:recipeID", recipes_ingredient.deleteByRecipeID); //delete
  app.post("/api/ingredient/createRecipeIngredientsFormEdit/:recipeID", recipes_ingredient.createRecipeIngredientsFormEdit); //create from edit page
  app.delete("/api/ingredient/deleteByRecipeIngreID", recipes_ingredient.deleteByRecipeIngreID);
  
};
//[authJwt.verifyToken] 