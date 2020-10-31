const views = document.querySelectorAll('.view')

for(let view of views){
    card.addEventListener('click',function(){ 
        
        const index = view.getAttribute('index')
        window.location.href= `/admin/recipes/${index}`
    })
}