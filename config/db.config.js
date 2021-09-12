const env = require("./env.js");
const model = import("./db.model.js");

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
db.admin = require("../model/admin.model.js")(sequelize, Sequelize);
db.user = require("../model/user.model.js")(sequelize, Sequelize);

db.recipe = require("../model/recipe.model.js")(sequelize, Sequelize);

db.foodtag = require("../model/foodtag.model.js")(sequelize, Sequelize);
db.recipe_foodtag = require("../model/recipe_foodtag.model.js")(sequelize, Sequelize);

db.popular_recipe = require("../model/popular_recipe.model.js")(sequelize, Sequelize);
db.cooking_process = require("../model/cooking_process.model.js")(sequelize, Sequelize);
db.unit = require("../model/unit.model.js")(sequelize, Sequelize);
db.ingrecategories = require("../model/ingre_categories.model.js")(sequelize, Sequelize);
db.all_ingredients = require("../model/all_ingredients.model.js")(sequelize, Sequelize);
db.recipes_ingredient = require("../model/recipes_ingredient.model.js")(sequelize, Sequelize);
db.additional_ingredient = require("../model/additional_ingredient.model.js")(sequelize, Sequelize);

db.recipe_collection = require("../model/recipe_collection.model.js")(sequelize, Sequelize);
db.collection = require("../model/collection.model.js")(sequelize, Sequelize);

db.rating = require("../model/rating.model.js")(sequelize, Sequelize);
db.emoji = require("../model/emoji.model.js")(sequelize, Sequelize);
db.comment = require("../model/comment.model.js")(sequelize, Sequelize);

//Database Associations
db.user.hasOne(db.collection, { foreignKey:"userID"}); 
db.collection.belongsTo(db.user, { foreignKey:"userID"});

//recipe_collection m-m
db.recipe.belongsToMany(db.collection, { through: db.recipe_collection, foreignKey: 'recipeID' });
db.collection.belongsToMany(db.recipe, { through: db.recipe_collection, foreignKey: 'collectionID' });

db.user.hasMany(db.recipe, { foreignKey:"userID"}); 
db.recipe.belongsTo(db.user, { foreignKey:"userID"});

db.recipe.hasMany(db.cooking_process, { foreignKey:"recipeID"}); 
db.cooking_process.belongsTo(db.recipe, { foreignKey:"recipeID"});

db.recipe.hasMany(db.popular_recipe, { foreignKey:"recipeID"}); 
db.popular_recipe.belongsTo(db.recipe, { foreignKey:"recipeID"});

db.recipe.hasMany(db.rating, { foreignKey:"recipeID"}); 
db.rating.belongsTo(db.recipe, { foreignKey:"recipeID"});

//comment m-m
db.recipe.belongsToMany(db.emoji, { through: db.comment, foreignKey: 'recipeID' });
db.emoji.belongsToMany(db.recipe, { through: db.comment, foreignKey: 'emojiID' });

//recipe_foodtag m-m
db.recipe.belongsToMany(db.foodtag, { through: db.recipe_foodtag, foreignKey: 'recipeID' });
db.foodtag.belongsToMany(db.recipe, { through: db.recipe_foodtag, foreignKey: 'tagID' });

//recipes_ingredient m-m
db.recipe.belongsToMany(db.all_ingredients, { through: db.recipes_ingredient, foreignKey: 'recipeID'});
db.all_ingredients.belongsToMany(db.recipe, { through: db.recipes_ingredient, foreignKey: 'ingredientID'});

db.recipe.belongsToMany(db.unit, { through: db.recipes_ingredient, foreignKey: 'recipeID' });
db.unit.belongsToMany(db.recipe, { through: db.recipes_ingredient, foreignKey: 'unitID' });

db.recipe.belongsToMany(db.ingrecategories, { through: db.recipes_ingredient, foreignKey: 'recipeID' });
db.ingrecategories.belongsToMany(db.recipe, { through: db.recipes_ingredient, foreignKey: 'categoryID' });

//additional_ingredient m-m
db.recipe.belongsToMany(db.unit, { through: db.additional_ingredient, foreignKey: 'recipeID' });
db.unit.belongsToMany(db.recipe, { through: db.additional_ingredient, foreignKey: 'unitID' });

db.recipe.belongsToMany(db.ingrecategories, { through: db.additional_ingredient, foreignKey: 'recipeID' });
db.ingrecategories.belongsToMany(db.recipe, { through: db.additional_ingredient, foreignKey: 'categoryID' });
 
module.exports = db;
