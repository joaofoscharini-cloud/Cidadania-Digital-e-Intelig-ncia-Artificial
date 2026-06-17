const dicas = [
    "Verifique sempre as informações geradas por IA.",
    "Respeite a privacidade ao usar ferramentas de IA.",
    "Não utilize a IA para espalhar desinformação ou deepfakes.",
    "Lembre-se: a IA possui vieses, sempre questione os resultados."
];

document.getElementById('btn-dica').addEventListener('click', function() {
    const display = document.getElementById('dica-display');
    const indice = Math.floor(Math.random() * dicas.length);
    display.innerText = dicas[indice];
});
