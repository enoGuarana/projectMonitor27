window.Renderers = {
    // 1. VISÃO EXECUTIVA (Cálculo Dinâmico por Tasks)
    macro: (projects) => {
        const totalProjects = projects.length;
        // Soma de todas as tarefas de todos os projetos
        const allTasks = projects.flatMap(p => p.tasks || []);
        const totalTasks = allTasks.length;
        const totalDone = allTasks.filter(t => t.completed).length;
        const globalProgress = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

        return `
            <div class="macro-grid" style="margin-bottom:30px">
                <div class="project-card"><h3>${totalProjects}</h3><p>Projetos Ativos</p></div>
                <div class="project-card"><h3>${totalTasks}</h3><p>Total de Tasks</p></div>
                <div class="project-card"><h3 style="color:var(--success)">${globalProgress}%</h3><p>Execução Global</p></div>
            </div>
            <div class="macro-grid">
                ${projects.map(p => {
                    // CÁLCULO INDIVIDUAL DO PROJETO
                    const pTasks = p.tasks || [];
                    const pDone = pTasks.filter(t => t.completed).length;
                    const pPercent = pTasks.length > 0 ? Math.round((pDone / pTasks.length) * 100) : 0;
                    
                    return `
                    <div class="project-card" style="border-top: 4px solid ${pPercent === 100 ? 'var(--success)' : 'var(--accent)'}">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start">
                            <h4 style="margin:0">${p.name}</h4>
                            <button onclick="window.deleteProject(${p.id})" style="background:none; border:none; color:var(--text-secondary); cursor:pointer">✕</button>
                        </div>
                        <p style="font-size:0.7rem; color:var(--text-secondary); margin: 5px 0 15px 0">Prazo: ${p.deadline}</p>
                        
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" style="width:${pPercent}%"></div>
                        </div>
                        
                        <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:600">
                            <span>${pPercent}% Executado</span>
                            <span style="color:var(--text-secondary)">${pDone}/${pTasks.length} Tasks</span>
                        </div>
                    </div>`;
                }).join('')}
            </div>`;
    },

    // 2. MONITOR OPERACIONAL (Onde as tasks são gerenciadas)
    monitor: (projects) => {
        if (projects.length === 0) return `<div class="detail-card">Crie um projeto para começar a gerenciar tarefas.</div>`;
        return projects.map(p => `
            <div class="detail-card" style="margin-bottom:25px">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px">
                    <div>
                        <h2 style="margin:0">${p.name}</h2>
                        <small style="color:var(--accent)">Foco: Operacional</small>
                    </div>
                    <button class="btn btn-primary" onclick="window.openTaskModal(${p.id})">+ Nova Task Interna</button>
                </div>
                <table style="width:100%; border-collapse:collapse">
                    <tr style="text-align:left; font-size:0.75rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:1px">
                        <th style="padding-bottom:10px">Descrição</th>
                        <th style="padding-bottom:10px">Responsável</th>
                        <th style="padding-bottom:10px">Status</th>
                        <th style="padding-bottom:10px; text-align:right">Ações</th>
                    </tr>
                    ${p.tasks.map(t => `
                    <tr style="border-top:1px solid var(--border); transition:0.3s">
                        <td style="padding:15px 0; font-weight:500">${t.name}</td>
                        <td><span style="background:rgba(255,255,255,0.05); padding:4px 8px; border-radius:4px; font-size:0.8rem">${t.assignedTo}</span></td>
                        <td>
                            <span onclick="window.toggleTask(${p.id}, ${t.id})" 
                                  class="status-badge ${t.completed ? 'status-concluido' : 'status-execucao'}" 
                                  style="cursor:pointer">
                                ${t.status}
                            </span>
                        </td>
                        <td style="text-align:right">
                            <button onclick="window.deleteTask(${p.id}, ${t.id})" style="background:none; border:none; color:var(--danger); cursor:pointer; font-size:1.1rem">🗑️</button>
                        </td>
                    </tr>`).join('')}
                </table>
                ${p.tasks.length === 0 ? `<p style="text-align:center; color:var(--text-secondary); font-size:0.8rem; margin-top:15px">Nenhuma task interna cadastrada.</p>` : ''}
            </div>`).join('');
    },

    // 3. CARGA DE TRABALHO (Baseado nas tasks internas)
    workload: (projects) => {
        const members = [...new Set(projects.flatMap(p => p.members || []))];
        return `<div class="macro-grid">
            ${members.map(m => {
                const tasksPendentes = projects.flatMap(p => p.tasks).filter(t => t.assignedTo === m && !t.completed);
                return `
                <div class="project-card" style="border-left:4px solid ${tasksPendentes.length > 3 ? 'var(--danger)' : 'var(--success)'}">
                    <h3 style="margin:0">${m}</h3>
                    <h2 style="color:var(--accent); margin:15px 0">${tasksPendentes.length}</h2>
                    <p style="font-size:0.75rem; color:var(--text-secondary)">Tasks pendentes sob responsabilidade</p>
                </div>`;
            }).join('')}
        </div>`;
    },

    // 4. QUADRO KANBAN
    kanban: (projects) => {
        const cols = ['Pendente', 'Em execução', 'Concluído'];
        return `<div class="kanban-board">
            ${cols.map(c => `
                <div class="kanban-column">
                    <h4 style="margin-bottom:20px; border-bottom: 2px solid var(--border); padding-bottom:10px">${c.toUpperCase()}</h4>
                    ${projects.flatMap(p => p.tasks.filter(t => t.status === c).map(t => `
                        <div class="kanban-task-card">
                            <div style="font-size:0.65rem; color:var(--accent); font-weight:700; margin-bottom:5px">${p.name}</div>
                            <div style="font-weight:600; font-size:0.9rem">${t.name}</div>
                            <div style="margin-top:10px; font-size:0.7rem; color:var(--text-secondary)">👤 ${t.assignedTo}</div>
                        </div>`)).join('')}
                </div>`).join('')}
        </div>`;
    },

    // 5. LINHA DO TEMPO (Focada em Integrantes)
    timeline: (projects) => {
        const weeks = Array.from({length: 12}, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() + (i * 7));
            return `S${i + 1}`;
        });

        return `
        <div class="detail-card" style="overflow-x:auto; padding:0">
            <div style="min-width:1200px; display:grid; grid-template-columns: 250px repeat(12, 1fr); background: var(--border); gap: 1px">
                <div class="gantt-header">ATIVIDADE INTERNA</div>
                ${weeks.map(w => `<div class="gantt-header">${w}</div>`).join('')}
                ${projects.flatMap(p => p.tasks.map(t => {
                    const start = new Date(t.start);
                    const end = new Date(t.end);
                    const startWeek = Math.max(0, Math.floor((start - new Date()) / (1000 * 60 * 60 * 24 * 7)));
                    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7));

                    return `
                        <div style="padding:15px; background:var(--bg-panel); font-size:0.8rem; border-bottom:1px solid var(--border)">
                            <strong style="color:var(--accent)">${p.name}</strong><br>${t.name}
                        </div>
                        ${Array.from({length: 12}).map((_, i) => {
                            const active = i >= startWeek && i < (startWeek + duration);
                            return `
                            <div style="background:var(--bg-panel); border-bottom:1px solid var(--border); display:flex; align-items:center; padding:0 4px">
                                ${active ? `<div class="gantt-bar" style="width:100%; background:${t.completed ? 'var(--success)' : 'var(--accent)'}; opacity:0.8"></div>` : ''}
                            </div>`;
                        }).join('')}
                    `;
                })).join('')}
            </div>
        </div>`;
    }
};