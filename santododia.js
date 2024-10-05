document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('data');

    // Define a data atual no campo de data ao carregar a página
    const today = new Date();
    const todayFormatted = formatDate(today); // Formato 'MM-DD'
    dataInput.value = todayFormatted;

    // Marca o dia atual no calendário
    marcarDiaAtual(today.getDate());

    // Busca automaticamente as informações do santo do dia correspondente à data atual
    fetchSantoDoDia(todayFormatted);

    // Adiciona um ouvinte de evento para mudanças no campo de data
    dataInput.addEventListener('change', function() {
        const selectedDate = dataInput.value;
        console.log('Data selecionada:', selectedDate);

        // Busca informações do santo do dia com base na data selecionada
        fetchSantoDoDia(selectedDate);
    });

    // Função para formatar a data no formato 'MM-DD'
    function formatDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    }

    // Função para marcar o dia atual no calendário
    function marcarDiaAtual(dia) {
        const calendario = document.getElementById('calendario');
        const dias = calendario.querySelectorAll('td');

        dias.forEach(diaElemento => {
            if (parseInt(diaElemento.textContent) === dia) {
                diaElemento.classList.add('today');
            }
        });
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

                    nomeElemento.textContent = santoInfo.nome;
                    historiaElemento.textContent = santoInfo.historia;
                } else {
                    // Caso não haja informações para o dia e mês selecionados
                    const nomeElemento = document.getElementById('santo-nome');
                    const historiaElemento = document.getElementById('santo-historia');

                    nomeElemento.textContent = 'Não há informações para esta data.';
                    historiaElemento.textContent = '';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados do santo:', error);
            });
    }
});
