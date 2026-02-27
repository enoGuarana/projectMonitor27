export const projectsData = [
    {
        id: 1, name: 'inovaLAb', progress: 75, status: 'Em andamento', squad: 'Engenharia',
        members: ['João', 'Maria', 'Carlos'], deadline: '2026-06-15', topics: ['Inovação', 'Hardware'],
        phases: [
            { id: 1, name: 'Concepção' },
            { id: 2, name: 'Prototipagem' },
            { id: 3, name: 'Testes' }
        ],
        deliveries: [
            { id: 11, name: 'Protótipo Alpha', date: '2026-03-20', dependsOn: null },
            { id: 12, name: 'Testes de Campo', date: '2026-05-10', dependsOn: 11 }
        ],
        tasks: [
            { id: 101, name: 'Levantamento de Requisitos', status: 'Concluído', completed: true, assignedTo: 'João', sprint: 'Sprint 1', phaseId: 1, start: '2026-01-10', end: '2026-01-25' },
            { id: 102, name: 'Design de PCB', status: 'Concluído', completed: true, assignedTo: 'Maria', sprint: 'Sprint 1', phaseId: 1, start: '2026-01-20', end: '2026-02-10' },
            { id: 103, name: 'Montagem Alpha', status: 'Concluído', completed: true, assignedTo: 'João', sprint: 'Sprint 2', phaseId: 2, start: '2026-02-15', end: '2026-03-15' },
            { id: 104, name: 'Testes de Firmware', status: 'Em execução', completed: false, assignedTo: 'Maria', sprint: 'Sprint 2', phaseId: 3, start: '2026-03-20', end: '2026-04-10' }
        ],
        history: [
            { id: 1001, date: '2026-02-20', action: 'Projeto iniciado' },
            { id: 1002, date: '2026-02-22', action: 'Design de PCB finalizado' }
        ]
    },
    {
        id: 2, name: 'RNDT', progress: 40, status: 'Planejamento', squad: 'Desenvolvimento',
        members: ['Carlos', 'Ana'], deadline: '2026-08-20', topics: ['Redes', 'Dados'],
        phases: [
            { id: 1, name: 'Design de Sistema' },
            { id: 2, name: 'Implementação' }
        ],
        deliveries: [{ id: 21, name: 'Arquitetura de Dados', date: '2026-07-15', dependsOn: null }],
        tasks: [
            { id: 201, name: 'Estudo de Viabilidade', status: 'Concluído', completed: true, assignedTo: 'Carlos', sprint: 'Sprint 1', phaseId: 1, start: '2026-02-01', end: '2026-02-15' },
            { id: 202, name: 'Definição de Stack', status: 'Em execution', completed: false, assignedTo: 'Ana', sprint: 'Sprint 2', phaseId: 1, start: '2026-02-15', end: '2026-03-01' },
            { id: 203, name: 'Mapeamento de Fluxos', status: 'Pendente', completed: false, assignedTo: 'Carlos', sprint: 'Sprint 2', phaseId: 2, start: '2026-03-05', end: '2026-04-05' }
        ],
        history: [{ id: 2001, date: '2026-02-25', action: 'Arquitetura definida' }]
    },
    {
        id: 3, name: 'Eletrificação', progress: 100, status: 'Concluído', squad: 'Operações',
        members: ['Pedro', 'Julia'], deadline: '2026-04-10', topics: ['Energia', 'Sustentabilidade'],
        phases: [{ id: 1, name: 'Execução Final' }],
        deliveries: [{ id: 31, name: 'Certificação Final', date: '2026-04-01', dependsOn: null }],
        tasks: [
            { id: 301, name: 'Instalação de Painéis', status: 'Concluído', completed: true, assignedTo: 'Pedro', sprint: 'Sprint Final', phaseId: 1, start: '2026-02-01', end: '2026-03-10' },
            { id: 302, name: 'Ajuste de Conversores', status: 'Concluído', completed: true, assignedTo: 'Julia', sprint: 'Sprint Final', phaseId: 1, start: '2026-03-15', end: '2026-03-25' },
            { id: 303, name: 'Inspeção Técnica', status: 'Concluído', completed: true, assignedTo: 'Pedro', sprint: 'Sprint Final', phaseId: 1, start: '2026-03-26', end: '2026-04-05' }
        ],
        history: [{ id: 3001, date: '2026-02-10', action: 'Concluído com sucesso' }]
    }
];
