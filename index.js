// Seleciona o botão e a div que contém as redes sociais
const socialMediaButton = document.getElementById('socialMediaButton');
const socialMediaDiv = document.getElementById('socialMedia');

// Adiciona um evento de clique ao botão
socialMediaButton.addEventListener('click', function () {
    // Alterna a visibilidade da div com redes sociais
    socialMediaDiv.classList.toggle('visible');
    
    // Atualiza o texto do botão de acordo com a visibilidade da div
    if (socialMediaDiv.classList.contains('visible')) {
        socialMediaButton.textContent = 'Esconder Redes Sociais';
    } else {
        socialMediaButton.textContent = 'Mostrar Redes Sociais';
    }
});
