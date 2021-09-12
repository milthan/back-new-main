const env = require("../config/env");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.user = require("./user.model.js")(sequelize, Sequelize);

db.recipe = require("./recipe.model.js")(sequelize, Sequelize);

db.foodtag = require("./foodtag.model.js")(sequelize, Sequelize);
db.recipe_foodtag = require("./recipe_foodtag.model.js")(sequelize, Sequelize);

db.cooking_process = require("./cooking_process.model.js")(sequelize, Sequelize);
db.ingrecategories = require("./ingre_categories.model.js")(sequelize, Sequelize);
db.recipes_ingredient = require("./recipes_ingredient.model.js")(sequelize, Sequelize);

db.recipe_collection = require("./recipe_collection.model.js")(sequelize, Sequelize);
db.collection = require("./collection.model.js")(sequelize, Sequelize);

db.rating = require("./rating.model.js")(sequelize, Sequelize);
db.emoji = require("./emoji.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

//Database Associations
db.user.hasOne(db.collection, { foreignKey:"userID"}); 
db.collection.belongsTo(db.user, { foreignKey:"userID"});

//recipe_collection m-m
db.recipe.belongsToMany(db.collection, { through: db.recipe_collection, foreignKey: "recipeID" });
db.collection.belongsToMany(db.recipe, { through: db.recipe_collection, foreignKey: "collectionID" });
db.user.hasMany(db.recipe, {foreignKey:"userID" }); 
db.recipe.belongsTo(db.user, { foreignKey:"userID" });
db.recipe.hasMany(db.cooking_process, { foreignKey:"recipeID"}); 
db.cooking_process.belongsTo(db.recipe, {foreignKey:"recipeID"});
db.recipe.hasMany(db.rating, { foreignKey:"recipeID"}); 
db.rating.belongsTo(db.recipe, { foreignKey:"recipeID"});

//comment m-m
db.recipe.belongsToMany(db.emoji, { through: db.comment, foreignKey: 'recipeID' });
db.emoji.belongsToMany(db.recipe, { through: db.comment, foreignKey: 'emojiID' });

// //recipe_foodtag m-m
// db.recipe.belongsToMany(db.foodtag, { through: db.recipe_foodtag, foreignKey: 'recipeID' });
// db.foodtag.belongsToMany(db.recipe, { through: db.recipe_foodtag, foreignKey: 'tagID' });

//recipe_selectfoodtag o-m
db.recipe.hasMany(db.recipe_foodtag, { foreignKey:"recipeID"});
db.recipe_foodtag.belongsTo(db.recipe,{ foreignKey:"recipeID"});


//recipes_ingredient m-m
//db.recipe.belongsToMany(db.all_ingredients, { through: db.recipes_ingredient, foreignKey: 'recipeID'});
//db.all_ingredients.belongsToMany(db.recipe, { through: db.recipes_ingredient, foreignKey: 'ingredientID'});

//recipes_ingredient o-m
db.recipe.hasMany(db.recipes_ingredient, { foreignKey:"recipeID"});
db.recipes_ingredient.belongsTo(db.recipe,{ foreignKey:"recipeID"});

db.ingrecategories.hasMany(db.recipes_ingredient, { foreignKey:"categoryID"});
db.recipes_ingredient.belongsTo(db.ingrecategories, { foreignKey:"categoryID"});

//db.recipe.belongsToMany(db.unit, { through: db.recipes_ingredient, foreignKey: 'recipeID' });
//db.unit.belongsToMany(db.recipe, { through: db.recipes_ingredient, foreignKey: 'unitID' }); 

//db.recipe.belongsToMany(db.ingrecategories, { through: db.recipes_ingredient, foreignKey: 'recipeID' });
//db.ingrecategories.belongsToMany(db.recipe, { through: db.recipes_ingredient, foreignKey: 'categoryID' });

//additional_ingredient m-m
//db.recipe.belongsToMany(db.unit, { through: db.additional_ingredient, foreignKey: 'recipeID' });
//db.unit.belongsToMany(db.recipe, { through: db.additional_ingredient, foreignKey: 'unitID' });

//db.recipe.belongsToMany(db.ingrecategories, { through: db.additional_ingredient, foreignKey: 'recipeID' });
//db.ingrecategories.belongsToMany(db.recipe, { through: db.additional_ingredient, foreignKey: 'categoryID' });
 
module.exports = db;
