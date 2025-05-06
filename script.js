// Arrays que armazenam as cartas do jogador e do PC
const playerCards = [];
const pcCards = [];

// Função que sorteia uma carta com valor de 1 a 11
function sortearCarta() {
    return Math.floor(Math.random() * 11) + 1;
}

// Função que atualiza a tela com as cartas visuais e o total de pontos
function atualizarTela() {
    const playerContainer = document.getElementById("player-cards"); // Div onde as cartas do jogador são exibidas
    const pcContainer = document.getElementById("pc-cards");         // Div onde as cartas do PC são exibidas

    // Limpa as cartas atuais (caso já existam)
    playerContainer.innerHTML = "";
    pcContainer.innerHTML = "";

    // Para cada carta do jogador, cria uma imagem correspondente
    playerCards.forEach(card => {
        const img = document.createElement("img");
        img.src = `img/${card}.jpg`;  // Caminho da imagem da carta (de 1.jpg até 13.jpg)
        img.alt = `Carta ${card}`;    // Texto alternativo para acessibilidade
        playerContainer.appendChild(img); // Adiciona a imagem na div
    });

    // Faz o mesmo para o PC
    pcCards.forEach(card => {
        const img = document.createElement("img");
        img.src = `img/${card}.jpg`;
        img.alt = `Carta ${card}`;
        pcContainer.appendChild(img);
    });

    // Atualiza os totais de pontos do jogador e do PC
    document.getElementById("player-total").textContent = somar(playerCards);
    document.getElementById("pc-total").textContent = somar(pcCards);
}

// Função que soma os valores de um array (utilizada para calcular os totais)
function somar(array) {
    return array.reduce((a, b) => a + b, 0);
}

// Função chamada quando o jogador clica em "Pedir Carta"
function pedirCarta() {
    playerCards.push(sortearCarta()); // Adiciona uma nova carta ao jogador
    atualizarTela();                  // Atualiza a interface

    const total = somar(playerCards); // Calcula o total do jogador

    // Se o total ultrapassar 21, o jogador perde
    if (total > 21) {
        document.getElementById("resultado").textContent = "Você estourou! Perdeu!";
        desativarBotoes(); // Desativa os botões e mostra o de reiniciar
    }
}

// Função chamada quando o jogador clica em "Parar"
function parar() {
    // Enquanto o PC tiver menos que 17, ele continua puxando cartas
    while (somar(pcCards) < 17) {
        pcCards.push(sortearCarta());
    }

    atualizarTela();       // Atualiza a interface com as cartas do PC
    verificarResultado();  // Verifica quem venceu
    desativarBotoes();     // Desativa os botões e mostra o de reiniciar
}

// Função que determina o vencedor com base nas pontuações finais
function verificarResultado() {
    const totalJogador = somar(playerCards);
    const totalPC = somar(pcCards);

    // Várias possibilidades de resultado
    if (totalPC > 21 || totalJogador > totalPC) {
        document.getElementById("resultado").textContent = "Você venceu!";
    } else if (totalJogador === totalPC) {
        document.getElementById("resultado").textContent = "Empate!";
    } else {
        document.getElementById("resultado").textContent = "PC venceu!";
    }
}

// Função que desativa os botões principais e mostra o botão de reiniciar
function desativarBotoes() {
    document.querySelectorAll("button").forEach(btn => {
        if (btn.id !== "reiniciar") btn.disabled = true; // Desativa todos exceto o botão "reiniciar"
    });
    document.getElementById("reiniciar").style.display = "inline-block"; // Mostra o botão "Reiniciar"
}

// Função que reinicia o jogo do zero
function reiniciarJogo() {
    // Limpa as cartas dos dois jogadores
    playerCards.length = 0;
    pcCards.length = 0;

    // Limpa o resultado anterior
    document.getElementById("resultado").textContent = "";

    // Esconde o botão de reiniciar novamente
    document.getElementById("reiniciar").style.display = "none";

    // Reativa os botões "Pedir Carta" e "Parar"
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
    });

    // Dá as cartas iniciais: duas para o jogador, uma para o PC
    playerCards.push(sortearCarta(), sortearCarta());
    pcCards.push(sortearCarta());

    // Atualiza a interface com os novos dados
    atualizarTela();
}
