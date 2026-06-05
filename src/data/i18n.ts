import type { Translation } from './types'

export const translations: Record<'pt' | 'en', Translation> = {
  pt: {
    meta: {
      title: 'Thiago Filipe | Software, IA e Automação',
      description:
        'Portfólio one-page de Thiago Filipe, Engenheiro de Software Júnior focado em Python, IA generativa, LLMs, agentes de IA, automação e desenvolvimento de software.',
    },
    nav: {
      home: 'Início',
      about: 'Sobre',
      stack: 'Stack',
      projects: 'Projetos',
      labs: 'Labs',
      experience: 'Experiência',
      certifications: 'Certificações',
      contact: 'Contato',
    },
    common: {
      github: 'GitHub',
      details: 'Detalhes',
      demo: 'Demo',
      close: 'Fechar',
      downloadResume: 'Baixar currículo',
      availableFor: 'Belo Horizonte, MG',
      conceptualPreview: 'Preview conceitual',
      realPreview: 'Preview real',
      status: 'Status',
      technologies: 'Tecnologias',
    },
    hero: {
      eyebrow: 'Software, IA e Automação',
      title: 'Engenheiro de Software Júnior focado em IA aplicada ao desenvolvimento.',
      subtitle:
        'Construo software, automações e integrações com Python, JavaScript, PHP, Laravel, LLMs, agentes de IA e Prompt Engineering.',
      primaryCta: 'Ver projetos',
      secondaryCta: 'Entrar em contato',
      metrics: ['Python + GenAI', 'LLMs e agentes', 'ERP e APIs'],
      photoAlt: 'Foto profissional de Thiago Filipe',
    },
    about: {
      eyebrow: 'Sobre',
      title: 'Software, processos e IA trabalhando na mesma direção.',
      paragraphs: [
        'Sou Engenheiro de Software Júnior na 3D Lab, estudante de Engenharia de Software e formado em Análise e Desenvolvimento de Sistemas.',
        'Atuo no desenvolvimento de sistemas web e módulos de ERP, planejando, arquitetando e implementando features fullstack com JavaScript, PHP, Laravel, Python, bancos de dados e integrações via API.',
        'Meu foco atual está em Python, IA generativa, LLMs, agentes de IA, Claude Code, Prompt Engineering, automações, testes e validação de funcionalidades.',
      ],
    },
    skills: {
      eyebrow: 'Stack e competências',
      title: 'Base técnica com prioridade em IA aplicada e software prático.',
      description:
        'Organizei as competências para refletir o foco atual do currículo: IA generativa, automação, engenharia de software e sistemas web.',
      groups: [
        { title: 'IA e automação', items: ['Python', 'IA generativa', 'LLMs', 'Agentes de IA', 'Claude Code', 'Prompt Engineering'] },
        { title: 'Desenvolvimento', items: ['JavaScript', 'PHP', 'Laravel', 'HTML', 'CSS', 'TypeScript'] },
        { title: 'Sistemas', items: ['ERP', 'Integrações via API', 'Bancos de dados', 'SQL', 'Scripts'] },
        { title: 'Qualidade e processo', items: ['Testes', 'Validação', 'QA', 'Gestão de bugs', 'Kanban em sprints'] },
      ],
    },
    projects: {
      eyebrow: 'Projetos',
      title: 'Projetos práticos com foco em IA, automação e sistemas.',
      description:
        'Cards equilibrados para leitura rápida de recrutadores, com detalhes técnicos em drawer sem criar páginas internas.',
      featuredTitle: 'Destaques',
      secondaryTitle: 'Labs e estudos práticos',
    },
    experience: {
      eyebrow: 'Experiência',
      title: 'Atuação em software, ERP, integrações e IA aplicada.',
      items: [
        {
          role: 'Engenheiro de Software Júnior',
          company: '3D Lab',
          location: 'Belo Horizonte, MG',
          period: '06/2026 - atual',
          bullets: [
            'Desenvolvimento de módulos do ERP interno, com planejamento, arquitetura e implementação de features fullstack.',
            'Aplicação de IA generativa, LLMs, agentes de IA e Prompt Engineering para análise de código, scripts, automações e refino de funcionalidades.',
            'Desenvolvimento e manutenção com JavaScript, PHP, Laravel, Python, bancos de dados e integrações via API.',
          ],
        },
        {
          role: 'Estagiário de Tecnologia e Processos',
          company: '3D Lab',
          location: 'Belo Horizonte, MG',
          period: '03/2026 - 06/2026',
          bullets: [
            'Atuação em módulos do ERP interno com JavaScript, noções de Nest.js e Next.js, além de PHP em integrações internas.',
            'Uso de GenAI, LLMs e Claude Code para produtividade no desenvolvimento, análise e refino de código, scripts e automações.',
          ],
        },
      ],
    },
    certifications: {
      eyebrow: 'Certificações',
      title: 'Aprendizado contínuo em IA, programação, dados e qualidade.',
      description: 'Certificados listados conforme currículo atualizado.',
      items: [
        'Introduction to AI — Google',
        'Revelando o poder dos Agentes de IA — IBM',
        'Python 2026: Do Básico ao Avançado — Udemy',
        'Desenvolvimento Rápido de Aplicações em Python — Estácio',
        'Git e Github: compartilhando e colaborando em projetos — Alura',
        'Mergulhe em programação com JavaScript — Alura',
        'Quality Assurance: plano de testes e gestão de bugs — Alura',
        'Banco de Dados e SQL — AlgaWorks',
        'Programação de Algoritmos Escaláveis — Estácio',
      ],
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Vamos conversar sobre software, IA aplicada e automação.',
      description:
        'Acesse meu GitHub, conecte-se pelo LinkedIn ou envie uma mensagem por e-mail. O currículo está disponível para download.',
      emailLabel: 'Enviar e-mail',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
    },
  },
  en: {
    meta: {
      title: 'Thiago Filipe | Software, AI and Automation',
      description:
        'One-page portfolio by Thiago Filipe, Junior Software Engineer focused on Python, generative AI, LLMs, AI agents, automation and software development.',
    },
    nav: {
      home: 'Home',
      about: 'About',
      stack: 'Stack',
      projects: 'Projects',
      labs: 'Labs',
      experience: 'Experience',
      certifications: 'Certifications',
      contact: 'Contact',
    },
    common: {
      github: 'GitHub',
      details: 'Details',
      demo: 'Demo',
      close: 'Close',
      downloadResume: 'Download resume',
      availableFor: 'Belo Horizonte, Brazil',
      conceptualPreview: 'Conceptual preview',
      realPreview: 'Real preview',
      status: 'Status',
      technologies: 'Technologies',
    },
    hero: {
      eyebrow: 'Software, AI and Automation',
      title: 'Junior Software Engineer focused on AI applied to development.',
      subtitle:
        'I build software, automations and integrations with Python, JavaScript, PHP, Laravel, LLMs, AI agents and Prompt Engineering.',
      primaryCta: 'View projects',
      secondaryCta: 'Get in touch',
      metrics: ['Python + GenAI', 'LLMs and agents', 'ERP and APIs'],
      photoAlt: 'Professional photo of Thiago Filipe',
    },
    about: {
      eyebrow: 'About',
      title: 'Software, processes and AI moving in the same direction.',
      paragraphs: [
        'I am a Junior Software Engineer at 3D Lab, currently studying Software Engineering and graduated in Systems Analysis and Development.',
        'I work on web systems and ERP modules, planning, architecting and implementing fullstack features with JavaScript, PHP, Laravel, Python, databases and API integrations.',
        'My current focus is Python, generative AI, LLMs, AI agents, Claude Code, Prompt Engineering, automations, testing and feature validation.',
      ],
    },
    skills: {
      eyebrow: 'Stack and skills',
      title: 'Technical foundation with priority on applied AI and practical software.',
      description:
        'The skill map reflects the current positioning from the resume: generative AI, automation, software engineering and web systems.',
      groups: [
        { title: 'AI and automation', items: ['Python', 'Generative AI', 'LLMs', 'AI agents', 'Claude Code', 'Prompt Engineering'] },
        { title: 'Development', items: ['JavaScript', 'PHP', 'Laravel', 'HTML', 'CSS', 'TypeScript'] },
        { title: 'Systems', items: ['ERP', 'API integrations', 'Databases', 'SQL', 'Scripts'] },
        { title: 'Quality and process', items: ['Testing', 'Validation', 'QA', 'Bug management', 'Kanban in sprints'] },
      ],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Practical projects focused on AI, automation and systems.',
      description:
        'Balanced cards for recruiter-friendly scanning, with technical details in a drawer and no internal project pages.',
      featuredTitle: 'Featured',
      secondaryTitle: 'Labs and practical studies',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Work across software, ERP, integrations and applied AI.',
      items: [
        {
          role: 'Junior Software Engineer',
          company: '3D Lab',
          location: 'Belo Horizonte, Brazil',
          period: '06/2026 - present',
          bullets: [
            'Development of internal ERP modules, including planning, architecture and fullstack feature implementation.',
            'Use of generative AI, LLMs, AI agents and Prompt Engineering for code analysis, scripts, automations and feature refinement.',
            'Development and maintenance with JavaScript, PHP, Laravel, Python, databases and API integrations.',
          ],
        },
        {
          role: 'Technology and Process Intern',
          company: '3D Lab',
          location: 'Belo Horizonte, Brazil',
          period: '03/2026 - 06/2026',
          bullets: [
            'Worked on internal ERP modules with JavaScript, basic Nest.js and Next.js exposure, and PHP for internal integrations.',
            'Used GenAI, LLMs and Claude Code to improve productivity in development, code analysis and refinement, scripts and automations.',
          ],
        },
      ],
    },
    certifications: {
      eyebrow: 'Certifications',
      title: 'Continuous learning across AI, programming, data and quality.',
      description: 'Certificates listed according to the updated resume.',
      items: [
        'Introduction to AI — Google',
        'Revelando o poder dos Agentes de IA — IBM',
        'Python 2026: Do Básico ao Avançado — Udemy',
        'Desenvolvimento Rápido de Aplicações em Python — Estácio',
        'Git e Github: compartilhando e colaborando em projetos — Alura',
        'Mergulhe em programação com JavaScript — Alura',
        'Quality Assurance: plano de testes e gestão de bugs — Alura',
        'Banco de Dados e SQL — AlgaWorks',
        'Programação de Algoritmos Escaláveis — Estácio',
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s talk about software, applied AI and automation.',
      description:
        'Visit my GitHub, connect on LinkedIn or send an email. The resume is available for download.',
      emailLabel: 'Send email',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
    },
  },
}
