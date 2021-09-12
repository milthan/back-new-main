const { authJwt } = require("../middleware");
const cooking_process = require("../controllers/cooking_process.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 
  app.get("/api/find/cooking_process/recipeID/:recipeID", cooking_process.findCookingProcessByRecipeID);
  app.post("/api/cooking_process/createProcess/:recipeID", cooking_process.createProcess);
  app.get("/api/find/all/cooking_process", cooking_process.findAllCookingProcess);
  app.put("/api/cookingProcess/editCookingProcess/:processID", cooking_process.editProcess);
  app.delete("/api/cooking_process/delete/:recipeID", cooking_process.delete);
  app.post("/api/cookingProcess/createProcessFormEdit/:recipeID", cooking_process.createProcessFormEdit); 
  

};