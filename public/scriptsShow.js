const cards = document.querySelectorAll('.card')
const cardsRecipe = document.querySelectorAll('.card-recipe')

for(let card of cards){
    card.addEventListener('click',function(){ 
        
        const index = card.getAttribute('index')
        window.location.href= `/recipe/${index}`
    })
}

for(let cardRecipe of cardsRecipe){
    const hidden = cardRecipe.querySelector('.hidden')
    const secret = cardRecipe.querySelector('.secret')

    secret.addEventListener("click", function(){

        if(hidden.classList.contains("active")){

            hidden.classList.remove("active")
            secret.textContent = "Remover"
        }else{
            
            hidden.classList.add("active")
            secret.textContent = "Mostrar"
        }
    })
}