// Seleciona todos os itens e lixeiras
const items = document.querySelectorAll('.item');
const bins = document.querySelectorAll('.bin');
const scoreValue = document.getElementById('score-value');

let score = 0; // Inicializa a pontuação

// Adiciona eventos de arrastar para os itens
items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// Adiciona eventos de soltar para as lixeiras
bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('dragenter', dragEnter);
    bin.addEventListener('dragleave', dragLeave);
    bin.addEventListener('drop', drop);
});

// Função chamada quando o arrastar de um item começa
function dragStart() {
    this.classList.add('dragging'); // Adiciona classe para indicar que o item está sendo arrastado
}

// Função chamada quando o arrastar de um item termina
function dragEnd() {
    this.classList.remove('dragging'); // Remove classe de arrastar ao terminar
}

// Função chamada quando um item está sendo arrastado sobre uma lixeira
function dragOver(e) {
    e.preventDefault(); // Previne o comportamento padrão
}

// Função chamada quando um item entra na área de uma lixeira
function dragEnter(e) {
    e.preventDefault(); // Previne o comportamento padrão
    this.classList.add('hovered'); // Adiciona classe para indicar que o item está sobre a lixeira
}

// Função chamada quando um item sai da área de uma lixeira
function dragLeave() {
    this.classList.remove('hovered'); // Remove classe de hover ao sair da lixeira
}

// Função chamada quando um item é solto em uma lixeira
function drop() {
    const item = document.querySelector('.dragging'); // Seleciona o item arrastado
    const itemType = item.getAttribute('data-type'); // Obtém o tipo de lixo do item
    const binType = this.getAttribute('data-accepted'); // Obtém o tipo de lixeira

    if (itemType === binType) { // Verifica se o item pode ser descartado na lixeira correta
        score++; // Incrementa a pontuação
        updateScore(); // Atualiza a exibição da pontuação
        this.appendChild(item); // Move o item para dentro da lixeira correta
        item.style.opacity = '0.5'; // Define a opacidade do item para indicar que foi descartado
        setTimeout(() => {
            item.style.display = 'none'; // Remove o item do jogo após alguns segundos
        }, 500);
    } else {
        item.style.transform = 'translate(0)'; // Retorna o item à posição original se descartado na lixeira errada
    }

    this.classList.remove('hovered'); // Remove classe de hover ao soltar o item na lixeira
}

// Função para atualizar a exibição da pontuação
function updateScore() {
    scoreValue.textContent = score; // Atualiza o texto da pontuação
}
