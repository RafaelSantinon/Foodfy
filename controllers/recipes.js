const fs = require("fs")
const data = require("../data.json")

exports.index = function (req, res) {
    return res.render("admin/index", {items:data.recipes})
}

exports.create = function(req, res){
    res.render("admin/create")
}

exports.show = function(req, res) {
    const recipeIndex = req.params.index;
    const recipe = data.recipes[recipeIndex];

    if(!recipe){
        return res.render("not-found")
    }
    return res.render("admin/show", {items: recipe})
}

exports.edit = function(req, res) {
    const recipeIndex = req.params.index;
    const recipe = data.recipes[recipeIndex];

    if(!recipe){
        return res.render("not-found")
    }
    return res.render("admin/edit", {item: recipe})
}

exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill in all fields")
        }
    }

    const index = (data.recipes.length)

    data.recipes.push({
        index,        
        ...req.body,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Falha ao salvar a receita!")

        return res.redirect("/admin/recipes")
    })
}

exports.put = function(req, res) {
    const {index} = req.body

    let id = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if(recipe.index == index){
            id = foundIndex
            return true
        }
    })

    if(!foundRecipe) return res.send("Receita não encontrada")

    const recipe = {
        ...foundRecipe,
        ...req.body,
        index: Number(req.body.index)
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na alteração doa dados")

        return res.redirect(`/admin/recipes/${id}`)
    })    
}

exports.delete = function(req, res) {
    const {id} = req.body

    const filteredRecipe = data.recipes.filter(function(recipe){
        return recipe.index != id
    })

    data.recipes = filteredRecipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro no arquivo")

        return res.redirect("/admin/recipes")
    })
}