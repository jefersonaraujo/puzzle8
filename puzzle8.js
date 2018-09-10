var fs = require('fs');
var Puzzle = {
    processados: [],
    ini: function (oTabIni, oTabFim) {
        var oResultado   = this.encontraFim(oTabIni, oTabFim);
        this.processados = [];
        return oResultado;
    },

    encontraFim: function (oTabIni, oTabFim) {
        var oFim  = null;
        var aTabs = this.geraNovosTabuleiros(oTabIni);
        while (oFim === null) {
            if (!this.isProcessado(aTabs[0])) {
                this.ordena(aTabs, oTabFim);
            } else {
                aTabs = aTabs.slice(1);
                continue;
            }
            this.processados.push(aTabs[0]);
            if (aTabs[0].equals(oTabFim)) {
                oFim = aTabs[0];
            } else {
                aTabs = aTabs.concat(this.geraNovosTabuleiros(aTabs[0]));
            }
        }
        return oFim;
    },
    geraNovosTabuleiros: function (oTab) {
        var aNewTabuleiro = [], aNewPos = [];
        var aPosZero = oTab.achaZero();
        var x = aPosZero[0], y = aPosZero[1];
        if (x == 0 && y == 0) {
            aNewPos = [[1, 0], [0, 1]];
        }
        else if (x == 1 && y == 0) {
            aNewPos = [[0, 0], [2, 0], [1, 1]];
        }
        else if (x == 2 && y == 0) {
            aNewPos = [[1, 0], [2, 1]];
        }
        else if (x == 0 && y == 1) {
            aNewPos = [[0, 0], [1, 1], [0, 2]];
        }
        else if (x == 1 && y == 1) {
            aNewPos = [[0, 1], [1, 0], [2, 1], [1, 2]];
        }
        else if (x == 2 && y == 1) {
            aNewPos = [[1, 1], [2, 0], [2, 2]];
        }
        else if (x == 0 && y == 2) {
            aNewPos = [[0, 1], [1, 2]];
        }
        else if (x == 1 && y == 2) {
            aNewPos = [[0, 2], [1, 1], [2, 2]];
        }
        else if (x == 2 && y == 2) {
            aNewPos = [[1, 2], [2, 1]];
        }
        for (var i in aNewPos) {
            var oNovo = oTab.clone();
            oNovo.pai = oTab;
            oNovo.troca(aPosZero, aNewPos[i]);
            if (!this.isProcessado(oNovo)) {
                aNewTabuleiro.push(oNovo);
            }
        }
        return aNewTabuleiro;
    },
    isProcessado: function (oTab) {
        for (var i in this.processados) {
            if (this.processados[i].equals(oTab))
                return true;
        }
        return false;
    },
    ordena: function (aTabs, oTabFim) {
        for (var i = 0; i < aTabs.length; i++) {
            for (var j = 0; j < (aTabs.length - (i + 1)); j++) {
                if (aTabs[j].heuristica(oTabFim) > aTabs[j + 1].heuristica(oTabFim)) {
                    var oTabTemp = aTabs[j];
                    aTabs[j] = aTabs[j + 1];
                    aTabs[j + 1] = oTabTemp;
                    oTabTemp = null;
                }
            }
        }
    }

};
var Tabuleiro = function (inicial) {
    this.pai = null;
    this.posicoes = inicial;
    this.print(); //printa estado

};
Tabuleiro.prototype.equals = function (oCompar) {
    for (var y in this.posicoes) {
        for (var x in this.posicoes[y]) {
            if (this.posicoes[y][x] != oCompar.posicoes[y][x])
                return false;
        }
    }
    return true;
};
Tabuleiro.prototype.achaNum = function (num) {
    for (var y in this.posicoes) {
        for (var x in this.posicoes[y]) {
            if (this.posicoes[y][x] == num)
                return [y, x];
        }
    }
};
Tabuleiro.prototype.achaZero = function () {
    return this.achaNum(0);
};
Tabuleiro.prototype.troca = function (aOri, aDes) {
    var sValorOri = this.posicoes[aOri[0]][aOri[1]];
    var sValorDes = this.posicoes[aDes[0]][aDes[1]];
    this.posicoes[aOri[0]][aOri[1]] = sValorDes;
    this.posicoes[aDes[0]][aDes[1]] = sValorOri;

};
Tabuleiro.prototype.print = function (bFormTab) {
    bFormTab = bFormTab ? bFormTab : true;
    var sInfo = '';
    for (var y in this.posicoes) {
        for (var x in this.posicoes[y]) {
            sInfo += this.posicoes[y][x] + (bFormTab ? ' ' : '');
        }
        sInfo += (bFormTab ? '\n' : '');
    }
    fs.appendFileSync('movimentos.txt', sInfo + '\n');
};
Tabuleiro.prototype.printSteps = function () {

    var aPais = [], oPai = this.pai;
    while(oPai !== null){
        aPais.push(oPai);
        oPai = oPai.pai;
    }
    aPais = aPais.reverse();
    for(var i in aPais){
        aPais[i].print();
    }
    this.print();
    // console.log("Log aqui");
    // console.log(aPais[i]);
};
Tabuleiro.prototype.h1 = function (oTabFim) {
    var iPosErradas = 0;
    for (var y in this.posicoes) {
        for (var x in this.posicoes[y]) {
            if (this.posicoes[y][x] != 0 && this.posicoes[y][x] != oTabFim.posicoes[y][x]) {
                iPosErradas++;
            }
        }
    }
    return iPosErradas;

};
Tabuleiro.prototype.h2 = function (oTabFim) {
    var iSomaMovimentos = 0;
    for (var y in this.posicoes) {
        for (var x in this.posicoes[y]) {
            if (this.posicoes[y][x] != 0) {
                var aPosNum = oTabFim.achaNum(this.posicoes[y][x]);
                var iDifX = Math.abs(aPosNum[0] - y);
                var iDifZ = Math.abs(aPosNum[1] - x);
                iSomaMovimentos += iDifX + iDifZ;
            }
        }
    }
    return iSomaMovimentos;
};
Tabuleiro.prototype.heuristica = function (oTabFim) {
    return this.h1(oTabFim) + this.h2(oTabFim);
};
Tabuleiro.prototype.clone = function () {
    var oClone = new Tabuleiro(cloneArrayMultidimensional(this.posicoes));
    oClone.pai = this.pai;
    return oClone;
};
function cloneArrayMultidimensional(aArray) {
    var aClone = [];
    for (var i in aArray) {
        aClone.push(aArray[i].slice(0));
    }
    return aClone;
}
function now() {
    var oData = new Date();
    console.log(oData.getHours() + ":" + oData.getMinutes() + ":" + oData.getSeconds() + "." + oData.getMilliseconds());
}
var oTabIni = new Tabuleiro([
    [1,2,3],
    [4,5,0],
    [7,8,6]
]);
var oTabFim = new Tabuleiro([
    [1,2,3],
    [4,5,6],
    [0,7,8]
]);
now();
var oRes = Puzzle.ini(oTabIni, oTabFim);
oRes.printSteps();
now();
