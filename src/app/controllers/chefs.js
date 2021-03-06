const chefs = require("../models/Chefs")

module.exports = {
    index(req, res) {
        chefs.all(function(items) {
            return res.render("chef/index", {items})
        })
    },
    create(req, res){
        return res.render("chef/create")
    },
    show(req, res) {
        chefs.find(req.params.id, function(chef) {
            if(!chef) return res.send("Chef not found")

            chefs.findBy(chef.id, function(recipes) {
                return res.render("chef/show", {items: chef, recipes})
            })
        })
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill in all fields")
            }
        }

        chefs.create(req.body, function(chef) {
            return res.redirect(`/admin/chefs`)
        })
    },
    edit(req, res) {
        chefs.find(req.params.id, function(chef) {
            if(!chef) return res.send("Chef not found")

            return res.render("chef/edit", {item: chef})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill in all fields")
            }
        }

        chefs.updated(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {
        chefs.recipesForDelete(req.body.id, function(recipes){
            if(recipes >= 1) res.send("Chef has recipes, impossible to delete!!")


            if(recipes == 0) {
            chefs.delete(req.body.id, function() {
                return res.redirect("admin/chefs")
            })
            }
        })
    }
}