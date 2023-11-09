//#region Temporizador
var temporizador;
var tempoInicial = 30;
var tempoAtual = tempoInicial;
var emPausa = true; 

function atualizarTemporizador() {
    var minutos = Math.floor(tempoAtual / 60);
    var segundos = tempoAtual % 60;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    document.getElementById('temporizador').innerHTML = minutos + ':' + segundos;
    if (tempoAtual === 0) {
        clearInterval(temporizador);
        emPausa=true;
    } else if (!emPausa) {
        tempoAtual--;
    }
}
//#endregion

//#region Botões
function iniciarTemporizador() {
    pausarTemporizador(); 
    emPausa = false;
    temporizador = setInterval(atualizarTemporizador, 1000);
}

function pausarTemporizador() {
    emPausa = true;
    clearInterval(temporizador);
}

function reiniciarTemporizador() {
    pausarTemporizador(); 
    tempoAtual = tempoInicial;
    atualizarTemporizador();
    limparInventario();
    pontuacao = 0; 
    document.getElementById('pontuacao-jogador').textContent = pontuacao; 
}
//#endregion

//#region Movimentacao

const personagem = document.getElementById('personagem');
const larguraCelula = 130;
const alturaCelula = 130;

function moverPersonagem(e) {
    if (!emPausa) { 
        const celulaAtual = document.querySelector('.personagem').parentElement;
        let novaCelula;

        switch (e.key) {
            case 'ArrowUp':
                novaCelula = celulaAtual.parentElement.previousElementSibling
                    ? celulaAtual.parentElement.previousElementSibling.children[celulaAtual.cellIndex]
                    : null;
                break;
            case 'ArrowDown':
                novaCelula = celulaAtual.parentElement.nextElementSibling
                    ? celulaAtual.parentElement.nextElementSibling.children[celulaAtual.cellIndex]
                    : null;
                break;
            case 'ArrowLeft':
                novaCelula = celulaAtual.previousElementSibling;
                break;
            case 'ArrowRight':
                novaCelula = celulaAtual.nextElementSibling;
                break;
        }

        if (novaCelula && novaCelula.tagName === 'TD') {
            novaCelula.appendChild(personagem);
        }
    }
}

window.addEventListener('keydown', moverPersonagem, 300);

//#endregion

//#region Personalizaçao
const personalizacaoForm = document.getElementById('personalizacaoForm');
const olhoEsquerdo = document.querySelector('.olho.E');
const olhoDireito = document.querySelector('.olho.D');
const nomeJogador = document.getElementById('nome-jogador');


personalizacaoForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const corOlhos = document.getElementById('cor').value;
    const nomePersonagem = document.getElementById('nome').value;
    
   
    olhoEsquerdo.style.backgroundColor = corOlhos;
    olhoDireito.style.backgroundColor = corOlhos;
    
    
    nomeJogador.textContent = nomePersonagem;
});
//#endregion

//#region SpawnAleatório

const celulas = document.querySelectorAll('.tabuleiro td');
let quadrados = [];

function spawnQuadrados() {
    quadrados.forEach(quadrado => {
        quadrado.parentNode.removeChild(quadrado);
    });

    quadrados = [];

    const indicesAleatorios = [];
    while (indicesAleatorios.length < 3) {
        const indice = Math.floor(Math.random() * celulas.length);
        if (indicesAleatorios.indexOf(indice) === -1 && celulas[indice] !== personagem.parentElement) {
            indicesAleatorios.push(indice);
        }
    }

    const cores = ['#C01B1B', '#367D17', '#DDBA0E'];

    indicesAleatorios.forEach((indice, i) => {
        const quadrado = document.createElement('div');
        quadrado.className = 'quadrado';
        quadrado.style.backgroundColor = cores[i];
        celulas[indice].appendChild(quadrado);
        quadrados.push(quadrado);
    });
}
//#endregion

//#region Pontuação
let pontuacao = 0; 

function atualizarPontuacao(pontos) {
    pontuacao += pontos; 
    document.getElementById('pontuacao-jogador').textContent = pontuacao; 
}
//#endregion

//#region Colisões
function verificarColisao() {
    const celulaPersonagem = personagem.parentElement;
    

    quadrados.forEach(quadrado => {
        const celulaQuadrado = quadrado.parentElement;
        if (celulaPersonagem === celulaQuadrado) {
            let pontosGanhos = 10; 
            atualizarPontuacao(pontosGanhos); 
            spawnQuadrados();
        }
    });

   
}
spawnQuadrados();
setInterval(verificarColisao, 250);
//#endregion

 //#region inventário  
 let inventario = [null, null];

 function adicionarMoedaAoInventario() {
    if (pontuacao >= 100) {

        let novaMoeda = document.createElement("div");
        novaMoeda.className = "moeda";

        if (inventario.includes(null)) {
            let slotVazio = inventario.indexOf(null);
            inventario[slotVazio] = novaMoeda;

            let slotElement = document.getElementById("slot-" + (slotVazio + 1));
            slotElement.appendChild(novaMoeda);
            
            pontuacao -= 100;
            document.getElementById('pontuacao-jogador').textContent = pontuacao; 
        }
    } else {

    }
}

  function limparInventario() {
    inventario = [null, null];
    for (let i = 1; i <= inventario.length; i++) {
        let slotElement = document.getElementById("slot-" + i);
        slotElement.innerHTML = ""; 
    }
}

  //#endregion

   //#region Estados
  let estado = 'Iniciarmeep';
  document.getElementById('estado').textContent = estado;
 
  function AtualizarEstado() {

    if (tempoAtual === 0 && emPausa ===true) {
        estado = 'Fim';
    }  else if (emPausa === true) {
      estado = 'Pausa';
    }  else if (emPausa === false && tempoAtual !== 0) {
      estado = 'Joga';
    }
    document.getElementById('estado').textContent = estado;
  }
  
  setInterval(AtualizarEstado, 250);
 //#endregion