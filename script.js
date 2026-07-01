// Boa prática: Esperar o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    const dicas = [
        "Verifique fatos: a IA pode 'alucinar' informações incorretas.",
        "Privacidade é fundamental: não compartilhe dados pessoais com IAs.",
        "IA não é autoridade final: questione resultados preconceituosos.",
        "Ética primeiro: não use IA para criar conteúdos que prejudiquem outros."
    ];

    // Selecionando os elementos
    const btnDica = document.getElementById('btn-dica');
    const display = document.getElementById('dica-display');
    const btnCopiar = document.getElementById('btn-copiar');

    // Segurança: Verifica se os elementos realmente existem na página para evitar erros
    if (!btnDica || !display || !btnCopiar) return;

    let ultimaDica = "";

    // Lógica de gerar nova dica
    btnDica.addEventListener('click', () => {
        let novaDica;
        
        // Garante que não repita a mesma dica e previne loop infinito se a lista tiver só 1 item
        do {
            novaDica = dicas[Math.floor(Math.random() * dicas.length)];
        } while (novaDica === ultimaDica && dicas.length > 1);
        
        ultimaDica = novaDica;
        
        // Efeito de transição
        display.style.opacity = 0;
        
        setTimeout(() => {
            display.textContent = novaDica;
            display.style.opacity = 1;
            
            // Mostra o botão de copiar assim que a primeira dica é gerada
            btnCopiar.style.display = 'inline-block';
        }, 200);
    });

    // Lógica para copiar o texto para a área de transferência
    btnCopiar.addEventListener('click', () => {
        const textoParaCopiar = display.textContent;
        
        // API moderna para copiar texto
        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            // Feedback visual de sucesso
            const textoOriginal = btnCopiar.textContent;
            btnCopiar.textContent = "✅ Copiado!";
            btnCopiar.style.backgroundColor = "#27ae60"; // Fica verde
            btnCopiar.style.color = "white";
            
            // Volta ao normal após 2 segundos
            setTimeout(() => {
                btnCopiar.textContent = textoOriginal;
                btnCopiar.style.backgroundColor = ""; // Remove o estilo inline
                btnCopiar.style.color = "";
            }, 2000);
        }).catch(err => {
            console.error('Falha ao copiar texto: ', err);
        });
    });
});
