document.addEventListener("DOMContentLoaded", () => {
    const optionButtons = document.querySelectorAll(".option-btn");
    const feedbackDiv = document.getElementById("quiz-feedback");

    optionButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Desabilita todos os botões após a resposta para evitar múltiplos cliques
            optionButtons.forEach(btn => btn.disabled = true);

            // Verifica se o atributo 'data-correct' é verdadeiro
            const isCorrect = button.getAttribute("data-correct") === "true";

            if (isCorrect) {
                button.classList.add("correct");
                feedbackDiv.textContent = "🎉 Parabéns! Você agiu como um verdadeiro cidadão digital. O pensamento crítico e a transparência são fundamentais ao usar IA.";
                feedbackDiv.className = "feedback success";
            } else {
                button.classList.add("wrong");
                feedbackDiv.textContent = "❌ Não foi dessa vez. Lembre-se: plágio e exposição de dados pessoais violam as boas práticas da Cidadania Digital.";
                feedbackDiv.className = "feedback error";
                
                // Destaca a alternativa correta para aprendizado
                optionButtons.forEach(btn => {
                    if (btn.getAttribute("data-correct") === "true") {
                        btn.classList.add("correct");
                    }
                });
            }
        });
    });
});
