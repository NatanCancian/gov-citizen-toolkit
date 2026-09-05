export type Task = {
  id: number;
  title: string;
  phaseId: number;
};

export type Phase = {
  id: number;
  name: string;
  subtitle: string;
};

export const PHASES: Phase[] = [
  { id: 1, name: "Fase 1", subtitle: "Origem e Triagem" },
  { id: 2, name: "Fase 2", subtitle: "Documentos Técnicos" },
  { id: 3, name: "Fase 3", subtitle: "Pesquisa e Fiscalização" },
  { id: 4, name: "Fase 4", subtitle: "Orçamento e Validação" },
];

export const TASKS: Task[] = [
  { id: 1, phaseId: 1, title: "Início do processo pela Autarquia (Origem)" },
  { id: 2, phaseId: 1, title: "Inserir demanda no Cadastro de Intenções do Município" },
  { id: 3, phaseId: 1, title: "Análise e validação pela Central de Compras" },
  { id: 4, phaseId: 1, title: "Verificação de Catálogo Eletrônico (Portaria 107/2023)" },
  { id: 5, phaseId: 2, title: "Construir Documento de Formalização de Demanda (DFD)" },
  { id: 6, phaseId: 2, title: "Construir Matriz de Gerenciamento de Riscos" },
  { id: 7, phaseId: 2, title: "Construir Estudo Técnico Preliminar (ETP)" },
  { id: 8, phaseId: 2, title: "Construir Termo de Referência (TR)" },
  { id: 9, phaseId: 3, title: "Fazer Portaria de Nomeação de Fiscais" },
  { id: 10, phaseId: 3, title: "Construir Mapa Comparativo de Preços" },
  { id: 11, phaseId: 3, title: "Construir Documento de Responsável de Pesquisa de Mercado" },
  { id: 12, phaseId: 3, title: "Fazer o Anexo de Orçamentos" },
  { id: 13, phaseId: 4, title: "Construir Nota de Reserva de Dotação Orçamentária" },
  { id: 14, phaseId: 4, title: "Fazer Minuta do Edital" },
  { id: 15, phaseId: 4, title: "Enviar ao Departamento Jurídico" },
  { id: 16, phaseId: 4, title: "Validação do Jurídico (Aprovar ou Retornar)" },
];

export const FINAL_TASK_ID = 16;
