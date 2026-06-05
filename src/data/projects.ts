import type { Project } from './types'
import numeroSecretoScreenshot from '../assets/projects/numero-secreto/screenshot-real.png'
import produtosScreenshot from '../assets/projects/produtos/screenshot-real.png'

export const projects: Project[] = [
  {
    id: 'devguard',
    featured: true,
    repoUrl: 'https://github.com/th1agx/devguard-skill',
    previewKind: 'conceptual',
    previewType: 'workflow',
    previewLabel: { pt: 'Workflow preview', en: 'Workflow preview' },
    status: { pt: 'Validado / em evolução', en: 'Validated / evolving' },
    title: { pt: 'DevGuard Skill', en: 'DevGuard Skill' },
    description: {
      pt: 'Skill de disciplina para agentes de IA com SDD, planejamento, testes, smoke tests, stress tests e entrega baseada em evidências.',
      en: 'A development-discipline skill for AI agents with SDD, planning, tests, smoke tests, stress tests and evidence-based delivery.',
    },
    value: {
      pt: 'Ajuda agentes de IA a trabalhar com mais método e validação.',
      en: 'Helps AI agents work with stronger process and validation.',
    },
    details: {
      pt: [
        'Projeto focado em disciplinar o ciclo de desenvolvimento com agentes de IA, sem prometer automação mágica.',
        'A apresentação visual usa um fluxo conceitual porque o projeto é uma skill/processo, não uma interface tradicional.',
      ],
      en: [
        'Project focused on structuring the development cycle with AI agents without promising magic automation.',
        'The visual presentation uses a conceptual workflow because the project is a skill/process, not a traditional UI.',
      ],
    },
    technologies: ['GenAI', 'SDD', 'Tests', 'Agents', 'Docs'],
  },
  {
    id: 'produtos',
    featured: true,
    repoUrl: 'https://github.com/th1agx/Sistema-de-Gerenciamento-de-Produtos',
    previewKind: 'real',
    previewType: 'dashboard',
    previewLabel: { pt: 'Screenshot real', en: 'Real screenshot' },
    screenshot: produtosScreenshot,
    status: { pt: 'Projeto prático', en: 'Practical project' },
    title: { pt: 'Gestão de Produtos', en: 'Product Management' },
    description: {
      pt: 'Sistema web de gerenciamento de produtos com cadastro, listagem, validação, persistência local e relatório de estoque.',
      en: 'Web product management system with registration, listing, validation, local persistence and inventory reporting.',
    },
    value: {
      pt: 'Organiza um fluxo CRUD simples com foco em uso real.',
      en: 'Organizes a simple CRUD flow with practical usage in mind.',
    },
    details: {
      pt: [
        'O preview atual usa uma captura real do projeto rodando localmente, com produtos de exemplo inseridos pela interface.',
        'Bom candidato para GitHub Pages por ser um projeto front-end estático.',
      ],
      en: [
        'The current preview uses a real local screenshot with sample products inserted through the interface.',
        'A strong GitHub Pages candidate because it is a static front-end project.',
      ],
    },
    technologies: ['JavaScript', 'HTML', 'CSS', 'CRUD', 'localStorage'],
  },
  {
    id: 'forza',
    featured: true,
    repoUrl: 'https://github.com/th1agx/Python---Forza-Horizon-5-Auto-Drive-XP-Farm.',
    previewKind: 'conceptual',
    previewType: 'terminal',
    previewLabel: { pt: 'Automação experimental', en: 'Experimental automation' },
    status: { pt: 'Automação experimental', en: 'Experimental automation' },
    title: { pt: 'Forza Auto Drive', en: 'Forza Auto Drive' },
    description: {
      pt: 'Automação em Python para controlar trajetos contínuos no Forza Horizon 5 e executar uma rotina de XP farm.',
      en: 'Python automation to control continuous routes in Forza Horizon 5 and run an XP farming routine.',
    },
    value: {
      pt: 'Explora automação de entradas, fluxo e repetição com Python.',
      en: 'Explores input automation, flow control and repetition with Python.',
    },
    details: {
      pt: [
        'O preview evita gameplay falso: mostra terminal e fluxo técnico de automação.',
        'Um GIF real pode ser adicionado depois se houver gravação própria do projeto em execução.',
      ],
      en: [
        'The preview avoids fake gameplay: it shows a terminal and technical automation flow.',
        'A real GIF can be added later if there is an original recording of the project running.',
      ],
    },
    technologies: ['Python', 'PyAutoGUI', 'Automation', 'Scripts'],
  },
  {
    id: 'academias',
    featured: false,
    repoUrl: 'https://github.com/th1agx/Sistema-de-Gest-o-de-Academias',
    previewKind: 'conceptual',
    previewType: 'app',
    previewLabel: { pt: 'CLI/GUI preview conceitual', en: 'Conceptual CLI/GUI preview' },
    status: { pt: 'Estudo prático', en: 'Practical study' },
    title: { pt: 'Gestão de Academias', en: 'Gym Management' },
    description: {
      pt: 'Sistema em Python com organização MVC, SQLite, interface CLI e GUI tkinter parcial.',
      en: 'Python system organized with MVC, SQLite, CLI interface and partial tkinter GUI.',
    },
    value: {
      pt: 'Exercita arquitetura simples e persistência local.',
      en: 'Practices simple architecture and local persistence.',
    },
    details: {
      pt: ['Projeto secundário para mostrar base em Python, SQLite e organização de sistemas.'],
      en: ['Secondary project showing Python, SQLite and basic system organization.'],
    },
    technologies: ['Python', 'SQLite', 'MVC', 'tkinter'],
  },
  {
    id: 'numero-secreto',
    featured: false,
    repoUrl: 'https://github.com/th1agx/Projeto-Jogo-do-Numero-Secreto',
    previewKind: 'real',
    previewType: 'web',
    previewLabel: { pt: 'Screenshot real', en: 'Real screenshot' },
    screenshot: numeroSecretoScreenshot,
    status: { pt: 'Projeto de base', en: 'Foundation project' },
    title: { pt: 'Jogo do Número Secreto', en: 'Secret Number Game' },
    description: {
      pt: 'Jogo interativo de adivinhação com número aleatório e lógica em JavaScript.',
      en: 'Interactive guessing game with random number generation and JavaScript logic.',
    },
    value: { pt: 'Demonstra fundamentos de lógica e DOM.', en: 'Shows logic and DOM fundamentals.' },
    details: {
      pt: ['O preview usa uma captura real do projeto estático renderizado localmente.'],
      en: ['The preview uses a real screenshot from the static project rendered locally.'],
    },
    technologies: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'web',
    featured: false,
    repoUrl: 'https://github.com/th1agx/Projeto-desenvolvimento-WEB',
    previewKind: 'conceptual',
    previewType: 'web',
    previewLabel: { pt: 'Preview discreto', en: 'Low-emphasis preview' },
    status: { pt: 'Projeto acadêmico', en: 'Academic project' },
    title: { pt: 'Desenvolvimento Web', en: 'Web Development' },
    description: {
      pt: 'Projeto web para prática de estrutura, estilo e composição de página.',
      en: 'Web project for practicing structure, styling and page composition.',
    },
    value: { pt: 'Mostra evolução em HTML e CSS.', en: 'Shows progress in HTML and CSS.' },
    details: {
      pt: ['Antes de usar assets reais, é recomendado revisar origem e licença das imagens.'],
      en: ['Before using real assets, image origin and licensing should be reviewed.'],
    },
    technologies: ['HTML', 'CSS', 'Web'],
  },
]
