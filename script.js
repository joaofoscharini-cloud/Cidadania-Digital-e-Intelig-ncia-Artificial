/**
 * SIMULAÇÃO DE SERVICES/API
 * Abstração de banco de dados assíncrono para simular latência de rede real.
 */
const mockTipsAPI = {
    _data: [
        "Verifique fatos: os Modelos de Linguagem (LLMs) podem gerar alucinações factuais convincentes.",
        "Privacidade de Dados: Informações corporativas ou dados sensíveis jamais devem ser inputados em prompts públicos.",
        "Vieses Algorítmicos: Sistemas inteligentes reproduzem vieses humanos presentes em seus datasets históricos.",
        "Propriedade Intelectual: Certifique-se de validar os direitos autorais e licenças dos outputs sintéticos gerados por IA.",
        "Engenharia reversa social: Arquiteturas generativas podem ser exploradas para campanhas automatizadas de desinformação em massa."
    ],
    
    fetchRandomTip() {
        return new Promise((resolve) => {
            // Simula latência de rede estável de 600ms
            setTimeout(() => {
                const index = Math.floor(Math.random() * this._data.length);
                resolve(this._data[index]);
            }, 600);
        });
    }
};

/**
 * CLASSE CONTROLA O ESTADO DA APLICAÇÃO (State Manager)
 */
class AppState {
    constructor() {
        this.currentTip = "";
        this.previousTip = "";
        this.theme = localStorage.getItem('theme') || 'light';
        this.isLoading = false;
    }

    setTheme(newTheme) {
        this.theme = newTheme;
        localStorage.setItem('theme', newTheme);
    }

    setTip(newTip) {
        this.previousTip = this.currentTip;
        this.currentTip = newTip;
    }
}

/**
 * CLASSE CONTROLADORA DA INTERFACE DE USUÁRIO (UI Controller)
 */
class AppController {
    constructor(state, api) {
        this.state = state;
        this.api = api;

        // Mapeamento dos elementos do DOM
        this.dom = {
            html: document.documentElement,
            btnNext: document.getElementById('btn-next-tip'),
            btnCopy: document.getElementById('btn-copy-tip'),
            btnTheme: document.getElementById('theme-toggle'),
            tipText: document.getElementById('tip-text'),
            skeleton: document.getElementById('tip-skeleton')
        };
    }

    init() {
        this._applyInitialTheme();
        this._registerEvents();
    }

    _applyInitialTheme() {
        this.dom.html.setAttribute('data-theme', this.state.theme);
        this.dom.btnTheme.querySelector('.theme-toggle__icon').textContent = 
            this.state.theme === 'dark' ? '☀️' : '🌙';
    }

    _registerEvents() {
        this.dom.btnNext.addEventListener('click', () => this.handleNextTip());
        this.dom.btnCopy.addEventListener('click', () => this.handleCopyClipboard());
        this.dom.btnTheme.addEventListener('click', () => this.handleThemeToggle());
    }

    /**
     * FLUXO ASSÍNCRONO COM GERENCIAMENTO DE ESTADO VISUAL
     */
    async handleNextTip() {
        if (this.state.isLoading) return;

        this._toggleLoadingState(true);
        
        try {
            let fetchedTip;
            // Algoritmo anti-repetição imediata
            do {
                fetchedTip = await this.api.fetchRandomTip();
            } while (fetchedTip === this.state.currentTip);

            this.state.setTip(fetchedTip);
            this._renderTipView();
        } catch (error) {
            console.error("Erro na busca de dados:", error);
            this.dom.tipText.textContent = "Falha ao carregar dados do servidor.";
        } finally {
            this._toggleLoadingState(false);
        }
    }

    _toggleLoadingState(isLoading) {
        this.state.isLoading = isLoading;
        this.dom.btnNext.disabled = isLoading;
        
        if (isLoading) {
            this.dom.tipText.classList.add('card__display-text--faded');
            this.dom.skeleton.classList.remove('skeleton--hidden');
            this.dom.skeleton.setAttribute('aria-hidden', 'false');
        } else {
            this.dom.skeleton.classList.add('skeleton--hidden');
            this.dom.skeleton.setAttribute('aria-hidden', 'true');
            this.dom.tipText.classList.remove('card__display-text--faded');
        }
    }

    _renderTipView() {
        this.dom.tipText.textContent = this.state.currentTip;
        
        // Ativa e altera estado do botão de cópia
        this.dom.btnCopy.disabled = false;
        this.dom.btnCopy.classList.remove('btn--disabled');
    }

    /**
     * API MODERNA DE CLIPBOARD COM ANIMAÇÃO E FEEDBACK
     */
    async handleCopyClipboard() {
        if (!this.state.currentTip) return;

        try {
            await navigator.clipboard.writeText(this.state.currentTip);
            
            // Mutação temporária de UI (Feedback Visual de Sucesso)
            const originalContent = this.dom.btnCopy.innerHTML;
            this.dom.btnCopy.innerHTML = `✅ Copiado!`;
            this.dom.btnCopy.style.color = `var(--brand-success)`;
            
            setTimeout(() => {
                this.dom.btnCopy.innerHTML = originalContent;
                this.dom.btnCopy.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Falha catastrófica ao acessar Área de Transferência:', err);
        }
    }

    handleThemeToggle() {
        const targetTheme = this.state.theme === 'light' ? 'dark' : 'light';
        this.state.setTheme(targetTheme);
        
        this.dom.html.setAttribute('data-theme', targetTheme);
        this.dom.btnTheme.querySelector('.theme-toggle__icon').textContent = 
            targetTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Inicialização da Arquitetura do App
document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController(new AppState(), mockTipsAPI);
    app.init();
});
