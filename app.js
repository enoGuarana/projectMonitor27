// 1. ESTADO E PERSISTÊNCIA
let projects = JSON.parse(localStorage.getItem('cgdin_db')) || [];

const save = () => {
    localStorage.setItem('cgdin_db', JSON.stringify(projects));
};

// 2. NAVEGAÇÃO
window.renderView = function(view) {
    const content = document.getElementById('content-area');
    const titles = { 
        macro: "Dashboard Executivo CGDIN", 
        monitor: "Monitor Operacional", 
        workload: "Carga de Trabalho", 
        kanban: "Quadro Kanban", 
        timeline: "Linha do Tempo de Ocupação" 
    };
    
    document.getElementById('view-title').textContent = titles[view] || "Monitor CGDIN";
    
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active');
        if(n.dataset.view === view) n.classList.add('active');
    });

    content.innerHTML = window.Renderers[view](projects);
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('pt-BR', {day:'2-digit', month:'long', year:'numeric'});
    if(window.lucide) lucide.createIcons();
};

// 3. MODAIS
window.showModal = (title, content) => {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('modal-container').classList.remove('hidden');
};

window.hideModal = () => {
    document.getElementById('modal-container').classList.add('hidden');
};

// 4. CRIAÇÃO DE PROJETOS
window.openProjectModal = () => {
    window.showModal("Novo Projeto Estratégico", `
        <form onsubmit="window.handleCreateProject(event)">
            <label>Nome do Projeto</label>
            <input type="text" id="p-name" placeholder="Ex: Monitoramento CGDIN" required>
            <label>Prazo de Entrega</label>
            <input type="date" id="p-deadline" required>
            <button class="btn btn-primary" type="submit" style="width:100%">Criar Projeto</button>
        </form>`);
};

window.handleCreateProject = (e) => {
    e.preventDefault();
    const name = document.getElementById('p-name').value;
    const deadline = document.getElementById('p-deadline').value;
    
    projects.push({
        id: Date.now(),
        name,
        deadline,
        members: [],
        tasks: []
    });
    
    save();
    window.hideModal();
    window.renderView('macro');
};

window.deleteProject = (id) => {
    if(confirm("Deseja realmente excluir o projeto?")) {
        projects = projects.filter(p => p.id !== id);
        save();
        window.renderView('macro');
    }
};

// 5. GESTÃO DE TAREFAS
window.openTaskModal = (pid) => {
    window.showModal("Adicionar Tarefa ao Projeto", `
        <form onsubmit="window.handleAddTask(event, ${pid})">
            <label>Descrição da Task</label>
            <input type="text" id="t-name" placeholder="O que precisa ser feito?" required>
            <label>Responsável</label>
            <input type="text" id="t-user" placeholder="Nome do integrante" required>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px">
                <div><label>Início</label><input type="date" id="t-start" required></div>
                <div><label>Fim</label><input type="date" id="t-end" required></div>
            </div>
            <button class="btn btn-primary" type="submit" style="width:100%">Salvar Tarefa</button>
        </form>`);
};

window.handleAddTask = (e, pid) => {
    e.preventDefault();
    const p = projects.find(x => x.id === pid);
    const user = document.getElementById('t-user').value;

    p.tasks.push({
        id: Date.now(),
        name: document.getElementById('t-name').value,
        assignedTo: user,
        start: document.getElementById('t-start').value,
        end: document.getElementById('t-end').value,
        status: 'Pendente',
        completed: false
    });

    if(!p.members.includes(user)) p.members.push(user);
    
    save();
    window.hideModal();
    window.renderView('monitor');
};

window.toggleTask = (pid, tid) => {
    const p = projects.find(x => x.id === pid);
    const t = p.tasks.find(x => x.id === tid);
    t.completed = !t.completed;
    t.status = t.completed ? 'Concluído' : 'Em execução';
    save();
    window.renderView('monitor');
};

window.deleteTask = (pid, tid) => {
    const p = projects.find(x => x.id === pid);
    p.tasks = p.tasks.filter(x => x.id !== tid);
    save();
    window.renderView('monitor');
};

// 6. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item').forEach(i => {
        i.onclick = () => window.renderView(i.dataset.view);
    });

    const addBtn = document.getElementById('add-project-btn');
    if(addBtn) addBtn.onclick = () => window.openProjectModal();

    window.renderView('macro');
});
