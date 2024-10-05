document.addEventListener('DOMContentLoaded', function () {
    const dataInput = document.getElementById('data');

    // Define a data atual no campo de data ao carregar a página
    const today = new Date();
    dataInput.value = formatDateForInput(today); // Define o valor do input no formato 'YYYY-MM-DD'

    // Busca automaticamente as informações do santo do dia correspondente à data atual
    fetchSantoDoDia(formatDate(today));

    // Adiciona um ouvinte de evento para mudanças no campo de data
    dataInput.addEventListener('change', function () {
        const selectedDate = new Date(dataInput.value);
        const formattedDate = formatDate(selectedDate); // Formato 'MM-DD'
        console.log('Data selecionada:', formattedDate);

        // Busca informações do santo do dia com base na data selecionada
        fetchSantoDoDia(formattedDate);
    });

    // Função para formatar a data no formato 'MM-DD' para buscar no JSON
    function formatDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    }

    // Função para formatar a data no formato 'YYYY-MM-DD' para o valor do input
    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Função para buscar informações do santo do dia
    function fetchSantoDoDia(dateString) {
        // Requisição assíncrona para buscar os dados do santo do dia no arquivo JSON
        fetch('santododia.json')
            .then(response => response.json())
            .then(data => {
                const santoInfo = data[dateString];
    
                if (santoInfo) {
                    // Atualiza elementos HTML com as informações do santo
                    const nomeElemento = document.getElementById('santo-nome');
                    const historiaElemento = document.getElementById('santo-historia');
                    const imagemElemento = document.getElementById('santo-imagem');
    
                    nomeElemento.textContent = santoInfo.nome;
                    historiaElemento.textContent = santoInfo.historia;
                    imagemElemento.src = santoInfo.imagem;
                    imagemElemento.alt = `Imagem de ${santoInfo.nome}`;
                } else {
                    // Caso não haja informações para o dia e mês selecionados
                    mostrarMensagemSemInformacoes();
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados do santo:', error);
            });
    }
    
    // Função para exibir uma mensagem quando não há informações disponíveis
    function mostrarMensagemSemInformacoes() {
        const nomeElemento = document.getElementById('santo-nome');
        const historiaElemento = document.getElementById('santo-historia');

        nomeElemento.textContent = 'Não há informações para esta data.';
        historiaElemento.textContent = '';
    }
});
