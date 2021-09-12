const { authJwt } = require("../middleware");
const recipe = require("../controllers/recipe.controller");
const recipeTag = require("../controllers/recipe_foodtag.controller")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  }); 

  app.post("/api/recipe/create/:userID", recipe.createRecipe);

  app.get("/api/findAll/recipe", recipe.findAll);

  app.get("/api/find/recipe", [authJwt.verifyToken], recipe.findByPk);

  app.get("/api/find/recipe/:recipeID", recipe.findByRecipeID);

  app.delete("/api/detail/delete/:recipeID", recipe.delete); //delete

  app.post("/api/recipe_foodtag/selectTag/:recipeID",recipeTag.selectFoodTag);

  app.put("/api/recipe/editDetail/:recipeID", recipe.editRecipe);

  app.get("/api/find/RecipeInUserProfile/:userID", recipe.RecipeInUserProfile);

  app.get("/api/find/recipeByUserID/:userID", recipe.findByUserID);

  app.get("/api/find/image/:recipeID", recipe.findImage);
};
//[authJwt.verifyToken]