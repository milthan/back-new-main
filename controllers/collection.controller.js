const db = require("../models/index");
const Collection = db.collection;
const RecipeCollection = db.recipe_collection;
const User = db.user;
const Recipe = db.recipe;

exports.createCollection = (req, res) => {
  Collection.create({
    userID: req.userID,
  })
    .then(() => {
      res.send({ message: "Collection is ready to use." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findCollection = (req, res) => {
  Collection.findAll({
    where: { userID: req.params.userID },
    include: [
      {
        model: Recipe,
      },
    ],
  }).then(([collection]) => {
    res.status(200).send([collection]);
  });
};

exports.collectingRecipe = (req, res) => {
  Recipe.findByPk(req.params.recipeID).then((recipe) => {
    if (recipe.shareOption == 1) {
      Collection.findOne({
        where: { userID: req.params.userID },
      }).then((collection) => {
        if (collection) {
          // res.send({message: collection.collectionID})
          RecipeCollection.findOne({
            where: {
              recipeID: req.params.recipeID,
              collectionID: collection.collectionID,
            },
          }).then((recipecol) => {
            if (!recipecol) {
              RecipeCollection.create({
                recipeID: req.params.recipeID,
                collectionID: collection.collectionID,
              })
                .then(() => {
                  res.status(200).send({
                    message: "Recipe is collected to your collection.",
                  });
                })
                .catch((err) => {
                  res.status(500).send({ message: err.message });
                });
            } else {
              return res
                .status(204)
                .send({ message: "Recipe is already in  collection." });
            }
          });
        }
      });
    } else {
      return res.status(405).send({
        message: "This recipe is not for public.",
      });
    }
  });
};

exports.removeRecipe = (req, res) => {
  Collection.findOne({
    where: { userID: req.params.userID },
  }).then((collection) => {
    RecipeCollection.findOne({
      where: {
        recipeID: req.params.recipeID,
        collectionID: collection.collectionID,
      },
    }).then((recipeIn) => {
      if (recipeIn) {
        RecipeCollection.destroy({
          where: { recipeID: req.params.recipeID },
        })
          .then(() => {
            res.status(200).send({
              message: "You remove recipe from the collection completely.",
            });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      } else {
        return res
          .status(204)
          .send({ message: "Recipe not found in  collection." });
      }
    });
  });
};
