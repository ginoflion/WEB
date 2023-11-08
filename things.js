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
    pontuacao = 0; 
    document.getElementById('pontuacao-jogador').textContent = pontuacao; 
}
//#endregion



const personagem = document.getElementById('personagem');
const larguraCelula = 130;
const alturaCelula = 130;
const numeroColunas = 3;


function moverPersonagem(e) {
    if (!emPausa) { // Verifica se o jogo não está em estado de pausa
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

let pontuacao = 0; // Inicializa a pontuação

function atualizarPontuacao(pontos) {
    pontuacao += pontos; // Aumenta a pontuação pelos pontos fornecidos
    document.getElementById('pontuacao-jogador').textContent = pontuacao; // Atualiza a exibição da pontuação no HTML
}

function verificarColisao() {
    const celulaPersonagem = personagem.parentElement;
    let colidiu = false;

    quadrados.forEach(quadrado => {
        const celulaQuadrado = quadrado.parentElement;
        if (celulaPersonagem === celulaQuadrado) {
            colidiu = true;
            let pontosGanhos = 10; // Quantidade de pontos ganhos ao colidir com qualquer quadrado
            atualizarPontuacao(pontosGanhos); // Chama a função para atualizar a pontuação
            spawnQuadrados(); // Respawn dos quadrados
        }
    });

    if (!colidiu) {
        // Lógica para quando não há colisão
    }
}
spawnQuadrados();
setInterval(verificarColisao, 250);

function verificarEspacoNoInventario() {
    var inventarioDestino = document.getElementById('inventarioDestino');

    // Verifica se há menos de 3 itens no inventário inicial
    if (inventarioDestino.children.length < 3) {
        adicionarCirculoDourado(inventarioDestino);
    }
}

function adicionarCirculoDourado(inventarioDestino) {
    var novoItem = document.createElement('div');
    novoItem.className = 'circulo-dourado';
    inventarioDestino.appendChild(novoItem);
}


function verificarPontos() {
    // Verifica se o jogador tem pelo menos 400 pontos
    if (pontos >= 400) {
        adicionarCirculoDourado();
    }
}

