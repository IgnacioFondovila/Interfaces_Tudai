/*filtrar resultados*/
let filtros=document.querySelectorAll(".contenedorFiltros")
console.log(filtros)
let filtMob=filtros[0].getElementsByClassName("buttonFilter")
// let filtDesktop=filtros[1].getElementsByClassName("buttonFilter")
let lastClik=null;
for(let filt of filtMob ){
    let ipt= filt.getElementsByTagName("input")
    let archiveFilt= ipt[0].value
    filt.addEventListener("click",function() { 
        if(this.classList.contains("backGris")){
            if(lastClik!=null){
                lastClik.classList.add("backGris")
                lastClik.classList.remove("backVerde")
            }
            lastClik=this
            this.classList.remove("backGris")
            this.classList.add("backVerde")
            filtrarResultados(archiveFilt)
        }else{
            
            this.classList.add("backGris")
            this.classList.remove("backVerde")
            filtrarResultados("all")
        }
    })
}
let results=document.querySelectorAll(".filterResults")
function filtrarResultados(archive){
    console.log(archive);
    if (archive!="all"){
        for(let result of results ){
            if (result.getAttribute("data-value")!=("f"+archive)){
                result.classList.add("hidden")
            }else{
                result.classList.remove("hidden")
            }
        }
    }else{
        for(let result of results ){
            result.classList.remove("hidden")
        }
    }
}
//Borrar lineas svg