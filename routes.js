const express = require("express")
const routes = express.Router()
const show = require("./controllers/show")
const recipes = require("./controllers/recipes")


routes.get("/", show.home)
routes.get("/aboutus", show.aboutus)
routes.get("/recipes", show.recipes)
routes.get("/recipe/:index", show.unit)

routes.get("/admin/recipes", recipes.index); 
routes.get("/admin/recipes/create", recipes.create); 
routes.get("/admin/recipes/:index", recipes.show); 
routes.get("/admin/recipes/:index/edit", recipes.edit); 
routes.post("/admin/recipes", recipes.post); 
routes.put("/admin/recipes", recipes.put); 
routes.delete("/admin/recipes", recipes.delete); 

routes.use(function(req, res){
    res.status(404).render("not-found")
})

module.exports = routes