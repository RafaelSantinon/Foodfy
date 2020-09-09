const express = require("express")
const routes = express.Router()
const recipes = require("./recipes")
const show = require("./show")

routes.get("/", show.home)
routes.get("/aboutus", show.aboutus)
routes.get("/recipes", show.recipes)
routes.get("/recipe/:index", show.unit)

routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:index", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:index/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.use(function(req, res){
    res.status(404).render("not-found")
})

module.exports = routes