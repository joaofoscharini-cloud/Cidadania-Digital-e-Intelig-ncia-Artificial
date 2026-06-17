const dicas = [
    "Verifique fatos: a IA pode 'alucinar' informações incorretas.",
    "Privacidade é fundamental: não compartilhe dados pessoais com IAs.",
    "IA não é autoridade final: questione resultados preconceituosos.",
    "Ética primeiro: não use IA para criar conteúdos que prejudiquem outros."
];

const btn = document.getElementById('btn-dica');
const display = document.getElementById('dica-display');

let ultimaDica = "";

btn.addEventListener('click', () => {
    let novaDica;
    
    // Garante que não repita a mesma dica imediatamente
    do {
        novaDica = dicas[Math.floor(Math.random() * dicas.length)];
    } while (novaDica === ultimaDica);
    
    ultimaDica = novaDica;
    
    // Efeito simples de transição
    display.style.opacity = 0;
    setTimeout(() => {
        display.innerText = novaDica;
        display.style.opacity = 1;
    }, 200);
});
