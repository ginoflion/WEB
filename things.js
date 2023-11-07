var temporizador;
var tempoInicial = 150;
var tempoAtual = tempoInicial;
var emPausa = false;

function atualizarTemporizador() {
    var minutos = Math.floor(tempoAtual / 60);
    var segundos = tempoAtual % 60;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    document.getElementById('temporizador').innerHTML = minutos + ':' + segundos;

    if (tempoAtual === 0) {
        clearInterval(temporizador);
        alert('Tempo esgotado!');
    } else if (!emPausa) {
        tempoAtual--;
    }
}

function iniciarTemporizador() {
    emPausa = false;
    temporizador = setInterval(atualizarTemporizador, 1000);
}

function pausarTemporizador() {
    emPausa = true;
    clearInterval(temporizador);
}

function reiniciarTemporizador() {
    tempoAtual = tempoInicial;
    atualizarTemporizador();
}


const personagem = document.getElementById('personagem');
let posX = 0;
let posY = 0;
const velocidade = 130;

function moverPersonagem(e) {
    switch (e.key) {
        case 'ArrowUp':
            posY -= velocidade;
            break;
        case 'ArrowDown':
            posY += velocidade;
            break;
        case 'ArrowLeft':
            posX -= velocidade;
            break;
        case 'ArrowRight':
            posX += velocidade;
            break;
    }
    personagem.style.top = posY + 'px';
    personagem.style.left = posX + 'px';
}

window.addEventListener('keydown', moverPersonagem);


/*
let pontuacaoJogador1 = 0;

setInterval(function () {
    pontuacaoJogador1++;

    document.getElementById('pontuacao-jogador1').textContent = pontuacaoJogador1;
}, 1000); 
*/