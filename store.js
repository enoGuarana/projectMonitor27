import { projectsData } from './data.js';

class Store {
    constructor() {
        this.projects = [...projectsData];
        this.currentView = 'macro';
        this.squadFilter = 'all';
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener());
    }

    getProjects() {
        return this.projects;
    }

    getFilteredProjects() {
        if (this.squadFilter === 'all') {
            return this.projects;
        }
        return this.projects.filter(p => (p.squad || "").toLowerCase().includes(this.squadFilter.toLowerCase()));
    }

    getCurrentView() {
        return this.currentView;
    }

    getSquadFilter() {
        return this.squadFilter;
    }

    setView(view) {
        this.currentView = view;
        this.notify();
    }

    setSquadFilter(filter) {
        this.squadFilter = filter;
        this.notify();
    }

    // Project Actions
    addProject(project) {
        this.projects.push(project);
        this.notify();
    }

    updateProject(updatedProject) {
        const index = this.projects.findIndex(p => p.id === updatedProject.id);
        if (index !== -1) {
            this.projects[index] = updatedProject;
            this.notify();
        }
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.notify();
    }

    getProjectById(id) {
        return this.projects.find(p => p.id === id);
    }
}

// Export singleton instance
export const store = new Store();
