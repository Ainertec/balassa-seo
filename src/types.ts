export interface NavLink {
  label: string;
  href: string;
}

export interface Pillar {
  index: string;
  title: string;
  description: string;
  topics: string[];
}

export interface Advantage {
  title: string;
  description: string;
}

export interface Metric {
  value: number;
  suffix: string;
  label: string;
  hint: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  site: string;
  message: string;
}

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
