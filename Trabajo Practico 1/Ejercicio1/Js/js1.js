let col=100;
let fil=100;
let max=101;
let min=0;


let mat=[];
for(let x=0;x<col;x++){
     mat[x]=[];
     for(let y=0;y<fil;y++){
           mat[x][y]= Math.random() * 100;
     }
}
console.table(mat);

//Inciso A
getValorMaximo(mat)

function getValorMaximo(){
      let ValorMaximo=-1;
      for(let x=0;x<col;x++){
            for(let y=0;y<fil;y++){
                  if(mat[x][y]> ValorMaximo){
                        ValorMaximo=mat[x][y];
                  }
            }
      }
      console.log(ValorMaximo);
}
//Inciso B
getValorMaxFilPar_MenorFilImp(mat)

function getValorMaxFilPar_MenorFilImp(){

      for(let x=0;x<fil;x++){
            if(x%2==0){
                  let ValorMaximo=-1;
                  for(let y=0;y<col;y++){
                        if(mat[x][y]> ValorMaximo){
                              ValorMaximo=mat[x][y];
                        }
                  }
                  console.log("El valor maximo de la fila par " + x + " es: " + ValorMaximo);
            }
            else{
                  let ValorMin=1000;
                  for(let y=0;y<col;y++){
                        if(mat[x][y]< ValorMin){
                              ValorMin=mat[x][y];
                        }
                  }
                  console.log("El valor minimo de la fila impar " + x + " es: " + ValorMin);
            }
      }
}
//Inciso C
getValorPromedioXfila(mat);

function getValorPromedioXfila(){
      let ValoresProm=[fil];
      for(let x=0;x<col;x++){
            let Sum=0;
            for(let y=0;y<fil;y++){
                  Sum+=mat[x][y];
            }
            let promedio= Sum%fil;
            ValoresProm[x]=promedio;
      }
      ValoresProm.forEach(element => console.log("el valor promedio de la fila es: "+ element));
}