var meta =[ ["1","2","3"],
            ["4","5","6"],
            ["7","8","9"] ];											

var estado = copiaEstado(meta);	
var ultimo = copiaEstado(meta);											
														
var movimentos = 0;
var pilha = [];															
var fechados = [];														
var nodos = 0;
var solucao = [];	


// copia elementos do array
function copiaEstado(estado) {											
	var retorno = [];
	for (var i = 0; i < estado.length; i++)								
		retorno[i] = estado[i].slice(0);		

	return retorno;
}

function exibeEstado(estado) {		// exibe estado na tela
     var estadonew = new Array();
	for (var i=0; i<3; i++)
		for (var j=0; j<3; j++) {

			//console.log("p"+i+j);			
			//console.log("c"+estado[i][j]);
			console.log(estado[i][j]);
			estadonew.push([i][j]);
		}
console.log(estadonew);
	
}
console.log(meta);
//exibeEstado()


function buscaSolucao(alg) {											
	var modo = alg;
	if (!modo)
		return;														
	
	ultimo = copiaEstado(estado);				
	
	pilha = [];
	fechados = [];
	solucao = [];
	nodos = 0;
	movimentos = 0;												
  
	if (modo[0] == "A") {	
								
		nodo.valorh = calculaHeuristica(estado,modo);					
		nodo.valorf = nodo.valorh;
		pilha.push(nodo);												
		
		//iteracaoBusca(modo,profundMax);									
	}
}





