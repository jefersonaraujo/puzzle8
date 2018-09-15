var pilhaAbertos = [] 
var pilhaFechados = [] 
var arraySolucao = [] 
var p_FilhosDeX = [] 
var celulas = document.querySelectorAll('.celula') 


// Matriz Objetivo
var ob = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", ""]
];


// Matriz Inicial
var inicial = [
    ["1", "2", "3"],
    ["", "4", "5"],
    ["6", "7", "8"]
];


configInicial()


function Busca() {

    var noinicial = { estado: copiaEstado(inicial), pai: null }

    pilhaAbertos.push(noinicial)

    
    while (pilhaAbertos.length > 0) {
        var x

            x = pilhaAbertos.pop()
		

        let objetivo = comparaEstados(x.estado, ob)

        if (objetivo) {
            console.log("Achei o objetivo")
            console.log(arraySolucao)
            arraySolucao.push(x.estado)

            // Reconstroi o caminho ate o estado inicial
            while (x.pai) {// Enquanto pai nao for o nodo Raiz 
                x = x.pai;
				// Empilha o estado no Arraysolução
                arraySolucao.push(x.estado);
            }
			
			// Remove o último estado empilhado.
            x = arraySolucao.pop()

            mostrarNaTela(x)


            document.getElementById("solucaoBotao").style.display = 'block'

            return;
        }
        else {

            // Função para gerar filhos de X.
            geraFilhos(x)

            // Coloca o X na pilha em pilhaFechados.
            pilhaFechados.push(x)
			
			// Descarta os filhos de X caso estejam pilhaAbertos ou pilhaFechados.
            let filhosValidosDeX = []
            p_FilhosDeX.forEach(function (xp) {
                if (!verificaFilhoEmAbertosFechados(xp)) { filhosValidosDeX.push(xp) }
            })
			
                pilhaAbertos = filhosValidosDeX.concat(pilhaAbertos)
				
			// Limpa a pilha de filhos de X.
            p_FilhosDeX = []

        }
    }
    return "OPERAÇÃO FALHOU"
};




// Gerando os filhos de um Nó.
	function geraFilhos(no) {

		for (var i = 0; i < 3; i++) {

			for (var j = 0; j < 3; j++) {

				if (no.estado[i][j] == "") {

                // Gera filhos possiveis e coloca na pilha.
					if (i > 0)
						empilharFilho(no, i, j, i - 1, j);//Espaço para cima.
					if (i < 2)
						empilharFilho(no, i, j, i + 1, j);// Espaço para baixo.
					if (j > 0)
						empilharFilho(no, i, j, i, j - 1);// Espaço para esquerda.
					if (j < 2)
                    empilharFilho(no, i, j, i, j + 1);// Espaço para direita.

                return; 
				} 
			}
		}
	}

// Faz o empilhamento do filho de X.
function empilharFilho(pai, k, l, m, n) {
    var estado = copiaEstado(pai.estado);

    trocaPedras(estado, k, l, m, n);

    p_FilhosDeX.push({ estado: estado, pai: pai }); 
}

  


function trocaPedras(estado, a, b, c, d) {
    var t = estado[c][d];
    estado[c][d] = estado[a][b];
    estado[a][b] = t;
}


function copiaEstado(estado) {	// Retorna copia do estado.
    var retorno = [];
    for (var i = 0; i < estado.length; i++) {	
        retorno[i] = estado[i].slice(0);		
    }
	console.log(retorno);
    return retorno;
}

// Compara duas matrizes de estados e ver se são iguais.
function comparaEstados(estado1, estado2) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (estado1[i][j] != estado2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Verificação se o Nó está na pilhaAbertos ou pilhaFechados.
function verificaFilhoEmAbertosFechados(no) {
    let existEmAberto = false;
    let existEmFechado = false;

    if (pilhaAbertos.length) {
        let h = []

        // Ver se na pilhaAbertos os Nó iguais ao Nó atual.
        h = pilhaAbertos.filter(function (xp) { return comparaEstados(no.estado, xp.estado) })

        // Se na filtragem existir algum Nó entao o Nó atual existe em pilhaAbertos.
        if (h.length) { existEmAberto = true }
    }

    if (pilhaFechados.length) {
        let s = []
        // Ver na pilhaFechados os Nó iguais ao Nó atual.
        s = pilhaFechados.filter(function (xp) { return comparaEstados(no.estado, xp.estado) })

        // Se na filtragem existir algum Nó entao o Nó atual existe em pilhaFechados.
        if (s.length) { existEmFechado = true }
    }

    // Retorna verdadeiro se o Nó está em pilhaAbertos ou pilhaFechados.
    return existEmAberto || existEmFechado
};



function mostraSolucao() {
    if (arraySolucao.length) {
        estado = arraySolucao.pop();
        mostrarNaTela(estado)
    }

    if (arraySolucao.length < 1) {
        document.getElementById("reiniciar").style.display = 'block'
        document.getElementById("resolver").disabled = true
        document.getElementById("solucaoBotao").disabled = true
    }
}


function mostrarNaTela(estado) {
    var estadoFinal = estado;
    estadoFinal = estadoFinal.concat(estadoFinal[0], estadoFinal[1], estadoFinal[2]);
    for (let i = 2; i >= 0; i--) {
        estadoFinal.splice(i, 1);
    }
    for (let index = 0; index < estadoFinal.length; index++) {
        celulas[index].innerText = estadoFinal[index];
        celulas[index].style.color = 'white';
        celulas[index].style.backgroundColor = '';
    }
}



function configInicial() {
    var estadoLivroTransformed = inicial.concat(inicial[0], inicial[1], inicial[2]);
		for (let i = 2; i >= 0; i--) {
			var removed = estadoLivroTransformed.splice(i, 1);
		}
		for (let index = 0; index < estadoLivroTransformed.length; index++) {
			celulas[index].innerText = estadoLivroTransformed[index];
		}
}
