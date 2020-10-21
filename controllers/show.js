const data = require("../data.json")

exports.home =  function(req, res){
    return res.render("show/home", {items: data.recipes})
}

exports.aboutus = function(req, res){
    return res.render("show/aboutus")
}

exports.recipes = function(req, res){
    return res.render("show/recipes", {items: data.recipes})
}

exports.unit = function (req, res) {
    const recipeIndex = req.params.index;
    const recipe = data.recipes[recipeIndex];

    if(!recipe){
        return res.render("not-found")
    }
    return res.render("show/recipe", {items: recipe})
}