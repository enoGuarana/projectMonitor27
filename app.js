import { store } from './store.js';
import { renderMacroView } from './views/macro.js';
import { renderWorkloadView } from './views/workload.js';
import { renderGanttView } from './views/gantt.js';
import { renderApresentacaoView } from './views/apresentacao.js';
import { renderKanbanView } from './views/kanban.js';
import { renderSprintsView } from './views/sprints.js';
import { renderManagementView } from './views/management.js';
import { renderProjectDetail, removePhase, addPhase, openEditPhaseModal, toggleTaskStatus, deleteTask, openEditTaskModal, openAddTaskModal, addMember, removeMember, removeDelivery, openEditProjectModal } from './views/projectDetail.js';
import { showModal, hideModal, renderAddProjectForm, handleAddProject } from './components/modal.js';

// DOM Elements
const contentArea = document.getElementById('content-area');
const viewTitle = document.getElementById('view-title');
const filterContainer = document.getElementById('filter-container');
const squadSelect = document.getElementById('squad-filter');
const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.querySelector('.close-modal');

// --- Bind globally necessary functions ---
window.renderView = renderView;
window.appRenderDetail = (id) => {
    const p = store.getProjectById(id);
    if (p) {
        renderProjectDetail(p, viewTitle, contentArea);
    }
};

window.handleAddProject = handleAddProject;

// Project detail actions bound to window for inline onclick HTML execution
window.removePhase = removePhase;
window.addPhase = addPhase;
window.openEditPhaseModal = openEditPhaseModal;
window.toggleTaskStatus = toggleTaskStatus;
window.deleteTask = deleteTask;
window.openEditTaskModal = openEditTaskModal;
window.openAddTaskModal = openAddTaskModal;
window.addMember = addMember;
window.removeMember = removeMember;
window.removeDelivery = removeDelivery;
window.openEditProjectModal = openEditProjectModal;
window.deleteProjectFromModal = (pid) => {
    if (confirm('Excluir projeto?')) {
        store.deleteProject(pid);
        renderView('macro');
        hideModal();
    }
};
// ------------------------------------------

// Initialize App
function init() {
    setupEventListeners();
    renderView(store.getCurrentView());
}

function setupEventListeners() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.getAttribute('data-view');
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            store.setView(view);
            renderView(view);
        });
    });

    if (squadSelect) {
        squadSelect.addEventListener('change', (e) => {
            store.setSquadFilter(e.target.value);
            renderView(store.getCurrentView());
        });
    }

    const addProjectBtn = document.getElementById('add-project-btn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => {
            showModal('Novo Projeto', renderAddProjectForm());
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
    }

    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) hideModal();
        });
    }
}

function renderView(view) {
    store.setView(view);

    if (['macro', 'apresentacao', 'gestao', 'kanban'].includes(view)) {
        filterContainer.classList.remove('hidden');
    } else {
        filterContainer.classList.add('hidden');
    }

    const filteredProjects = store.getFilteredProjects();

    switch (view) {
        case 'macro':
            viewTitle.textContent = 'Monitor de Projetos';
            renderMacroView(filteredProjects, contentArea);
            break;
        case 'apresentacao':
            viewTitle.textContent = 'Apresentação Executiva';
            renderApresentacaoView(filteredProjects, contentArea);
            break;
        case 'kanban':
            viewTitle.textContent = 'Kanban por Tarefas';
            renderKanbanView(filteredProjects, contentArea);
            break;
        case 'workload':
            viewTitle.textContent = 'Carga de Trabalho (Workload)';
            renderWorkloadView(contentArea);
            break;
        case 'sprints':
            viewTitle.textContent = 'Sprints Ativas';
            renderSprintsView(filteredProjects, contentArea);
            break;
        case 'gantt':
            viewTitle.textContent = 'Linha do Tempo (Gantt)';
            renderGanttView(filteredProjects, contentArea);
            break;
        case 'gestao':
            viewTitle.textContent = 'Gestão de Metas';
            renderManagementView(filteredProjects, contentArea);
            break;
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Start Application
document.addEventListener('DOMContentLoaded', init);
