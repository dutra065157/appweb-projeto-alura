let dadosCompletos = [];
let emModoBusca = false;

const campoBusca = document.getElementById('campo-busca');
const botaoBusca = document.getElementById('botao-busca');
const containerCards = document.querySelector('.card-container');

/**
 * Carrega os dados do arquivo JSON.
 */
async function carregarDados() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        dadosCompletos = await response.json();
        exibirCards(dadosCompletos);
    } catch (error) {
        console.error('Falha ao carregar dados:', error);
        containerCards.innerHTML = '<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>';
    }
}

/**
 * Exibe os cards na tela.
 * @param {Array} dados - O array de objetos a serem exibidos como cards.
 */
function exibirCards(dados) {
    containerCards.innerHTML = ''; // Limpa os cards existentes
    dados.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';

        // O ano pode ser 'ano' ou 'data_criacao'
        const ano = item.ano || item.data_criacao;

        card.innerHTML = `
            <h2>${item.nome}</h2>
            <p>${ano}</p>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        `;
        containerCards.appendChild(card);
    });
}

/**
 * Filtra os dados com base no termo de busca e atualiza a exibição.
 */
function realizarBusca() {
    const termo = campoBusca.value.toLowerCase();
    if (termo.trim() === '') {
        alert('Por favor, digite algo para buscar.');
        return;
    }

    const resultado = dadosCompletos.filter(item =>
        item.nome.toLowerCase().includes(termo) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(termo)))
    );

    exibirCards(resultado);
    botaoBusca.textContent = 'Limpar Busca';
    emModoBusca = true;
}

/**
 * Limpa a busca, o campo de texto e restaura a lista completa.
 */
function limparBusca() {
    campoBusca.value = '';
    exibirCards(dadosCompletos);
    botaoBusca.textContent = 'Buscar';
    emModoBusca = false;
}

// Adiciona o listener de evento ao botão
botaoBusca.addEventListener('click', () => {
    emModoBusca ? limparBusca() : realizarBusca();
});