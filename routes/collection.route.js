const { authJwt } = require("../middleware");
const collection = require("../controllers/collection.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  }); 
  app.post("/api/create/collection", collection.createCollection);
  app.get("/api/find/collection/:userID", collection.findCollection);
  app.post("/api/add/collection/:userID/:recipeID", collection.collectingRecipe);
  app.delete("/api/remove/collection/:userID/:recipeID", collection.removeRecipe);
};