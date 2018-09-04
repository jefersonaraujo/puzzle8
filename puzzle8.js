var meta =[ ["1","2","3"],
            ["4","5","6"],
            ["7","8","9"] ];											

var estado = copiaEstado(meta);	
var ultimo = copiaEstado(meta);											// guarda o estado antes da solução
														// movimentos realizados pelo jogador (humano)

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
	for (var i=0; i<3; i++)
		for (var j=0; j<3; j++) {
			console.log("p"+i+j);			
			console.log("c"+estado[i][j]);
			console.log(estado[i][j]);
		}
}
//exibeEstado()
