/* Núcleo de domínio: constantes, dados-semente, helpers e motores (férias, lembretes, permissões). */
import {
  LayoutDashboard, Users, Wallet, Plane, FolderClosed, CalendarDays, Settings,
  Search, Plus, Cake, Gift, Clock, Receipt, BadgeCheck, FileText, Megaphone,
  PartyPopper, ArrowLeft, Briefcase, UserCheck, AlertTriangle,
  LogIn, LogOut, TrendingUp, Award, ArrowRightLeft,
  FileSignature, FileCheck, Paperclip, Star, Eye, UserX, RotateCcw,
  Coffee, DollarSign, Coins, CalendarClock, CalendarPlus, Bell, Check,
  BarChart3, Download, Printer, ChevronRight,
} from "lucide-react";

export const HOJE = "2026-07-02";
export const SETORES = ["Copy", "BackEnd", "Financeiro", "RH", "Gestão", "Afiliados", "Dados",
  "Tecnologia", "Funil", "Tráfego", "Reembolso", "AudioVisual", "Suporte ao Cliente", "Produto"];

export const seed = [
  { id: "c1", tipo: "colaborador", status: "ativo", nome: "ANDRÉ SANTOS", cpf: "123.456.789-00", cnpj: "", nomeCnpj: "", nascimento: "1994-07-08", telefone: "(11) 99999-0001", email: "andre@xmx.com", endereco: "Rua A, 100 - São Paulo/SP", pix: "andre@xmx.com", banco: "Nubank", agencia: "0001", conta: "12345-6", tipoConta: "Corrente", discordId: "andre#1234", admissao: "2024-02-10", setor: "Tráfego", cargo: "Gestor de Tráfego", salario: 4500, plano: "Trilha para Coordenador em 12 meses", ehMae: false, possuiFilhos: true, qtdFilhos: 2, obs: "" },
  { id: "c2", tipo: "colaborador", status: "ativo", nome: "BEATRIZ LIMA", cpf: "234.567.890-11", cnpj: "", nomeCnpj: "", nascimento: "1998-03-21", telefone: "(11) 99999-0002", email: "bia@xmx.com", endereco: "Rua B, 200 - São Paulo/SP", pix: "234.567.890-11", banco: "Itaú", agencia: "1234", conta: "56789-0", tipoConta: "Corrente", discordId: "bia#4321", admissao: "2023-08-15", setor: "Copy", cargo: "Copywriter", salario: 3200, plano: "", ehMae: true, possuiFilhos: true, qtdFilhos: 1, obs: "Enviar lembrete no Dia das Mães." },
  { id: "c3", tipo: "prestador", status: "ativo", nome: "CARLOS MOTA", cpf: "345.678.901-22", cnpj: "39.665.201/0001-30", nomeCnpj: "Carlos Mota Dados ME", nascimento: "1990-11-02", telefone: "(21) 98888-0003", email: "carlos@dados.com", endereco: "Av. C, 300 - Rio de Janeiro/RJ", pix: "39.665.201/0001-30", banco: "Inter", agencia: "0001", conta: "99887-1", tipoConta: "Corrente", discordId: "carlos#7777", admissao: "2025-01-20", setor: "Dados", cargo: "Analista de Dados (PJ)", salario: 6000, plano: "", ehMae: false, possuiFilhos: false, qtdFilhos: 0, obs: "" },
  { id: "c4", tipo: "colaborador", status: "ativo", nome: "DANIELA ROCHA", cpf: "456.789.012-33", cnpj: "", nomeCnpj: "", nascimento: "1992-07-25", telefone: "(31) 97777-0004", email: "dani@xmx.com", endereco: "Rua D, 400 - Belo Horizonte/MG", pix: "dani@xmx.com", banco: "Bradesco", agencia: "2233", conta: "44556-7", tipoConta: "Poupança", discordId: "dani#2020", admissao: "2022-05-03", setor: "RH", cargo: "Analista de RH", salario: 3800, plano: "Especialização em DP", ehMae: false, possuiFilhos: false, qtdFilhos: 0, obs: "" },
  { id: "c5", tipo: "colaborador", status: "desligado", nome: "EDUARDO PINTO", cpf: "567.890.123-44", cnpj: "", nomeCnpj: "", nascimento: "1988-05-14", telefone: "(11) 96666-0005", email: "edu@xmx.com", endereco: "Rua E, 500 - São Paulo/SP", pix: "", banco: "Santander", agencia: "3344", conta: "77889-0", tipoConta: "Corrente", discordId: "", admissao: "2021-03-01", setor: "Funil", cargo: "Especialista em Funil", salario: 5200, plano: "", ehMae: false, possuiFilhos: true, qtdFilhos: 3, obs: "Desligado em 05/2026.", desligadoEm: "2026-05-20", motivoDesligamento: "Desligamento a pedido do colaborador" },
  { id: "c6", tipo: "prestador", status: "ativo", nome: "FERNANDA DIAS", cpf: "678.901.234-55", cnpj: "55.108.334/0001-72", nomeCnpj: "Fernanda Dias Filmes", nascimento: "1996-09-30", telefone: "(41) 95555-0006", email: "fe@filmes.com", endereco: "Rua F, 600 - Curitiba/PR", pix: "55.108.334/0001-72", banco: "Caixa", agencia: "0100", conta: "11223-3", tipoConta: "Corrente", discordId: "fe#9090", admissao: "2024-11-11", setor: "AudioVisual", cargo: "Editora de Vídeo (PJ)", salario: 4800, plano: "", ehMae: true, possuiFilhos: true, qtdFilhos: 2, obs: "" },
];

/* ---------- helpers ---------- */
export const brl = (v) => (v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const idade = (nasc) => {
  if (!nasc) return "";
  const [y, m, d] = nasc.split("-").map(Number);
  const [ty, tm, td] = HOJE.split("-").map(Number);
  let a = ty - y;
  if (tm < m || (tm === m && td < d)) a--;
  return a;
};
export const mesDia = (nasc) => (nasc ? nasc.slice(5) : "");
export const primeiro = (n) => n.split(" ")[0];
export const dmy = (s) => { if (!s) return ""; const [y, m, d] = s.split("-"); return `${d}/${m}/${y}`; };

/* ---------- tipos de evento (linha do tempo) ---------- */
export const EVENTOS = {
  admissao:           { label: "Admissão",            icon: LogIn,          cor: "#1D9E75" },
  alteracao_salarial: { label: "Alteração salarial",  icon: TrendingUp,     cor: "#378ADD" },
  promocao:           { label: "Promoção",            icon: Award,          cor: "#7F77DD" },
  mudanca_setor:      { label: "Mudança de setor",    icon: ArrowRightLeft, cor: "#D4537E" },
  ferias:             { label: "Férias",              icon: Plane,          cor: "#378ADD" },
  advertencia:        { label: "Advertência",         icon: AlertTriangle,  cor: "#BA7517" },
  desligamento:       { label: "Desligamento",        icon: LogOut,         cor: "#A83226" },
  reativacao:         { label: "Reativação",          icon: RotateCcw,      cor: "#1D9E75" },
};
export const TIPOS_MANUAIS = ["advertencia", "ferias", "promocao", "mudanca_setor", "alteracao_salarial"];

export const seedEventos = [
  { id: "e1", colaboradorId: "c1", tipo: "admissao", data: "2024-02-10", descricao: "Admitido como Gestor de Tráfego" },
  { id: "e2", colaboradorId: "c1", tipo: "alteracao_salarial", data: "2024-08-01", descricao: "Salário de R$ 4.000,00 para R$ 4.500,00" },
  { id: "e3", colaboradorId: "c1", tipo: "ferias", data: "2025-07-15", descricao: "Férias (15 dias)" },
  { id: "e4", colaboradorId: "c2", tipo: "admissao", data: "2023-08-15", descricao: "Admitida como Copywriter" },
  { id: "e5", colaboradorId: "c2", tipo: "promocao", data: "2025-01-10", descricao: "Promovida a Copywriter Sênior" },
  { id: "e6", colaboradorId: "c4", tipo: "admissao", data: "2022-05-03", descricao: "Admitida no setor de Gestão" },
  { id: "e7", colaboradorId: "c4", tipo: "mudanca_setor", data: "2024-03-01", descricao: "Setor de Gestão para RH" },
  { id: "e8", colaboradorId: "c5", tipo: "admissao", data: "2021-03-01", descricao: "Admitido como Especialista em Funil" },
  { id: "e9", colaboradorId: "c5", tipo: "advertencia", data: "2026-02-10", descricao: "Advertência verbal por atraso recorrente" },
  { id: "e10", colaboradorId: "c5", tipo: "desligamento", data: "2026-05-20", descricao: "Desligado a pedido" },
  { id: "e11", colaboradorId: "c3", tipo: "admissao", data: "2025-01-20", descricao: "Início da prestação (PJ)" },
  { id: "e12", colaboradorId: "c6", tipo: "admissao", data: "2024-11-11", descricao: "Início da prestação (PJ)" },
];

/* ---------- Financeiro: config e dados ---------- */
export const EMPRESA = { nome: "XMX Marketing Ltda", cnpj: "42.918.077/0001-55" };
export const FORMAS = ["PIX", "Transferência", "Boleto", "Dinheiro"];
export const STATUS_PAG = {
  pendente:  { label: "Pendente",  bg: "#FBF1DA", ink: "#8A6410" },
  realizado: { label: "Realizado", bg: "#E3F2E6", ink: "#256B3B" },
};
export const STATUS_NOTA = {
  pendente:  { label: "Pendente",  bg: "#FBF1DA", ink: "#8A6410" },
  aprovada:  { label: "Aprovada",  bg: "#E3F2E6", ink: "#256B3B" },
  rejeitada: { label: "Rejeitada", bg: "#FAE7E4", ink: "#A83226" },
  paga:      { label: "Paga",      bg: "#E2F0F3", ink: "#0F6577" },
};

export const seedPagamentos = [
  { id: "p1", colaboradorId: "c1", competencia: "2026-06", valor: 4500, dataPagamento: "2026-06-05", forma: "PIX", obs: "Salário", status: "realizado" },
  { id: "p2", colaboradorId: "c2", competencia: "2026-06", valor: 3200, dataPagamento: "2026-06-05", forma: "PIX", obs: "Salário", status: "realizado" },
  { id: "p3", colaboradorId: "c3", competencia: "2026-06", valor: 6000, dataPagamento: "2026-06-10", forma: "PIX", obs: "Prestação de serviço", status: "realizado" },
  { id: "p4", colaboradorId: "c1", competencia: "2026-07", valor: 4500, dataPagamento: "", forma: "PIX", obs: "Salário", status: "pendente" },
  { id: "p5", colaboradorId: "c4", competencia: "2026-07", valor: 3800, dataPagamento: "", forma: "PIX", obs: "Salário", status: "pendente" },
  { id: "p6", colaboradorId: "c6", competencia: "2026-07", valor: 4800, dataPagamento: "", forma: "PIX", obs: "Prestação de serviço", status: "pendente" },
];

export const seedNotas = [
  { id: "nf1", colaboradorId: "c3", setor: "Dados", numero: "000142", competencia: "2026-06", valor: 6000, descricao: "Análise de dados", arquivo: "nfse-000142.pdf", status: "pendente", enviadaEm: "2026-06-28" },
  { id: "nf2", colaboradorId: "c6", setor: "AudioVisual", numero: "000087", competencia: "2026-06", valor: 4800, descricao: "Edição de vídeos", arquivo: "nfse-000087.pdf", status: "aprovada", enviadaEm: "2026-06-25" },
  { id: "nf3", colaboradorId: "c3", setor: "Dados", numero: "000138", competencia: "2026-05", valor: 6000, descricao: "Análise de dados", arquivo: "nfse-000138.pdf", status: "paga", enviadaEm: "2026-06-05" },
  { id: "nf4", colaboradorId: "c6", setor: "AudioVisual", numero: "000081", competencia: "2026-05", valor: 4800, descricao: "Edição de vídeos", arquivo: "nfse-000081.pdf", status: "rejeitada", enviadaEm: "2026-06-02" },
];

/* ---------- Documentos: categorias e dados ---------- */
export const CATEGORIAS = {
  contrato:     { label: "Contrato de admissão", icon: FileSignature, destaque: true,  assinavel: true },
  pessoais:     { label: "Documentos pessoais",  icon: FileText,      destaque: false, assinavel: false },
  comprovantes: { label: "Comprovantes",         icon: Receipt,       destaque: false, assinavel: false },
  termos:       { label: "Termos assinados",     icon: FileCheck,     destaque: false, assinavel: true },
  outros:       { label: "Outros anexos",        icon: Paperclip,     destaque: false, assinavel: false },
};
export const seedDocumentos = [
  { id: "d1", colaboradorId: "c1", categoria: "contrato", nome: "CONTRATO_ADMISSAO_ANDRE.pdf", enviadoEm: "2024-02-10", assinado: true },
  { id: "d2", colaboradorId: "c1", categoria: "pessoais", nome: "RG_ANDRE.pdf", enviadoEm: "2024-02-10", assinado: null },
  { id: "d3", colaboradorId: "c1", categoria: "comprovantes", nome: "COMPROVANTE_RESIDENCIA.pdf", enviadoEm: "2024-02-11", assinado: null },
  { id: "d4", colaboradorId: "c2", categoria: "contrato", nome: "CONTRATO_ADMISSAO_BEATRIZ.pdf", enviadoEm: "2023-08-15", assinado: true },
  { id: "d5", colaboradorId: "c4", categoria: "contrato", nome: "CONTRATO_ADMISSAO_DANIELA.pdf", enviadoEm: "2022-05-03", assinado: false },
  { id: "d6", colaboradorId: "c3", categoria: "contrato", nome: "CONTRATO_PRESTACAO_CARLOS.pdf", enviadoEm: "2025-01-20", assinado: true },
  { id: "d7", colaboradorId: "c3", categoria: "outros", nome: "CARTAO_CNPJ.pdf", enviadoEm: "2025-01-20", assinado: null },
];

/* ---------- Férias: helpers, status e dados ---------- */
export const addAnos = (s, n) => { const [y, m, d] = s.split("-"); return `${Number(y) + n}-${m}-${d}`; };
export const anosCompletos = (adm) => {
  if (!adm) return 0;
  const [ay, am, ad] = adm.split("-").map(Number);
  const [hy, hm, hd] = HOJE.split("-").map(Number);
  let a = hy - ay;
  if (hm < am || (hm === am && hd < ad)) a--;
  return a;
};
export const diasEntre = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);

export const STATUS_FERIAS = {
  aquisicao:  { label: "Em período aquisitivo",        bg: "#EFEEE9", ink: "#6C6E78" },
  dentro:     { label: "Dentro do prazo",              bg: "#E3F2E6", ink: "#256B3B" },
  programar:  { label: "Período ideal para programar", bg: "#E2F0F3", ink: "#0F6577" },
  vencimento: { label: "Próximo do vencimento",        bg: "#FBF1DA", ink: "#8A6410" },
  vencidas:   { label: "Férias vencidas",              bg: "#FAE7E4", ink: "#A83226" },
};

export function computeFerias(colaborador, rec) {
  const anos = anosCompletos(colaborador.admissao);
  const temDireito = anos >= 1;
  const aqInicio = addAnos(colaborador.admissao, Math.max(anos - 1, 0));
  const aqFim = addAnos(colaborador.admissao, Math.max(anos, 1));
  const concLimite = addAnos(aqFim, 1);
  const diasDireito = 30;
  const saldo = rec.saldo;
  const diasUtil = diasDireito - saldo;
  const dLimite = diasEntre(HOJE, concLimite);
  let status;
  if (!temDireito) status = "aquisicao";
  else if (saldo <= 0) status = "dentro";
  else if (dLimite < 0) status = "vencidas";
  else if (dLimite <= 90) status = "vencimento";
  else status = "programar";
  return { anos, temDireito, aqInicio, aqFim, concLimite, diasDireito, saldo, diasUtil, dLimite, status };
}

export const seedFerias = {
  c1: { saldo: 15, movimentos: [{ id: "fm1", data: "2025-07-15", dias: 15, obs: "Férias de julho", saldoApos: 15 }] },
  c4: { saldo: 20, movimentos: [{ id: "fm2", data: "2026-01-10", dias: 10, obs: "Recesso de janeiro", saldoApos: 20 }] },
};
export const getFerias = (ferias, id) => ferias[id] || { saldo: 30, movimentos: [] };

/* ---------- Feriados & Escala: config e dados ---------- */
export const REGRAS = {
  folga:    { label: "Folga", sub: "não trabalha",        icon: Coffee,        cor: "#6C6E78", bg: "#EFEEE9" },
  normal:   { label: "Trabalha e recebe", sub: "hora normal", icon: DollarSign, cor: "#256B3B", bg: "#E3F2E6" },
  compensa: { label: "Compensa em outro dia", sub: "folga", icon: CalendarClock, cor: "#8A6410", bg: "#FBF1DA" },
};
export const seedFeriados = [
  { id: "h1", data: "2026-07-09", nome: "Revolução Constitucionalista", abrangencia: "Estadual", uf: "SP" },
  { id: "h2", data: "2026-09-07", nome: "Independência do Brasil", abrangencia: "Nacional", uf: "" },
  { id: "h3", data: "2026-10-12", nome: "Nossa Senhora Aparecida", abrangencia: "Nacional", uf: "" },
  { id: "h4", data: "2026-11-20", nome: "Consciência Negra", abrangencia: "Nacional", uf: "" },
];
export const seedEscala = {
  h2: { c1: "folga", c2: "normal", c3: "normal", c4: "compensa" },
};
export const getRegra = (escala, feriadoId, colaboradorId) => (escala[feriadoId] || {})[colaboradorId] || "folga";

/* ---------- Checklists: templates e dados ---------- */
export const CHECKLIST_ADMISSAO = [
  { id: "a1", label: "Contrato de admissão assinado" },
  { id: "a2", label: "Dados bancários cadastrados" },
  { id: "a3", label: "Documentos pessoais enviados" },
  { id: "a4", label: "Acesso ao Discord criado" },
  { id: "a5", label: "Equipamentos entregues" },
  { id: "a6", label: "Treinamento inicial realizado" },
];
export const CHECKLIST_DESLIGAMENTO = [
  { id: "x1", label: "Aviso / rescisão processado" },
  { id: "x2", label: "Acessos revogados" },
  { id: "x3", label: "Equipamentos devolvidos" },
  { id: "x4", label: "Documentos de rescisão enviados" },
  { id: "x5", label: "Pagamentos finais quitados" },
];
export const seedChecklists = {
  c1: { admissao: { a1: true, a2: true, a3: true, a4: true, a5: true, a6: false }, desligamento: {} },
  c5: { admissao: { a1: true, a2: true, a3: true, a4: true, a5: true, a6: true }, desligamento: { x1: true, x2: true, x3: false, x4: true, x5: false } },
};
export const getChecks = (checklists, id) => checklists[id] || { admissao: {}, desligamento: {} };

/* ---------- Controle de acessos por perfil ---------- */
export const seedContas = [
  { email: "admin@xmx.com", senha: "123", nome: "Ana Ribeiro", role: "admin" },
  { email: "rh@xmx.com", senha: "123", nome: "Equipe RH", role: "rh" },
  { email: "financeiro@xmx.com", senha: "123", nome: "Equipe Financeiro", role: "financeiro" },
  { email: "andre@xmx.com", senha: "123", nome: "André Santos", role: "gestor", setor: "Tráfego", colaboradorId: "c1" },
  { email: "bia@xmx.com", senha: "123", nome: "Beatriz Lima", role: "colaborador", colaboradorId: "c2" },
];
export const ROLE_LABEL = { admin: "Admin", financeiro: "Financeiro", rh: "RH", gestor: "Gestor", colaborador: "Colaborador" };
export const NAV_PERM = {
  dashboard: ["admin", "financeiro", "rh", "gestor"],
  colaboradores: ["admin", "financeiro", "rh", "gestor", "colaborador"],
  financeiro: ["admin", "financeiro"],
  ferias: ["admin", "rh", "gestor"],
  documentos: ["admin", "rh"],
  escala: ["admin", "rh", "gestor"],
  lembretes: ["admin", "financeiro", "rh"],
  indicadores: ["admin", "financeiro", "rh"],
  config: ["admin"],
};
export const podeVerSensivel = (role) => ["admin", "financeiro", "rh"].includes(role);
export const podeEditarCadastro = (role) => ["admin", "rh"].includes(role);
export const escopoColaboradores = (colaboradores, perfil) => {
  if (perfil.role === "gestor") return colaboradores.filter((c) => c.setor === perfil.setor);
  if (perfil.role === "colaborador") return colaboradores.filter((c) => c.id === perfil.colaboradorId);
  return colaboradores;
};
export const MATRIZ_ACESSO = [
  ["Ver dashboard", { admin: 1, financeiro: 1, rh: 1, gestor: 1, colaborador: 0 }],
  ["Cadastrar / editar colaborador", { admin: 1, financeiro: 0, rh: 1, gestor: 0, colaborador: 0 }],
  ["Ver salário e dados bancários", { admin: 1, financeiro: 1, rh: 1, gestor: 0, colaborador: 0 }],
  ["Gerir férias", { admin: 1, financeiro: 0, rh: 1, gestor: 0, colaborador: 0 }],
  ["Pagamentos e notas fiscais", { admin: 1, financeiro: 1, rh: 0, gestor: 0, colaborador: 0 }],
  ["Documentos", { admin: 1, financeiro: 0, rh: 1, gestor: 0, colaborador: 0 }],
  ["Feriados e escala", { admin: 1, financeiro: 0, rh: 1, gestor: 1, colaborador: 0 }],
  ["Configurar acessos", { admin: 1, financeiro: 0, rh: 0, gestor: 0, colaborador: 0 }],
];

/* ---------- Lembretes automáticos: motor ---------- */
export const seedComemorativas = [
  { data: "2026-07-26", nome: "Dia dos Avós" },
  { data: "2026-08-09", nome: "Dia dos Pais" },
  { data: "2026-09-15", nome: "Dia do Cliente" },
];
export const LEMBRETE = {
  ferias_venc:  { icon: AlertTriangle, cor: "#BA7517", prio: 1 },
  financeira:   { icon: Wallet,        cor: "#256B3B", prio: 2 },
  documento:    { icon: FileText,      cor: "#A83226", prio: 3 },
  aniversario:  { icon: Cake,          cor: "#D85A30", prio: 4 },
  ferias_prox:  { icon: Plane,         cor: "#378ADD", prio: 5 },
  comemorativa: { icon: PartyPopper,   cor: "#D4537E", prio: 6 },
  cadastro:     { icon: UserCheck,     cor: "#7F77DD", prio: 7 },
};
export function diasAteAniversario(nasc) {
  if (!nasc) return 999;
  const md = nasc.slice(5);
  const [hy] = HOJE.split("-");
  let alvo = `${hy}-${md}`;
  if (alvo < HOJE) alvo = `${Number(hy) + 1}-${md}`;
  return diasEntre(HOJE, alvo);
}
export function gerarLembretes({ colaboradores, ferias, notas, pagamentos, documentos }) {
  const L = [];
  const ativos = colaboradores.filter((c) => c.status === "ativo");
  ativos.forEach((c) => {
    const d = diasAteAniversario(c.nascimento);
    if (d >= 0 && d <= 7) L.push({ id: "an" + c.id, tipo: "aniversario", titulo: `Aniversário de ${c.nome}`, sub: d === 0 ? "é hoje!" : `em ${d} dia(s)`, colaboradorId: c.id });
  });
  ativos.forEach((c) => {
    const info = computeFerias(c, getFerias(ferias, c.id));
    if (info.status === "vencimento" || info.status === "vencidas")
      L.push({ id: "fv" + c.id, tipo: "ferias_venc", titulo: `Férias ${info.status === "vencidas" ? "vencidas" : "vencendo"} — ${c.nome}`, sub: `limite ${dmy(info.concLimite)}`, colaboradorId: c.id });
  });
  Object.entries(ferias).forEach(([cid, rec]) => {
    rec.movimentos.forEach((m) => {
      if (m.data >= HOJE && diasEntre(HOJE, m.data) <= 30) {
        const c = colaboradores.find((x) => x.id === cid);
        L.push({ id: "fp" + m.id, tipo: "ferias_prox", titulo: `Férias de ${c ? c.nome : ""}`, sub: `início ${dmy(m.data)}`, colaboradorId: cid });
      }
    });
  });
  const pPend = pagamentos.filter((p) => p.status === "pendente").length;
  if (pPend) L.push({ id: "pf1", tipo: "financeira", titulo: `${pPend} pagamento(s) pendente(s)`, sub: "aguardando registro" });
  const nPend = notas.filter((n) => n.status === "pendente").length;
  if (nPend) L.push({ id: "pf2", tipo: "financeira", titulo: `${nPend} nota(s) fiscal(is) para conferir`, sub: "pendentes de análise" });
  const semAss = documentos.filter((d) => CATEGORIAS[d.categoria] && CATEGORIAS[d.categoria].assinavel && d.assinado === false).length;
  if (semAss) L.push({ id: "doc1", tipo: "documento", titulo: `${semAss} contrato(s) aguardando assinatura`, sub: "documentos" });
  ativos.forEach((c) => {
    const faltando = [!c.email && "e-mail", !c.telefone && "telefone", !c.pix && "Pix"].filter(Boolean);
    if (faltando.length) L.push({ id: "cad" + c.id, tipo: "cadastro", titulo: `Cadastro de ${c.nome} incompleto`, sub: `falta: ${faltando.join(", ")}`, colaboradorId: c.id });
  });
  seedComemorativas.forEach((dc, i) => {
    if (dc.data >= HOJE && diasEntre(HOJE, dc.data) <= 30) L.push({ id: "dc" + i, tipo: "comemorativa", titulo: dc.nome, sub: dmy(dc.data) });
  });
  return L.sort((a, b) => LEMBRETE[a.tipo].prio - LEMBRETE[b.tipo].prio);
}

