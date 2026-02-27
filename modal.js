import { store } from '../store.js';

export function showModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('modal-container').classList.remove('hidden');
}

export function hideModal() {
    document.getElementById('modal-container').classList.add('hidden');
}

export function renderAddProjectForm() {
    return `
        <form id="new-project-form" style="display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <label>NOME DO PROJETO</label>
                <input type="text" id="p-name" required>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <label>SQUAD</label>
                <select id="p-squad">
                    <option value="Desenvolvimento">Desenvolvimento</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operações">Operações</option>
                    <option value="Engenharia">Engenharia</option>
                </select>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <label>DATA LIMITE</label>
                <input type="date" id="p-deadline" required>
            </div>
            <button type="submit" class="btn btn-primary" onclick="window.handleAddProject(event)">Criar Projeto</button>
        </form>
    `;
}

export function handleAddProject(e) {
    e.preventDefault();
    const newProject = {
        id: Date.now(),
        name: document.getElementById('p-name').value,
        squad: document.getElementById('p-squad').value,
        progress: 0,
        status: 'Planejamento',
        members: ['Admin'],
        deadline: document.getElementById('p-deadline').value,
        phases: [{ id: 1, name: 'Fase Inicial' }],
        deliveries: [],
        tasks: [],
        history: []
    };
    store.addProject(newProject);
    hideModal();
    // Re-render is handled by subscriptions or manually calling window.renderView
    if (window.renderView) {
        window.renderView(store.getCurrentView());
    }
}
