const recipes = require("../models/Recipes")

module.exports = {
    index(req, res) {
        recipes.all(function(items) {
            return res.render("admin/index", {items})
        })    
    },
    create(req, res){
        recipes.chefSelectOptions(function(options) {
            return res.render("admin/create", {chefOptions: options})
        })
    },
    show(req, res) {
        recipes.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipe not found")

            return res.render("recipe/show", {items: recipe})
        })
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill in all fields")
            }
        }

        recipes.create(req.body, function(recipe) {
            return res.redirect(`/admin/recipes`)
        })
    },
    edit(req, res) {
        recipes.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipe not found")

            return res.render("recipe/edit", {item: recipe})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill in all fields")
            }
        }

        recipes.updated(req.body, function() {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res) {
        recipes.delete(req.body.id, function() {
            return res.redirect("recipes")
        })
    }
}