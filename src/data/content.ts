import type { Advantage, FaqItem, Metric, NavLink, Pillar } from '../types';

export const SITE = {
  name: 'Balassa',
  tagline: 'SEO & Growth',
  domain: 'www.seudominio.com.br',
  email: 'contato@seudominio.com.br',
  phone: '+55 11 99999-9999',
  phoneHref: 'tel:+5511999999999',
  whatsappUrl: 'https://wa.me/5511999999999',
  address: 'Av. Brigadeiro Faria Lima, 3000 — São Paulo, SP',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Método', href: '#metodo' },
  { label: 'Excelência', href: '#excelencia' },
  { label: 'Perguntas', href: '#faq' },
];

export const PILLARS: Pillar[] = [
  {
    index: '01',
    title: 'SEO Técnico Avançado',
    description:
      'Otimização estrutural profunda, velocidade impecável (Core Web Vitals) e indexação cirúrgica para robôs de busca.',
    topics: ['Core Web Vitals', 'Arquitetura de informação', 'Dados estruturados'],
  },
  {
    index: '02',
    title: 'Autoridade & Conteúdo',
    description:
      'Criação de narrativas editoriais de alto valor que posicionam sua marca como referência absoluta no ecossistema.',
    topics: ['Pesquisa de intenção', 'Clusters semânticos', 'E-E-A-T'],
  },
  {
    index: '03',
    title: 'Link Building de Elite',
    description:
      'Aquisição de menções e backlinks orgânicos provenientes exclusivamente de portais de altíssima reputação.',
    topics: ['Digital PR', 'Outreach curado', 'Autoridade de domínio'],
  },
];

export const METRICAS: Metric[] = [
  { value: 14, suffix: ' anos', label: 'De mercado', hint: 'Consultoria dedicada a marcas premium' },
  { value: 320, suffix: '%', label: 'Crescimento médio', hint: 'Tráfego orgânico em 12 meses' },
  { value: 96, suffix: '%', label: 'Retenção', hint: 'Clientes que renovam a parceria' },
  { value: 47, suffix: '+', label: 'Marcas atendidas', hint: 'Luxo, saúde, tecnologia e varejo' },
];

export const PROCESSO = [
  {
    step: 'Etapa 01',
    title: 'Diagnóstico Confidencial',
    description:
      'Auditoria completa de indexação, performance, arquitetura e concorrência. Um retrato preciso do seu ecossistema digital.',
    deliverable: 'Relatório executivo',
  },
  {
    step: 'Etapa 02',
    title: 'Arquitetura de Estratégia',
    description:
      'Definição de territórios semânticos, priorização por potencial de receita e um roadmap de execução trimestral.',
    deliverable: 'Roadmap 90 dias',
  },
  {
    step: 'Etapa 03',
    title: 'Execução Refinada',
    description:
      'Sprints técnicos e editoriais com acompanhamento semanal, sem ruído e com entregas mensuráveis.',
    deliverable: 'Sprints quinzenais',
  },
  {
    step: 'Etapa 04',
    title: 'Autoridade Composta',
    description:
      'Consolidação de posições, expansão de conteúdo e aquisição de links premium que sustentam o crescimento.',
    deliverable: 'Relatórios de autoridade',
  },
] as const;

export const DIFERENCIAIS: Advantage[] = [
  {
    title: 'Discrição absoluta',
    description:
      'Equipes dedicadas, comunicação direta com a liderança e total confidencialidade sobre as marcas atendidas.',
  },
  {
    title: 'Padrão editorial de luxo',
    description:
      'Conteúdo que conversa com o padrão da sua marca — sofisticação, precisão e consistência em cada página.',
  },
  {
    title: 'Decisões guiadas por dados',
    description:
      'Dashboards executivos com métricas de tráfego, receita assistida e evolução de autoridade em tempo real.',
  },
  {
    title: 'Clareza no relacionamento',
    description:
      'Relatórios objetivos, janelas de reunião previsíveis e nenhuma promessa que não possa ser medida.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Em quanto tempo os resultados começam a aparecer?',
    answer:
      'Os primeiros ganhos técnicos — indexação e velocidade — aparecem nas primeiras semanas. Movimentos consistentes de posicionamento costumam surgir a partir do terceiro mês, com consolidação de autoridade entre seis e doze meses.',
  },
  {
    question: 'Como a Balassa trabalha com marcas premium?',
    answer:
      'Cada cliente tem um squad dedicado, um plano de comunicação direto com a liderança e um padrão editorial alinhado ao posicionamento da marca. Não publicamos nada que não passe pela aprovação do seu time.',
  },
  {
    question: 'Marcas em nichos regulados são atendidas?',
    answer:
      'Sim. Saúde, finanças e jurídico são tratados com revisão especializada e diretrizes próprias de conformidade, sempre com validação do comitê do cliente antes da publicação.',
  },
  {
    question: 'Qual é o formato de engajamento?',
    answer:
      'Trabalhamos com contratos trimestrais de consultoria e execução, com escopo definido após o diagnóstico confidencial. Não há cobrança de performance sobre resultados que não controlamos integralmente.',
  },
];
