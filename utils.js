export function getProjectHealth(project) {
    if (project.progress === 100) return 'success';

    const deadline = new Date(project.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0 && project.progress < 100) return 'error'; // Overdue
    if (diffDays < 30 && project.progress < 50) return 'error';  // Critical
    if (diffDays < 60 && project.progress < 30) return 'warning'; // At risk

    return 'success';
}

export function createMiniChart(id, progress, health) {
    const ctx = document.getElementById(id);
    if (!ctx) return;
    const color = health === 'success' ? '#6366f1' : (health === 'warning' ? '#f59e0b' : '#ef4444');

    // Check if Chart is available globally
    if (typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [progress, 100 - progress],
                    backgroundColor: [color, 'rgba(255,255,255,0.05)'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '75%',
                plugins: {
                    tooltip: { enabled: false }
                }
            }
        });
    } else {
        console.warn('Chart.js not loaded. Cannot render mini chart for ' + id);
    }
}

export function updateProjectProgressCalculations(p) {
    if (!p.tasks || p.tasks.length === 0) {
        p.progress = 0;
    } else {
        p.progress = Math.round((p.tasks.filter(t => t.completed).length / p.tasks.length) * 100);
    }
    return p;
}
