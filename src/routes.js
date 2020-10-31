const express = require("express")
const routes = express.Router()
const show = require("./app/controllers/show")
const recipes = require("./app/controllers/recipes")
const chefs = require("./app/controllers/chefs")

routes.get("/", show.home)
routes.get("/aboutus", show.aboutus)
routes.get("/recipes", show.recipes)
routes.get("/recipe/:index", show.unit)

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:index", recipes.show)
routes.get("/admin/recipes/:index/edit", recipes.edit)
routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)
routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)

routes.use(function(req, res){
    res.status(404).render("not-found")
})

module.exports = routes