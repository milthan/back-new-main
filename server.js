const express = require("express");
const cors = require("cors");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions)); 

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to yummyyum demo." });
});
 
const db = require("./models/index");

db.sequelize.sync({ alter : true }).then(() => {
  console.log("Drop and Resync with { alter: true }");
});
 
// Create & Listen Server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require("./routes/auth.route")(app); 
require("./routes/user.route")(app);
require("./routes/recipe.route")(app);
require("./routes/recipes_ingredient.route")(app);
require("./routes/foodtag.route")(app);
require("./routes/cooking_process.route")(app);