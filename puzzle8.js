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


function iteracaoBusca(modo,pmax) {
	var nodo = {};
	var profundidade, i;
  
	while (pilha.length) {
		 console.log(pilha.length);	// exibe tamanho da pilha/fila
		if (modo[0] == "A") 											
		nodos++;
		if (modo[0] == "A")												
		fechados.push(nodo);										

		estado = nodo.estado;
		profundidade = nodo.profundidade;

		if (comparaEstados(estado,meta)) {
			
			
			solucao.push(nodo.estado);									
			while (nodo.pai) {
				nodo = nodo.pai;
				solucao.push(nodo.estado);
			}
			estado = solucao.pop();										
			exibeEstado(estado);							
			
			return;
		}
		else {															
			if (profundidade < pmax)									
				geraFilhos(nodo,profundidade,modo);
		}
	}
	
}


// gera os filhos de um nodo
function geraFilhos(nodo,profundidade,modo) {
	profundidade++;
	
	for (var i=0; i<3; i++)
		for (var j=0; j<3; j++) 
			if (nodo.estado[i][j] == "9") {								// localiza o espaço em branco
// gera os filhos possíveis e coloca na pilha
				if (i > 0)
					empilhaFilho(nodo,profundidade,modo,i,j,i-1,j);		// move o branco para cima
				if (i < 2)
					empilhaFilho(nodo,profundidade,modo,i,j,i+1,j);		// move o branco para baixo
				if (j > 0)
					empilhaFilho(nodo,profundidade,modo,i,j,i,j-1);		// move o branco para a esquerda
				if (j < 2)
					empilhaFilho(nodo,profundidade,modo,i,j,i,j+1);		// move o branco para a direita

				return; // encerra, nao precisa terminar os loops
			}
}


// cria nodo e adiciona-o à fila/pilha
function empilhaFilho(pai,profundidade,modo,io,jo,id,jd) {
	var filho, estado, valorg, valorf, valorh, i;

	estado = copiaEstado(pai.estado);
	trocaPeca(estado,io,jo,id,jd);

	if (modo[0] == "A") {												
		if (procuraLista(fechados,estado))
			return;														
		valorg = pai.valorg + 1;
		valorh = calculaHeuristica(estado,modo);						
		valorf = valorg + valorh;
		filho = {estado: estado, profundidade: profundidade, pai: pai, valorf: valorf, valorg: valorg, valorh: valorh};
		i = procuraLista(pilha,estado);									
		if (i != null) {
			if (pilha[i].valorg <= valorg)								
				return;													
			else
				pilha.splice(i,1);										
		}
		insereFilaPrioridade(filho);									
	}
}



