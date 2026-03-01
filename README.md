# 📊 CGDIN - Monitor Geral de Projetos

![Status](https://img.shields.io/badge/Status-Operacional-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-Vanilla_JS_|_CSS3_|_HTML5-blue?style=for-the-badge)

O **CGDIN Monitor** é uma plataforma executiva e operacional de alto desempenho projetada para a gestão de projetos estratégicos. O sistema utiliza uma arquitetura de dados onde o progresso dos projetos é calculado dinamicamente com base na execução de tarefas internas.



## 🚀 Funcionalidades Principais

O sistema é dividido em 5 visões integradas:

1.  **Visão Executiva (Dashboard):** Painel de alto nível que exibe o progresso percentual real de cada projeto, calculado pela relação `Tasks Concluídas / Total de Tasks`.
2.  **Monitor Operacional:** Gestão detalhada de tarefas internas. Permite a criação de micro-entregas, atribuição de responsáveis e controle de status.
3.  **Carga de Trabalho:** Analisa a distribuição de tarefas entre os integrantes, sinalizando sobrecarga em membros com mais de 3 tarefas pendentes.
4.  **Quadro Kanban:** Visualização clássica de fluxo de trabalho (Pendente, Em Execução, Concluído) para agilidade no dia a dia.
5.  **Linha do Tempo (Gantt de Ocupação):** Cronograma de 12 semanas que exibe visualmente quando cada integrante está ocupado com uma tarefa específica.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5 Semântico, CSS3 (Variáveis e Flexbox/Grid).
* **Engine:** Vanilla JavaScript (ES6+).
* **Ícones:** [Lucide Icons](https://lucide.dev/).
* **Persistência:** LocalStorage (Os dados permanecem no navegador após o fechamento).

## 📂 Estrutura do Projeto

```text
├── index.html          # Estrutura principal e pontos de montagem
├── css/
│   └── style.css       # Design System Premium (Dark Mode)
└── js/
    ├── renderers.js    # Motor de renderização das 5 visões
    └── app.js          # Lógica de negócio, persistência e eventos
