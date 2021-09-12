const { authJwt } = require("../middleware");
const foodtag = require("../controllers/foodtag.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/api/foodtag/createFoodtag", foodtag.createFoodtag);
    app.get("/api/findAll/foodtag", foodtag.findFoodtag);
    app.get("/api/find/FoodtagByPk", foodtag.findByPk);
    

  };
//[authJwt.verifyToken]