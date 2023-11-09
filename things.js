var temporizador;
var tempoInicial = 30;
var tempoAtual = tempoInicial;
var emPausa = true; 

//#region Temporizador
function atualizarTemporizador() {
    var minutos = Math.floor(tempoAtual / 60);
    var segundos = tempoAtual % 60;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    document.getElementById('temporizador').innerHTML = minutos + ':' + segundos;
    if (tempoAtual === 0) {
        clearInterval(temporizador);
        alert('Tempo esgotado!');
        emPausa=true;
    } else if (!emPausa) {
        tempoAtual--;
    }
}
//#endregion Temporizador

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



const personagem = document.getElementById('personagem');
const larguraCelula = 130;
const alturaCelula = 130;
const numeroColunas = 3;

//#region Movimentacao
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
const personalizacaoForm = document.getElementById('personalizacaoForm');
const olhoEsquerdo = document.querySelector('.olho.E');
const olhoDireito = document.querySelector('.olho.D');
const nomeJogador = document.getElementById('nome-jogador');

//#region Personalizaçao
personalizacaoForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const corOlhos = document.getElementById('cor').value;
    const nomePersonagem = document.getElementById('nome').value;
    
   
    olhoEsquerdo.style.backgroundColor = corOlhos;
    olhoDireito.style.backgroundColor = corOlhos;
    
    
    nomeJogador.textContent = nomePersonagem;
});
//#endregion

const celulas = document.querySelectorAll('.tabuleiro td');
let quadrados = [];


//#region SpawnAleatório
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

let pontuacao = 0; 

//#region Pontuação
function atualizarPontuacao(pontos) {
    pontuacao += pontos; // Aumenta a pontuação pelos pontos fornecidos
    document.getElementById('pontuacao-jogador').textContent = pontuacao; // Atualiza a exibição da pontuação no HTML
}
//#endregion

//#region Colisões
function verificarColisao() {
    const celulaPersonagem = personagem.parentElement;
    let colidiu = false;

    quadrados.forEach(quadrado => {
        const celulaQuadrado = quadrado.parentElement;
        if (celulaPersonagem === celulaQuadrado) {
            colidiu = true;
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
        // Verifica se a pontuação é maior ou igual a 100
        let novaMoeda = document.createElement("div");
        novaMoeda.className = "moeda";

        if (inventario.includes(null)) {
            let slotVazio = inventario.indexOf(null);
            inventario[slotVazio] = novaMoeda;

            let slotElement = document.getElementById("slot-" + (slotVazio + 1));
            slotElement.appendChild(novaMoeda);
            
            // Reduz a pontuação em 100 ao comprar uma moeda
            pontuacao -= 100;
            document.getElementById('pontuacao-jogador').textContent = pontuacao; // Atualiza a exibição da pontuação no HTML
        }
    } else {
        console.log("Você não tem pontos suficientes para adicionar uma moeda.");
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

  let estado = 'Iniciar';
  document.getElementById('estado').textContent = estado;
  
  //#region Estados
  function AtualizarEstado() {
    
  
    if (emPausa === true) {
      estado = 'Pausa';
    } else if (tempoAtual === 0) {
      estado = 'Fim';
    } else if (emPausa === false && tempoAtual !== 0) {
      estado = 'Joga';
    }
    document.getElementById('estado').textContent = estado;
  }
  
  setInterval(AtualizarEstado, 250);
 //#endregion