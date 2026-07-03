import { useState } from "react";
import {
  LayoutDashboard, Users, Wallet, Plane, FolderClosed, CalendarDays, Settings,
  Search, Plus, Cake, Gift, Clock, Receipt, BadgeCheck, FileText, Megaphone,
  PartyPopper, ArrowLeft, Briefcase, UserCheck, AlertTriangle,
  LogIn, LogOut, TrendingUp, Award, ArrowRightLeft,
  FileSignature, FileCheck, Paperclip, Star, Eye, UserX, RotateCcw,
} from "lucide-react";

/* ---------- tokens ---------- */
const C = {
  bg: "#F6F6F3", surface: "#FFFFFF", ink: "#1B1C22", muted: "#6C6E78", faint: "#9A9CA6",
  border: "#E6E5E0", borderStrong: "#D6D5CE", blurple: "#5865F2",
  ativoBg: "#E3F2E6", ativoInk: "#256B3B", desligBg: "#FAE7E4", desligInk: "#A83226",
};
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const HOJE = "2026-07-02";
const SETORES = ["Copy", "BackEnd", "Financeiro", "RH", "Gestão", "Afiliados", "Dados",
  "Tecnologia", "Funil", "Tráfego", "Reembolso", "AudioVisual", "Suporte ao Cliente", "Produto"];

const seed = [
  { id: "c1", tipo: "colaborador", status: "ativo", nome: "ANDRÉ SANTOS", cpf: "123.456.789-00", cnpj: "", nomeCnpj: "", nascimento: "1994-07-08", telefone: "(11) 99999-0001", email: "andre@xmx.com", endereco: "Rua A, 100 - São Paulo/SP", pix: "andre@xmx.com", banco: "Nubank", agencia: "0001", conta: "12345-6", tipoConta: "Corrente", discordId: "andre#1234", admissao: "2024-02-10", setor: "Tráfego", cargo: "Gestor de Tráfego", salario: 4500, plano: "Trilha para Coordenador em 12 meses", ehMae: false, possuiFilhos: true, qtdFilhos: 2, obs: "" },
  { id: "c2", tipo: "colaborador", status: "ativo", nome: "BEATRIZ LIMA", cpf: "234.567.890-11", cnpj: "", nomeCnpj: "", nascimento: "1998-03-21", telefone: "(11) 99999-0002", email: "bia@xmx.com", endereco: "Rua B, 200 - São Paulo/SP", pix: "234.567.890-11", banco: "Itaú", agencia: "1234", conta: "56789-0", tipoConta: "Corrente", discordId: "bia#4321", admissao: "2023-08-15", setor: "Copy", cargo: "Copywriter", salario: 3200, plano: "", ehMae: true, possuiFilhos: true, qtdFilhos: 1, obs: "Enviar lembrete no Dia das Mães." },
  { id: "c3", tipo: "prestador", status: "ativo", nome: "CARLOS MOTA", cpf: "345.678.901-22", cnpj: "39.665.201/0001-30", nomeCnpj: "Carlos Mota Dados ME", nascimento: "1990-11-02", telefone: "(21) 98888-0003", email: "carlos@dados.com", endereco: "Av. C, 300 - Rio de Janeiro/RJ", pix: "39.665.201/0001-30", banco: "Inter", agencia: "0001", conta: "99887-1", tipoConta: "Corrente", discordId: "carlos#7777", admissao: "2025-01-20", setor: "Dados", cargo: "Analista de Dados (PJ)", salario: 6000, plano: "", ehMae: false, possuiFilhos: false, qtdFilhos: 0, obs: "" },
  { id: "c4", tipo: "colaborador", status: "ativo", nome: "DANIELA ROCHA", cpf: "456.789.012-33", cnpj: "", nomeCnpj: "", nascimento: "1992-07-25", telefone: "(31) 97777-0004", email: "dani@xmx.com", endereco: "Rua D, 400 - Belo Horizonte/MG", pix: "dani@xmx.com", banco: "Bradesco", agencia: "2233", conta: "44556-7", tipoConta: "Poupança", discordId: "dani#2020", admissao: "2022-05-03", setor: "RH", cargo: "Analista de RH", salario: 3800, plano: "Especialização em DP", ehMae: false, possuiFilhos: false, qtdFilhos: 0, obs: "" },
  { id: "c5", tipo: "colaborador", status: "desligado", nome: "EDUARDO PINTO", cpf: "567.890.123-44", cnpj: "", nomeCnpj: "", nascimento: "1988-05-14", telefone: "(11) 96666-0005", email: "edu@xmx.com", endereco: "Rua E, 500 - São Paulo/SP", pix: "", banco: "Santander", agencia: "3344", conta: "77889-0", tipoConta: "Corrente", discordId: "", admissao: "2021-03-01", setor: "Funil", cargo: "Especialista em Funil", salario: 5200, plano: "", ehMae: false, possuiFilhos: true, qtdFilhos: 3, obs: "Desligado em 05/2026.", desligadoEm: "2026-05-20", motivoDesligamento: "Desligamento a pedido do colaborador" },
  { id: "c6", tipo: "prestador", status: "ativo", nome: "FERNANDA DIAS", cpf: "678.901.234-55", cnpj: "55.108.334/0001-72", nomeCnpj: "Fernanda Dias Filmes", nascimento: "1996-09-30", telefone: "(41) 95555-0006", email: "fe@filmes.com", endereco: "Rua F, 600 - Curitiba/PR", pix: "55.108.334/0001-72", banco: "Caixa", agencia: "0100", conta: "11223-3", tipoConta: "Corrente", discordId: "fe#9090", admissao: "2024-11-11", setor: "AudioVisual", cargo: "Editora de Vídeo (PJ)", salario: 4800, plano: "", ehMae: true, possuiFilhos: true, qtdFilhos: 2, obs: "" },
];

/* ---------- helpers ---------- */
const brl = (v) => (v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const idade = (nasc) => {
  if (!nasc) return "";
  const [y, m, d] = nasc.split("-").map(Number);
  const [ty, tm, td] = HOJE.split("-").map(Number);
  let a = ty - y;
  if (tm < m || (tm === m && td < d)) a--;
  return a;
};
const mesDia = (nasc) => (nasc ? nasc.slice(5) : "");
const primeiro = (n) => n.split(" ")[0];
const dmy = (s) => { if (!s) return ""; const [y, m, d] = s.split("-"); return `${d}/${m}/${y}`; };

/* ---------- tipos de evento (linha do tempo) ---------- */
const EVENTOS = {
  admissao:           { label: "Admissão",            icon: LogIn,          cor: "#1D9E75" },
  alteracao_salarial: { label: "Alteração salarial",  icon: TrendingUp,     cor: "#378ADD" },
  promocao:           { label: "Promoção",            icon: Award,          cor: "#7F77DD" },
  mudanca_setor:      { label: "Mudança de setor",    icon: ArrowRightLeft, cor: "#D4537E" },
  ferias:             { label: "Férias",              icon: Plane,          cor: "#378ADD" },
  advertencia:        { label: "Advertência",         icon: AlertTriangle,  cor: "#BA7517" },
  desligamento:       { label: "Desligamento",        icon: LogOut,         cor: "#A83226" },
  reativacao:         { label: "Reativação",          icon: RotateCcw,      cor: "#1D9E75" },
};
const TIPOS_MANUAIS = ["advertencia", "ferias", "promocao", "mudanca_setor", "alteracao_salarial"];

const seedEventos = [
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
const EMPRESA = { nome: "XMX Marketing Ltda", cnpj: "42.918.077/0001-55" };
const FORMAS = ["PIX", "Transferência", "Boleto", "Dinheiro"];
const STATUS_PAG = {
  pendente:  { label: "Pendente",  bg: "#FBF1DA", ink: "#8A6410" },
  realizado: { label: "Realizado", bg: "#E3F2E6", ink: "#256B3B" },
};
const STATUS_NOTA = {
  pendente:  { label: "Pendente",  bg: "#FBF1DA", ink: "#8A6410" },
  aprovada:  { label: "Aprovada",  bg: "#E3F2E6", ink: "#256B3B" },
  rejeitada: { label: "Rejeitada", bg: "#FAE7E4", ink: "#A83226" },
  paga:      { label: "Paga",      bg: "#E2F0F3", ink: "#0F6577" },
};

const seedPagamentos = [
  { id: "p1", colaboradorId: "c1", competencia: "2026-06", valor: 4500, dataPagamento: "2026-06-05", forma: "PIX", obs: "Salário", status: "realizado" },
  { id: "p2", colaboradorId: "c2", competencia: "2026-06", valor: 3200, dataPagamento: "2026-06-05", forma: "PIX", obs: "Salário", status: "realizado" },
  { id: "p3", colaboradorId: "c3", competencia: "2026-06", valor: 6000, dataPagamento: "2026-06-10", forma: "PIX", obs: "Prestação de serviço", status: "realizado" },
  { id: "p4", colaboradorId: "c1", competencia: "2026-07", valor: 4500, dataPagamento: "", forma: "PIX", obs: "Salário", status: "pendente" },
  { id: "p5", colaboradorId: "c4", competencia: "2026-07", valor: 3800, dataPagamento: "", forma: "PIX", obs: "Salário", status: "pendente" },
  { id: "p6", colaboradorId: "c6", competencia: "2026-07", valor: 4800, dataPagamento: "", forma: "PIX", obs: "Prestação de serviço", status: "pendente" },
];

const seedNotas = [
  { id: "nf1", colaboradorId: "c3", setor: "Dados", numero: "000142", competencia: "2026-06", valor: 6000, descricao: "Análise de dados", arquivo: "nfse-000142.pdf", status: "pendente", enviadaEm: "2026-06-28" },
  { id: "nf2", colaboradorId: "c6", setor: "AudioVisual", numero: "000087", competencia: "2026-06", valor: 4800, descricao: "Edição de vídeos", arquivo: "nfse-000087.pdf", status: "aprovada", enviadaEm: "2026-06-25" },
  { id: "nf3", colaboradorId: "c3", setor: "Dados", numero: "000138", competencia: "2026-05", valor: 6000, descricao: "Análise de dados", arquivo: "nfse-000138.pdf", status: "paga", enviadaEm: "2026-06-05" },
  { id: "nf4", colaboradorId: "c6", setor: "AudioVisual", numero: "000081", competencia: "2026-05", valor: 4800, descricao: "Edição de vídeos", arquivo: "nfse-000081.pdf", status: "rejeitada", enviadaEm: "2026-06-02" },
];

/* ---------- Documentos: categorias e dados ---------- */
const CATEGORIAS = {
  contrato:     { label: "Contrato de admissão", icon: FileSignature, destaque: true,  assinavel: true },
  pessoais:     { label: "Documentos pessoais",  icon: FileText,      destaque: false, assinavel: false },
  comprovantes: { label: "Comprovantes",         icon: Receipt,       destaque: false, assinavel: false },
  termos:       { label: "Termos assinados",     icon: FileCheck,     destaque: false, assinavel: true },
  outros:       { label: "Outros anexos",        icon: Paperclip,     destaque: false, assinavel: false },
};
const seedDocumentos = [
  { id: "d1", colaboradorId: "c1", categoria: "contrato", nome: "CONTRATO_ADMISSAO_ANDRE.pdf", enviadoEm: "2024-02-10", assinado: true },
  { id: "d2", colaboradorId: "c1", categoria: "pessoais", nome: "RG_ANDRE.pdf", enviadoEm: "2024-02-10", assinado: null },
  { id: "d3", colaboradorId: "c1", categoria: "comprovantes", nome: "COMPROVANTE_RESIDENCIA.pdf", enviadoEm: "2024-02-11", assinado: null },
  { id: "d4", colaboradorId: "c2", categoria: "contrato", nome: "CONTRATO_ADMISSAO_BEATRIZ.pdf", enviadoEm: "2023-08-15", assinado: true },
  { id: "d5", colaboradorId: "c4", categoria: "contrato", nome: "CONTRATO_ADMISSAO_DANIELA.pdf", enviadoEm: "2022-05-03", assinado: false },
  { id: "d6", colaboradorId: "c3", categoria: "contrato", nome: "CONTRATO_PRESTACAO_CARLOS.pdf", enviadoEm: "2025-01-20", assinado: true },
  { id: "d7", colaboradorId: "c3", categoria: "outros", nome: "CARTAO_CNPJ.pdf", enviadoEm: "2025-01-20", assinado: null },
];

/* ---------- UI base ---------- */
function Card({ children, style }) {
  return <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, ...style }}>{children}</div>;
}
function Btn({ children, onClick, variant = "primary", disabled, style }) {
  const v = { primary: { bg: C.blurple, ink: "#fff", bd: C.blurple }, ghost: { bg: "#fff", ink: C.ink, bd: C.borderStrong } }[variant];
  return (
    <button className="btn" onClick={onClick} disabled={disabled}
      style={{ display: "inline-flex", alignItems: "center", gap: 7, background: v.bg, color: v.ink,
        border: `1px solid ${v.bd}`, borderRadius: 10, padding: "9px 14px", fontSize: 13.5, fontWeight: 500,
        fontFamily: SANS, opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto", ...style }}>{children}</button>
  );
}
function Field({ label, children, span }) {
  return (
    <label style={{ display: "block", gridColumn: span ? "1 / -1" : "auto" }}>
      <span style={{ display: "block", fontSize: 12, color: C.muted, fontWeight: 500, marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}
function Avatar({ nome, size = 38 }) {
  const ini = nome.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "#8B8D97", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 600, flexShrink: 0 }}>{ini}</div>
  );
}
function StatusPill({ status }) {
  const on = status === "ativo";
  return (
    <span style={{ background: on ? C.ativoBg : C.desligBg, color: on ? C.ativoInk : C.desligInk,
      fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 999 }}>{on ? "Ativo" : "Desligado"}</span>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ colaboradores, pagamentos = [], notas = [] }) {
  const ativos = colaboradores.filter((c) => c.tipo === "colaborador" && c.status === "ativo").length;
  const prestadores = colaboradores.filter((c) => c.tipo === "prestador" && c.status === "ativo").length;
  const aniMes = colaboradores.filter((c) => mesDia(c.nascimento).slice(0, 2) === "07");
  const aniSemana = colaboradores.filter((c) => {
    const md = mesDia(c.nascimento);
    return md >= "07-02" && md <= "07-09";
  });
  const pagPend = pagamentos.filter((p) => p.status === "pendente").length;
  const pagFeitos = pagamentos.filter((p) => p.status === "realizado").length;
  const notasPend = notas.filter((n) => n.status === "pendente").length;

  const cards = [
    { icon: Users, v: ativos, l: "Colaboradores ativos", c: "#5865F2" },
    { icon: Briefcase, v: prestadores, l: "Prestadores ativos", c: "#1D9E75" },
    { icon: Cake, v: aniSemana.length, l: "Aniversariantes da semana", c: "#D85A30" },
    { icon: Gift, v: aniMes.length, l: "Aniversariantes do mês", c: "#D4537E" },
    { icon: Plane, v: 15, l: "Próximas férias", c: "#378ADD" },
    { icon: AlertTriangle, v: 8, l: "Férias vencendo", c: "#BA7517" },
    { icon: Clock, v: pagPend, l: "Pagamentos pendentes", c: "#BA7517" },
    { icon: BadgeCheck, v: pagFeitos, l: "Pagamentos realizados", c: "#1D9E75" },
    { icon: FileText, v: notasPend, l: "Notas fiscais pendentes", c: "#7F77DD" },
    { icon: Megaphone, v: 3, l: "Avisos importantes", c: "#D85A30" },
    { icon: PartyPopper, v: 5, l: "Datas comemorativas", c: "#D4537E" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Dashboard</h1>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "0 0 22px" }}>Visão geral de pessoas, RH e financeiro.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
        {cards.map((k, i) => {
          const Icon = k.icon;
          return (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: k.c + "1A",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon size={18} color={k.c} />
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, fontFamily: MONO, lineHeight: 1 }}>{k.v}</div>
              <div style={{ fontSize: 12.5, color: C.muted, marginTop: 4 }}>{k.l}</div>
            </Card>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 22 }} className="g2">
        <Card style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Cake size={16} color="#D85A30" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Aniversariantes do mês</span>
          </div>
          {aniMes.length === 0 && <div style={{ fontSize: 13, color: C.muted }}>Ninguém este mês.</div>}
          {aniMes.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
              <Avatar nome={c.nome} size={30} />
              <span style={{ fontSize: 13.5, flex: 1 }}>{c.nome}</span>
              <span style={{ fontSize: 12.5, color: C.muted, fontFamily: MONO }}>{mesDia(c.nascimento).replace("-", "/")}</span>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Megaphone size={16} color="#D85A30" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Avisos importantes</span>
          </div>
          {["3 contratos aguardando assinatura", "2 férias vencem em 30 dias", "6 notas fiscais para conferir"].map((a, i) => (
            <div key={i} style={{ fontSize: 13.5, color: C.ink, padding: "7px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>{a}</div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ---------- Lista de colaboradores ---------- */
function Lista({ colaboradores, onNovo, onAbrir }) {
  const [busca, setBusca] = useState("");
  const [fSetor, setFSetor] = useState("Todos");
  const [aba, setAba] = useState("ativos");
  const inp = { fontFamily: SANS, fontSize: 13, color: C.ink, background: "#fff",
    border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "8px 10px" };

  const nAtivos = colaboradores.filter((c) => c.status === "ativo").length;
  const nArquivo = colaboradores.filter((c) => c.status === "desligado").length;

  const base = colaboradores.filter((c) => (aba === "ativos" ? c.status === "ativo" : c.status === "desligado"));
  const filtrados = base.filter((c) => {
    const q = busca.toLowerCase();
    const bate = !q || [c.nome, c.cpf, c.cnpj, c.cargo, c.setor, c.banco, c.email, c.telefone].some((v) => (v || "").toLowerCase().includes(q));
    return bate && (fSetor === "Todos" || c.setor === fSetor);
  });

  const Seg = ({ id, label }) => (
    <button className="btn" onClick={() => setAba(id)} style={{ border: "none", cursor: "pointer", fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 8, background: aba === id ? "#fff" : "transparent", color: aba === id ? C.ink : C.muted, boxShadow: aba === id ? "0 1px 2px rgba(0,0,0,.08)" : "none" }}>{label}</button>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Colaboradores</h1>
        {aba === "ativos" && <Btn onClick={onNovo}><Plus size={16} /> Novo colaborador</Btn>}
      </div>

      <div style={{ display: "inline-flex", background: "#EEEDE7", borderRadius: 10, padding: 3, marginBottom: 16 }}>
        <Seg id="ativos" label={`Ativos (${nAtivos})`} />
        <Seg id="arquivo" label={`Arquivo morto (${nArquivo})`} />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "0 10px", flex: "1 1 240px" }}>
          <Search size={16} color={C.faint} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome, CPF, cargo, setor, banco…" style={{ ...inp, border: "none", padding: "9px 0", flex: 1, outline: "none" }} />
        </div>
        <select style={inp} value={fSetor} onChange={(e) => setFSetor(e.target.value)}>
          <option>Todos</option>{SETORES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {filtrados.length === 0 && (
          <Card style={{ padding: 22, fontSize: 13.5, color: C.muted }}>
            {aba === "ativos" ? "Nenhum colaborador ativo com esses filtros." : "Arquivo morto vazio."}
          </Card>
        )}
        {filtrados.map((c) => (
          <Card key={c.id} className="row" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", flexWrap: "wrap" }}>
            <div onClick={() => onAbrir(c)} style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 240px", minWidth: 0 }}>
              <Avatar nome={c.nome} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{c.nome}</div>
                <div style={{ fontSize: 12.5, color: C.muted }}>{c.cargo} · {c.setor}{c.tipo === "prestador" ? " · PJ" : ""}</div>
              </div>
            </div>
            {aba === "ativos"
              ? <div style={{ fontFamily: MONO, fontSize: 13.5, color: C.ink }}>{brl(c.salario)}</div>
              : <div style={{ fontSize: 12.5, color: C.faint }}>Desligado em {dmy(c.desligadoEm)}</div>}
            <StatusPill status={c.status} />
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------- Formulário de cadastro ---------- */
function Cadastro({ inicial, onSalvar, onVoltar, embed }) {
  const [f, setF] = useState(inicial || {
    tipo: "colaborador", status: "ativo", nome: "", cpf: "", cnpj: "", nomeCnpj: "", nascimento: "",
    telefone: "", email: "", endereco: "", pix: "", banco: "", agencia: "", conta: "", tipoConta: "Corrente",
    discordId: "", admissao: "", setor: "", cargo: "", salario: "", plano: "", ehMae: false, possuiFilhos: false, qtdFilhos: 0, obs: "",
  });
  const set = (k, v) => setF({ ...f, [k]: v });
  const ok = f.nome.trim() && f.cpf.trim();
  const inp = "inp";
  const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 };

  const Toggle = ({ val, on, off, onChange }) => (
    <div style={{ display: "inline-flex", background: "#EEEDE7", borderRadius: 9, padding: 3 }}>
      {[[true, on], [false, off]].map(([v, label]) => (
        <button key={String(v)} className="btn" onClick={() => onChange(v)}
          style={{ border: "none", cursor: "pointer", fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: "6px 16px",
            borderRadius: 7, background: val === v ? "#fff" : "transparent", color: val === v ? C.ink : C.muted,
            boxShadow: val === v ? "0 1px 2px rgba(0,0,0,.08)" : "none" }}>{label}</button>
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: 720 }}>
      {!embed && (
        <>
          <button className="btn" onClick={onVoltar} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 13, fontFamily: SANS, padding: 0, marginBottom: 14 }}>
            <ArrowLeft size={15} /> Voltar
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <Avatar nome={f.nome || "N N"} size={52} />
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{inicial ? f.nome : "Novo colaborador"}</h1>
              <div style={{ fontSize: 13, color: C.muted }}>{idade(f.nascimento) !== "" ? `${idade(f.nascimento)} anos` : "cadastro"}</div>
            </div>
          </div>
        </>
      )}

      <Card style={{ padding: 22, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Dados pessoais</h2>
        <div style={grid} className="g2">
          <Field label="Nome completo (maiúsculo)" span>
            <input className={inp} value={f.nome} onChange={(e) => set("nome", e.target.value.toUpperCase())} placeholder="NOME SOBRENOME" />
          </Field>
          <Field label="CPF"><input className={inp} value={f.cpf} onChange={(e) => set("cpf", e.target.value)} placeholder="000.000.000-00" /></Field>
          <Field label="CNPJ (quando houver)"><input className={inp} value={f.cnpj} onChange={(e) => set("cnpj", e.target.value)} placeholder="00.000.000/0000-00" /></Field>
          <Field label="Nome vinculado ao CNPJ" span><input className={inp} value={f.nomeCnpj} onChange={(e) => set("nomeCnpj", e.target.value)} placeholder="Razão social (se diferente)" /></Field>
          <Field label="Data de nascimento"><input className={inp} type="date" value={f.nascimento} onChange={(e) => set("nascimento", e.target.value)} /></Field>
          <Field label="Idade (automática)">
            <div style={{ padding: "9px 11px", border: `1px solid ${C.border}`, borderRadius: 10, background: "#F4F3EF", fontSize: 13.5, color: C.muted }}>{idade(f.nascimento) !== "" ? `${idade(f.nascimento)} anos` : "—"}</div>
          </Field>
          <Field label="Telefone"><input className={inp} value={f.telefone} onChange={(e) => set("telefone", e.target.value)} placeholder="(00) 00000-0000" /></Field>
          <Field label="E-mail"><input className={inp} value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="email@empresa.com" /></Field>
          <Field label="Endereço completo" span><input className={inp} value={f.endereco} onChange={(e) => set("endereco", e.target.value)} placeholder="Rua, número - cidade/UF" /></Field>
          <Field label="Discord ID"><input className={inp} value={f.discordId} onChange={(e) => set("discordId", e.target.value)} placeholder="usuario#0000" /></Field>
        </div>
        <div style={{ height: 1, background: C.border, margin: "18px 0" }} />
        <div style={{ fontSize: 12.5, color: C.muted, fontWeight: 500, marginBottom: 12 }}>Dados bancários</div>
        <div style={grid} className="g2">
          <Field label="Chave Pix"><input className={inp} value={f.pix} onChange={(e) => set("pix", e.target.value)} /></Field>
          <Field label="Banco"><input className={inp} value={f.banco} onChange={(e) => set("banco", e.target.value)} /></Field>
          <Field label="Agência"><input className={inp} value={f.agencia} onChange={(e) => set("agencia", e.target.value)} /></Field>
          <Field label="Conta"><input className={inp} value={f.conta} onChange={(e) => set("conta", e.target.value)} /></Field>
          <Field label="Tipo da conta">
            <select className={inp} value={f.tipoConta} onChange={(e) => set("tipoConta", e.target.value)}><option>Corrente</option><option>Poupança</option></select>
          </Field>
        </div>
      </Card>

      <Card style={{ padding: 22, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Dados profissionais</h2>
        <div style={grid} className="g2">
          <Field label="Tipo">
            <select className={inp} value={f.tipo} onChange={(e) => set("tipo", e.target.value)}><option value="colaborador">Colaborador</option><option value="prestador">Prestador (PJ)</option></select>
          </Field>
          <Field label="Data de admissão"><input className={inp} type="date" value={f.admissao} onChange={(e) => set("admissao", e.target.value)} /></Field>
          <Field label="Setor">
            <select className={inp} value={f.setor} onChange={(e) => set("setor", e.target.value)}><option value="">Selecionar…</option>{SETORES.map((s) => <option key={s}>{s}</option>)}</select>
          </Field>
          <Field label="Cargo / Função"><input className={inp} value={f.cargo} onChange={(e) => set("cargo", e.target.value)} /></Field>
          <Field label="Salário atual (R$)"><input className={inp} value={f.salario} inputMode="decimal" onChange={(e) => set("salario", e.target.value.replace(",", "."))} placeholder="0,00" /></Field>
          <Field label="Status">
            <div style={{ paddingTop: 2 }}><Toggle val={f.status === "ativo"} on="Ativo" off="Desligado" onChange={(v) => set("status", v ? "ativo" : "desligado")} /></div>
          </Field>
          <Field label="Plano de desenvolvimento / carreira" span>
            <input className={inp} value={f.plano} onChange={(e) => set("plano", e.target.value)} placeholder="Ex: trilha para coordenador em 12 meses" />
          </Field>
        </div>
        <div style={{ fontSize: 11.5, color: C.faint, marginTop: 12 }}>Histórico salarial e de promoções são gerados automaticamente a cada mudança (Fase 2).</div>
      </Card>

      <Card style={{ padding: 22, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Benefícios e informações</h2>
        <div style={grid} className="g2">
          <Field label="É mãe?"><div style={{ paddingTop: 2 }}><Toggle val={f.ehMae} on="Sim" off="Não" onChange={(v) => set("ehMae", v)} /></div></Field>
          <Field label="Possui filhos?"><div style={{ paddingTop: 2 }}><Toggle val={f.possuiFilhos} on="Sim" off="Não" onChange={(v) => set("possuiFilhos", v)} /></div></Field>
          {f.possuiFilhos && (
            <Field label="Quantos filhos?"><input className={inp} type="number" min="0" value={f.qtdFilhos} onChange={(e) => set("qtdFilhos", e.target.value)} /></Field>
          )}
          <Field label="Observações importantes" span>
            <input className={inp} value={f.obs} onChange={(e) => set("obs", e.target.value)} placeholder="Ex: lembrete de Dia das Mães" />
          </Field>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 10 }}>
        <Btn onClick={() => onSalvar({ ...f, salario: parseFloat(f.salario) || 0, qtdFilhos: Number(f.qtdFilhos) || 0 })} disabled={!ok}>Salvar colaborador</Btn>
        <Btn variant="ghost" onClick={onVoltar}>Cancelar</Btn>
      </div>
    </div>
  );
}

/* ---------- Ficha do colaborador (Histórico + Dados + Documentos) ---------- */
function Ficha({ colaborador: c, eventos, documentos, onSalvar, onAddEvento, onUploadDoc, onAssinarDoc, onVerDoc, onDesligar, onReativar, onVoltar }) {
  const [tab, setTab] = useState("historico");
  const [add, setAdd] = useState(false);
  const [ev, setEv] = useState({ tipo: "advertencia", data: HOJE, descricao: "" });
  const [deslig, setDeslig] = useState(false);
  const [dl, setDl] = useState({ data: HOJE, motivo: "" });
  const ordenados = [...eventos].sort((a, b) => b.data.localeCompare(a.data));

  const TabBtn = ({ id, label }) => (
    <button className="btn" onClick={() => setTab(id)}
      style={{ background: "none", border: "none", borderBottom: `2px solid ${tab === id ? C.blurple : "transparent"}`,
        color: tab === id ? C.ink : C.muted, fontSize: 14, fontWeight: 500, padding: "8px 2px", cursor: "pointer", fontFamily: SANS }}>{label}</button>
  );

  return (
    <div style={{ maxWidth: 720 }}>
      <button className="btn" onClick={onVoltar} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 13, fontFamily: SANS, padding: 0, marginBottom: 14 }}>
        <ArrowLeft size={15} /> Voltar
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <Avatar nome={c.nome} size={52} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{c.nome}</h1>
          <div style={{ fontSize: 13, color: C.muted }}>{c.cargo} · {c.setor}{c.tipo === "prestador" ? " · PJ" : ""}</div>
        </div>
        <StatusPill status={c.status} />
        {c.status === "ativo" && (
          <Btn variant="ghost" onClick={() => setDeslig(!deslig)}><UserX size={15} /> Desligar</Btn>
        )}
      </div>

      {c.status === "desligado" && (
        <Card style={{ padding: "14px 16px", marginBottom: 18, background: "#FAE7E4", borderColor: "#EDC9C3", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <UserX size={18} color={C.desligInk} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: C.desligInk }}>Desligado em {dmy(c.desligadoEm)}</div>
            {c.motivoDesligamento && <div style={{ fontSize: 12.5, color: "#8A5049" }}>{c.motivoDesligamento}</div>}
          </div>
          <Btn variant="ghost" onClick={() => onReativar(c.id)}><RotateCcw size={14} /> Reativar</Btn>
        </Card>
      )}

      {deslig && c.status === "ativo" && (
        <Card style={{ padding: 16, marginBottom: 18, borderColor: "#EDC9C3" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Desligar {primeiro(c.nome)}</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 14 }}>A pessoa sai da lista de ativos e vai para o Arquivo Morto, com todo o histórico preservado.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
            <Field label="Data do desligamento"><input className="inp" type="date" value={dl.data} onChange={(e) => setDl({ ...dl, data: e.target.value })} /></Field>
            <Field label="Motivo" span><input className="inp" value={dl.motivo} onChange={(e) => setDl({ ...dl, motivo: e.target.value })} placeholder="Ex: pedido de demissão, término de contrato…" /></Field>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="btn" onClick={() => { onDesligar(c.id, dl); setDeslig(false); }} style={{ background: C.desligBg, color: C.desligInk, border: "1px solid transparent", borderRadius: 10, padding: "9px 14px", fontSize: 13.5, fontWeight: 500, fontFamily: SANS, cursor: "pointer" }}>Confirmar desligamento</button>
            <Btn variant="ghost" onClick={() => setDeslig(false)}>Cancelar</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", gap: 22, borderBottom: `1px solid ${C.border}`, marginBottom: 18 }}>
        <TabBtn id="historico" label={`Histórico (${eventos.length})`} />
        <TabBtn id="documentos" label={`Documentos (${documentos.length})`} />
        <TabBtn id="dados" label="Dados" />
      </div>

      {tab === "historico" ? (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <Btn variant="ghost" onClick={() => setAdd(!add)}><Plus size={15} /> Adicionar evento</Btn>
          </div>
          {add && (
            <Card style={{ padding: 16, marginBottom: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
                <Field label="Tipo">
                  <select className="inp" value={ev.tipo} onChange={(e) => setEv({ ...ev, tipo: e.target.value })}>
                    {TIPOS_MANUAIS.map((t) => <option key={t} value={t}>{EVENTOS[t].label}</option>)}
                  </select>
                </Field>
                <Field label="Data"><input className="inp" type="date" value={ev.data} onChange={(e) => setEv({ ...ev, data: e.target.value })} /></Field>
                <Field label="Descrição" span><input className="inp" value={ev.descricao} onChange={(e) => setEv({ ...ev, descricao: e.target.value })} placeholder="O que aconteceu" /></Field>
              </div>
              <div style={{ marginTop: 12 }}>
                <Btn disabled={!ev.descricao.trim()} onClick={() => { onAddEvento(c.id, ev); setEv({ tipo: "advertencia", data: HOJE, descricao: "" }); setAdd(false); }}>Registrar</Btn>
              </div>
            </Card>
          )}
          <Card style={{ padding: 20 }}>
            {ordenados.length === 0 && <div style={{ fontSize: 13.5, color: C.muted }}>Sem eventos ainda.</div>}
            {ordenados.map((e, i) => {
              const cfg = EVENTOS[e.tipo] || EVENTOS.advertencia; const Icon = cfg.icon;
              return (
                <div key={e.id} style={{ display: "flex", gap: 12 }}>
                  <div style={{ position: "relative", width: 28, flexShrink: 0 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: cfg.cor + "1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={15} color={cfg.cor} />
                    </div>
                    {i < ordenados.length - 1 && <div style={{ position: "absolute", left: 13, top: 28, bottom: -6, width: 2, background: C.border }} />}
                  </div>
                  <div style={{ paddingBottom: 18, flex: 1 }}>
                    <div style={{ fontSize: 12, color: C.faint, fontFamily: MONO }}>{dmy(e.data)}</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{cfg.label}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{e.descricao}</div>
                  </div>
                </div>
              );
            })}
          </Card>
        </>
      ) : tab === "documentos" ? (
        <DocumentosTab colaborador={c} documentos={documentos} onUpload={onUploadDoc} onAssinar={onAssinarDoc} onVer={onVerDoc} />
      ) : (
        <Cadastro inicial={c} embed onSalvar={(d) => { onSalvar(d); setTab("historico"); }} onVoltar={() => setTab("historico")} />
      )}
    </div>
  );
}

/* ---------- Visualizador de nota (NFS-e) ---------- */
function NotaViewer({ nota, emitente, onClose }) {
  const mesRef = (s) => { const [y, m] = s.split("-"); return `${m}/${y}`; };
  const razao = emitente.nomeCnpj || emitente.nome;
  const chave = ("35" + nota.competencia.replace("-", "") + nota.numero + (emitente.cnpj || "").replace(/\D/g, "")).padEnd(44, "0").slice(0, 44);
  const dado = (label, valor) => (
    <div style={{ marginBottom: 3 }}>
      <span style={{ fontSize: 11, color: "#6C6E78" }}>{label}: </span>
      <span style={{ fontSize: 11.5, color: "#1B1C22" }}>{valor}</span>
    </div>
  );
  const Bloco = ({ titulo, children }) => (
    <div style={{ border: "1px solid #D9D8D2", borderRadius: 6, padding: "10px 12px", marginTop: 8 }}>
      <div style={{ fontSize: 9.5, letterSpacing: 0.6, textTransform: "uppercase", color: "#8A8B93", marginBottom: 4 }}>{titulo}</div>
      {children}
    </div>
  );
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,20,24,.55)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflowY: "auto", zIndex: 50 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 480, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${C.border}`, background: "#FAFAF8" }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: C.ink, fontFamily: MONO }}>{nota.arquivo}</span>
          <button className="btn" onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: C.muted, cursor: "pointer", lineHeight: 1, padding: 4 }}>×</button>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ border: "1px solid #C9C8C2", borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1.5px solid #1B1C22", paddingBottom: 10, marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: C.ink }}>NFS-e</div>
                <div style={{ fontSize: 10, color: C.muted }}>Nota Fiscal de Serviço Eletrônica</div>
              </div>
              <div style={{ textAlign: "right", fontFamily: MONO }}>
                <div style={{ fontSize: 11, color: C.ink }}>Nº {nota.numero}</div>
                <div style={{ fontSize: 10.5, color: C.muted }}>Comp. {mesRef(nota.competencia)}</div>
                <div style={{ fontSize: 10.5, color: C.muted }}>Emissão {dmy(nota.enviadaEm)}</div>
              </div>
            </div>
            <Bloco titulo="Prestador de serviços (MEI/PJ)">
              {dado("Razão social", razao)}
              {dado("CNPJ", emitente.cnpj || "—")}
            </Bloco>
            <Bloco titulo="Tomador de serviços">
              {dado("Razão social", EMPRESA.nome)}
              {dado("CNPJ", EMPRESA.cnpj)}
            </Bloco>
            <Bloco titulo="Discriminação dos serviços">
              <div style={{ fontSize: 11.5, color: "#1B1C22" }}>{nota.descricao} — {nota.setor}</div>
            </Bloco>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 10, borderTop: "1.5px solid #1B1C22" }}>
              <div style={{ fontSize: 10.5, color: C.muted }}>ISS retido: R$ 0,00</div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 11, color: C.muted }}>Valor líquido </span>
                <span style={{ fontSize: 17, fontWeight: 600, color: C.ink, fontFamily: MONO }}>{brl(nota.valor)}</span>
              </div>
            </div>
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #D9D8D2" }}>
              <div style={{ fontSize: 9, color: "#9A9CA6", wordBreak: "break-all", fontFamily: MONO }}>Chave de acesso: {chave}</div>
            </div>
          </div>
          <p style={{ fontSize: 11.5, color: C.faint, textAlign: "center", margin: "12px 0 0" }}>Pré-visualização simulada. Na versão real, abre o PDF/XML anexado.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Módulo Financeiro ---------- */
function Financeiro({ colaboradores, pagamentos, notas, onRegistrar, onNovoPagamento, onNotaStatus, onVerNota }) {
  const [tab, setTab] = useState("pagamentos");
  const [fPag, setFPag] = useState("Todos");
  const [fNota, setFNota] = useState("Todos");
  const [add, setAdd] = useState(false);
  const [np, setNp] = useState({ colaboradorId: "", competencia: "", valor: "", forma: "PIX", obs: "" });
  const mesRef = (s) => { if (!s) return ""; const [y, m] = s.split("-"); return `${m}/${y}`; };
  const nomeDe = (id) => (colaboradores.find((c) => c.id === id) || {}).nome || "—";

  const aPagar = pagamentos.filter((p) => p.status === "pendente").reduce((s, p) => s + p.valor, 0);
  const pagos = pagamentos.filter((p) => p.status === "realizado").length;
  const notasPend = notas.filter((n) => n.status === "pendente").length;

  const Stat = ({ label, value }) => (
    <Card style={{ padding: "14px 18px", flex: "1 1 150px" }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 19, fontWeight: 600, color: C.ink, fontFamily: MONO }}>{value}</div>
    </Card>
  );
  const TabBtn = ({ id, label }) => (
    <button className="btn" onClick={() => setTab(id)} style={{ background: "none", border: "none", borderBottom: `2px solid ${tab === id ? C.blurple : "transparent"}`, color: tab === id ? C.ink : C.muted, fontSize: 14, fontWeight: 500, padding: "8px 2px", cursor: "pointer", fontFamily: SANS }}>{label}</button>
  );
  const Badge = ({ cfg }) => <span style={{ background: cfg.bg, color: cfg.ink, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>{cfg.label}</span>;
  const SetorChip = ({ s }) => <span style={{ fontFamily: MONO, fontSize: 12, color: C.ink, background: "#EFEEE9", border: `1px solid ${C.border}`, padding: "2px 8px", borderRadius: 6 }}>{s}</span>;

  const pagFiltrados = pagamentos.filter((p) => fPag === "Todos" || p.status === fPag).sort((a, b) => b.competencia.localeCompare(a.competencia));
  const notasFiltradas = notas.filter((n) => fNota === "Todos" || n.status === fNota).sort((a, b) => b.enviadaEm.localeCompare(a.enviadaEm));
  const npOk = np.colaboradorId && np.valor && !isNaN(parseFloat(np.valor)) && np.competencia;
  const sel = { fontFamily: SANS, fontSize: 13, color: C.ink, background: "#fff", border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "7px 9px" };

  return (
    <div style={{ maxWidth: 780 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Financeiro</h1>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "0 0 18px" }}>Pagamentos e notas fiscais, ligados a cada colaborador.</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <Stat label="A pagar" value={brl(aPagar)} />
        <Stat label="Pagamentos realizados" value={pagos} />
        <Stat label="Notas a conferir" value={notasPend} />
      </div>

      <div style={{ display: "flex", gap: 22, borderBottom: `1px solid ${C.border}`, marginBottom: 18 }}>
        <TabBtn id="pagamentos" label="Histórico de pagamentos" />
        <TabBtn id="notas" label={`Notas fiscais${notasPend ? ` (${notasPend})` : ""}`} />
      </div>

      {tab === "pagamentos" ? (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
            <select style={sel} value={fPag} onChange={(e) => setFPag(e.target.value)}>
              <option value="Todos">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="realizado">Realizado</option>
            </select>
            <div style={{ marginLeft: "auto" }}><Btn variant="ghost" onClick={() => setAdd(!add)}><Plus size={15} /> Novo pagamento</Btn></div>
          </div>

          {add && (
            <Card style={{ padding: 16, marginBottom: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
                <Field label="Colaborador">
                  <select className="inp" value={np.colaboradorId} onChange={(e) => setNp({ ...np, colaboradorId: e.target.value })}>
                    <option value="">Selecionar…</option>{colaboradores.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                  </select>
                </Field>
                <Field label="Competência"><input className="inp" type="month" value={np.competencia} onChange={(e) => setNp({ ...np, competencia: e.target.value })} /></Field>
                <Field label="Valor (R$)"><input className="inp" value={np.valor} inputMode="decimal" onChange={(e) => setNp({ ...np, valor: e.target.value.replace(",", ".") })} placeholder="0,00" /></Field>
                <Field label="Forma"><select className="inp" value={np.forma} onChange={(e) => setNp({ ...np, forma: e.target.value })}>{FORMAS.map((x) => <option key={x}>{x}</option>)}</select></Field>
                <Field label="Observações" span><input className="inp" value={np.obs} onChange={(e) => setNp({ ...np, obs: e.target.value })} placeholder="Ex: salário, adiantamento…" /></Field>
              </div>
              <div style={{ marginTop: 12 }}>
                <Btn disabled={!npOk} onClick={() => { onNovoPagamento({ ...np, valor: parseFloat(np.valor) }); setNp({ colaboradorId: "", competencia: "", valor: "", forma: "PIX", obs: "" }); setAdd(false); }}>Adicionar como pendente</Btn>
              </div>
            </Card>
          )}

          <div style={{ display: "grid", gap: 8 }}>
            {pagFiltrados.length === 0 && <Card style={{ padding: 20, fontSize: 13.5, color: C.muted }}>Nenhum pagamento com esse filtro.</Card>}
            {pagFiltrados.map((p) => (
              <Card key={p.id} style={{ padding: "13px 16px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 500 }}>{nomeDe(p.colaboradorId)}</div>
                  <div style={{ fontSize: 12, color: C.faint }}>comp. {mesRef(p.competencia)} · {p.forma}{p.status === "realizado" && p.dataPagamento ? ` · pago em ${dmy(p.dataPagamento)}` : ""}{p.obs ? ` · ${p.obs}` : ""}</div>
                </div>
                <div style={{ fontFamily: MONO, fontSize: 14, color: C.ink }}>{brl(p.valor)}</div>
                <Badge cfg={STATUS_PAG[p.status]} />
                {p.status === "pendente" && <Btn onClick={() => onRegistrar(p.id)}>Registrar pagamento</Btn>}
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <select style={sel} value={fNota} onChange={(e) => setFNota(e.target.value)}>
              <option value="Todos">Todos os status</option>
              {Object.keys(STATUS_NOTA).map((k) => <option key={k} value={k}>{STATUS_NOTA[k].label}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {notasFiltradas.length === 0 && <Card style={{ padding: 20, fontSize: 13.5, color: C.muted }}>Nenhuma nota com esse filtro.</Card>}
            {notasFiltradas.map((n) => (
              <Card key={n.id} style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 500 }}>{nomeDe(n.colaboradorId)}</div>
                    <div style={{ fontSize: 12, color: C.faint }}>Nota nº {n.numero} · comp. {mesRef(n.competencia)}</div>
                  </div>
                  <SetorChip s={n.setor} />
                  <div style={{ fontFamily: MONO, fontSize: 14.5, minWidth: 90, textAlign: "right" }}>{brl(n.valor)}</div>
                  <Badge cfg={STATUS_NOTA[n.status]} />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  <Btn variant="ghost" onClick={() => onVerNota(n)}><FileText size={15} /> Ver nota</Btn>
                  {n.status === "pendente" && (<>
                    <Btn onClick={() => onNotaStatus(n.id, "aprovada")}>Aprovar</Btn>
                    <Btn variant="ghost" onClick={() => onNotaStatus(n.id, "rejeitada")}>Rejeitar</Btn>
                  </>)}
                  {n.status === "aprovada" && <Btn onClick={() => onNotaStatus(n.id, "paga")}>Marcar como paga</Btn>}
                  {(n.status === "rejeitada" || n.status === "paga") && <Btn variant="ghost" onClick={() => onNotaStatus(n.id, "pendente")}>Reabrir</Btn>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Visualizador de documento ---------- */
function DocViewer({ doc, colaborador, onClose }) {
  const cat = CATEGORIAS[doc.categoria] || {};
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,20,24,.55)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflowY: "auto", zIndex: 50 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 460, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${C.border}`, background: "#FAFAF8" }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: C.ink, fontFamily: MONO }}>{doc.nome}</span>
          <button className="btn" onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: C.muted, cursor: "pointer", lineHeight: 1, padding: 4 }}>×</button>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ border: "1px solid #C9C8C2", borderRadius: 8, padding: 20, minHeight: 260, background: "#FCFCFB", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase", color: "#8A8B93" }}>{cat.label}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.ink, marginTop: 6 }}>{doc.nome.replace(/\.[^.]+$/, "").replace(/_/g, " ")}</div>
            <div style={{ fontSize: 12.5, color: C.muted, marginTop: 4 }}>{colaborador.nome} · enviado em {dmy(doc.enviadoEm)}</div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: C.faint, fontSize: 12.5, textAlign: "center", padding: "24px 0" }}>
              Pré-visualização simulada.<br />Na versão real, abre o PDF anexado.
            </div>
            {cat.assinavel && (
              <div style={{ paddingTop: 12, borderTop: `1px solid ${C.border}`, fontSize: 12.5, color: doc.assinado ? C.ativoInk : "#8A6410" }}>
                {doc.assinado ? "✓ Documento assinado" : "Aguardando assinatura"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Aba Documentos (dentro da ficha) ---------- */
function DocumentosTab({ colaborador, documentos, onUpload, onAssinar, onVer }) {
  const ordem = ["contrato", "pessoais", "comprovantes", "termos", "outros"];
  const UploadBtn = ({ categoria }) => (
    <label className="btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${C.borderStrong}`, background: "#fff", borderRadius: 9, padding: "6px 11px", cursor: "pointer", fontSize: 12.5, color: C.ink }}>
      <Paperclip size={14} /> Enviar
      <input type="file" style={{ display: "none" }} onChange={(e) => { const n = e.target.files[0]?.name; if (n) onUpload(colaborador.id, categoria, n); e.target.value = ""; }} />
    </label>
  );

  const DocRow = ({ d }) => {
    const cat = CATEGORIAS[d.categoria];
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
        <FileText size={16} color={C.faint} />
        <button className="btn" onClick={() => onVer(d)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: MONO, fontSize: 12.5, color: C.blurple, textAlign: "left", flex: "1 1 160px", minWidth: 0 }}>{d.nome}</button>
        <span style={{ fontSize: 12, color: C.faint }}>enviado {dmy(d.enviadoEm)}</span>
        {cat.assinavel && (
          <span style={{ fontSize: 11.5, fontWeight: 500, color: d.assinado ? C.ativoInk : "#8A6410", background: d.assinado ? C.ativoBg : "#FBF1DA", padding: "2px 9px", borderRadius: 999 }}>
            {d.assinado ? "Assinado" : "Pendente"}
          </span>
        )}
        {cat.assinavel && (
          <Btn variant="ghost" onClick={() => onAssinar(d.id)}>{d.assinado ? "Desmarcar" : "Marcar assinado"}</Btn>
        )}
        <Btn variant="ghost" onClick={() => onVer(d)}><Eye size={14} /> Ver</Btn>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {ordem.map((catId) => {
        const cat = CATEGORIAS[catId];
        const Icon = cat.icon;
        const docs = documentos.filter((d) => d.categoria === catId);
        return (
          <Card key={catId} style={{ padding: 16, ...(cat.destaque ? { borderColor: "#D7D4F5", background: "#FBFBFE" } : {}) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: docs.length ? 4 : 0 }}>
              <Icon size={16} color={cat.destaque ? C.blurple : C.muted} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{cat.label}</span>
              {cat.destaque && <Star size={13} color="#E0A500" fill="#E0A500" />}
              <span style={{ marginLeft: "auto" }}><UploadBtn categoria={catId} /></span>
            </div>
            {docs.length === 0 && <div style={{ fontSize: 12.5, color: C.faint, paddingTop: 8 }}>Nenhum documento nesta categoria.</div>}
            {docs.map((d) => <DocRow key={d.id} d={d} />)}
          </Card>
        );
      })}
    </div>
  );
}

/* ---------- Documentos (visão global no menu) ---------- */
function DocumentosGlobal({ colaboradores, documentos, onVer }) {
  const [fCat, setFCat] = useState("Todos");
  const [busca, setBusca] = useState("");
  const nomeDe = (id) => (colaboradores.find((c) => c.id === id) || {}).nome || "—";
  const semAssinatura = documentos.filter((d) => CATEGORIAS[d.categoria]?.assinavel && d.assinado === false);
  const sel = { fontFamily: SANS, fontSize: 13, color: C.ink, background: "#fff", border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "8px 10px" };

  const lista = documentos
    .filter((d) => fCat === "Todos" || d.categoria === fCat)
    .filter((d) => { const q = busca.toLowerCase(); return !q || d.nome.toLowerCase().includes(q) || nomeDe(d.colaboradorId).toLowerCase().includes(q); })
    .sort((a, b) => b.enviadoEm.localeCompare(a.enviadoEm));

  return (
    <div style={{ maxWidth: 780 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Documentos</h1>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "0 0 16px" }}>Todos os documentos, por colaborador e categoria.</p>

      {semAssinatura.length > 0 && (
        <Card style={{ padding: "12px 16px", marginBottom: 16, background: "#FBF1DA", borderColor: "#EAD9A8", display: "flex", alignItems: "center", gap: 10 }}>
          <AlertTriangle size={16} color="#8A6410" />
          <span style={{ fontSize: 13.5, color: "#8A6410" }}>{semAssinatura.length} contrato(s) aguardando assinatura.</span>
        </Card>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "0 10px", flex: "1 1 220px" }}>
          <Search size={16} color={C.faint} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por colaborador ou arquivo…" style={{ border: "none", padding: "9px 0", flex: 1, outline: "none", fontFamily: SANS, fontSize: 13 }} />
        </div>
        <select style={sel} value={fCat} onChange={(e) => setFCat(e.target.value)}>
          <option value="Todos">Todas as categorias</option>
          {Object.keys(CATEGORIAS).map((k) => <option key={k} value={k}>{CATEGORIAS[k].label}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {lista.length === 0 && <Card style={{ padding: 20, fontSize: 13.5, color: C.muted }}>Nenhum documento com esse filtro.</Card>}
        {lista.map((d) => {
          const cat = CATEGORIAS[d.categoria];
          return (
            <Card key={d.id} style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{nomeDe(d.colaboradorId)}</div>
                <button className="btn" onClick={() => onVer(d)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: MONO, fontSize: 12, color: C.blurple }}>{d.nome}</button>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 11.5, color: C.ink, background: "#EFEEE9", border: `1px solid ${C.border}`, padding: "2px 8px", borderRadius: 6 }}>{cat.label}</span>
              {cat.assinavel && <span style={{ fontSize: 11.5, fontWeight: 500, color: d.assinado ? C.ativoInk : "#8A6410" }}>{d.assinado ? "Assinado" : "Pendente"}</span>}
              <Btn variant="ghost" onClick={() => onVer(d)}><Eye size={14} /> Ver</Btn>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Placeholder de módulos das próximas fases ---------- */
function EmBreve({ titulo, fase, feito }) {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 6px" }}>{titulo}</h1>
      <Card style={{ padding: 30, textAlign: "center", marginTop: 8 }}>
        <div style={{ fontSize: 14, color: C.muted }}>
          {feito
            ? "Este módulo já foi prototipado (o portal de notas fiscais) e entra aqui na integração."
            : `Módulo da ${fase}. Entra depois que a base de colaboradores estiver validada.`}
        </div>
      </Card>
    </div>
  );
}

/* ---------- Shell / App ---------- */
export default function App() {
  const [colaboradores, setColaboradores] = useState(seed);
  const [eventos, setEventos] = useState(seedEventos);
  const [modulo, setModulo] = useState("dashboard");
  const [novo, setNovo] = useState(false);
  const [detalheId, setDetalheId] = useState(null);
  const [pagamentos, setPagamentos] = useState(seedPagamentos);
  const [notas, setNotas] = useState(seedNotas);
  const [viewNota, setViewNota] = useState(null);
  const [documentos, setDocumentos] = useState(seedDocumentos);
  const [viewDoc, setViewDoc] = useState(null);

  function addDocumento(colaboradorId, categoria, nome) {
    const assinado = CATEGORIAS[categoria]?.assinavel ? false : null;
    setDocumentos((ds) => [{ id: "d" + Date.now(), colaboradorId, categoria, nome, enviadoEm: HOJE, assinado }, ...ds]);
  }
  function assinarDoc(id) {
    setDocumentos((ds) => ds.map((d) => (d.id === id ? { ...d, assinado: !d.assinado } : d)));
  }

  function registrarPagamento(id) {
    setPagamentos((ps) => ps.map((p) => (p.id === id ? { ...p, status: "realizado", dataPagamento: HOJE } : p)));
  }
  function novoPagamento(dados) {
    setPagamentos((ps) => [{ ...dados, id: "p" + Date.now(), dataPagamento: "", status: "pendente" }, ...ps]);
  }
  function notaStatus(id, status) {
    setNotas((ns) => ns.map((n) => (n.id === id ? { ...n, status } : n)));
  }

  const mkEvento = (colaboradorId, tipo, data, descricao) =>
    ({ id: "e" + Math.random().toString(36).slice(2, 8), colaboradorId, tipo, data, descricao });

  // criar novo colaborador (gera evento de admissão)
  function criar(dados) {
    const id = "c" + Date.now();
    setColaboradores((cs) => [{ ...dados, id }, ...cs]);
    setEventos((es) => [mkEvento(id, "admissao", dados.admissao || HOJE, `Admitido como ${dados.cargo || "colaborador"}`), ...es]);
    setNovo(false);
    setDetalheId(id);
  }

  // editar colaborador existente (gera eventos automáticos pelas mudanças)
  function editar(dados) {
    const antigo = colaboradores.find((c) => c.id === dados.id);
    const novos = [];
    if (antigo && antigo.salario !== dados.salario)
      novos.push(mkEvento(dados.id, "alteracao_salarial", HOJE, `Salário de ${brl(antigo.salario)} para ${brl(dados.salario)}`));
    if (antigo && antigo.setor !== dados.setor && dados.setor)
      novos.push(mkEvento(dados.id, "mudanca_setor", HOJE, `Setor de ${antigo.setor || "—"} para ${dados.setor}`));
    if (antigo && antigo.cargo !== dados.cargo && dados.cargo)
      novos.push(mkEvento(dados.id, "promocao", HOJE, `Cargo alterado para ${dados.cargo}`));
    if (antigo && antigo.status !== dados.status && dados.status === "desligado")
      novos.push(mkEvento(dados.id, "desligamento", HOJE, "Colaborador desligado"));
    setColaboradores((cs) => cs.map((c) => (c.id === dados.id ? dados : c)));
    if (novos.length) setEventos((es) => [...novos, ...es]);
  }

  function addEvento(colaboradorId, e) {
    setEventos((es) => [mkEvento(colaboradorId, e.tipo, e.data || HOJE, e.descricao), ...es]);
  }

  function desligar(id, { data, motivo }) {
    setColaboradores((cs) => cs.map((c) => (c.id === id ? { ...c, status: "desligado", desligadoEm: data || HOJE, motivoDesligamento: motivo } : c)));
    setEventos((es) => [mkEvento(id, "desligamento", data || HOJE, motivo || "Colaborador desligado"), ...es]);
  }
  function reativar(id) {
    setColaboradores((cs) => cs.map((c) => (c.id === id ? { ...c, status: "ativo", desligadoEm: "", motivoDesligamento: "" } : c)));
    setEventos((es) => [mkEvento(id, "reativacao", HOJE, "Colaborador reativado"), ...es]);
  }

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "colaboradores", label: "Colaboradores", icon: Users },
    { id: "financeiro", label: "Financeiro", icon: Wallet },
    { id: "ferias", label: "Férias", icon: Plane },
    { id: "documentos", label: "Documentos", icon: FolderClosed },
    { id: "escala", label: "Feriados & Escala", icon: CalendarDays },
    { id: "config", label: "Configurações", icon: Settings },
  ];

  const detalhe = detalheId ? colaboradores.find((c) => c.id === detalheId) : null;

  let conteudo;
  if (modulo === "dashboard") conteudo = <Dashboard colaboradores={colaboradores} pagamentos={pagamentos} notas={notas} />;
  else if (modulo === "colaboradores") {
    if (novo) conteudo = <Cadastro inicial={null} onSalvar={criar} onVoltar={() => setNovo(false)} />;
    else if (detalhe) conteudo = <Ficha colaborador={detalhe} eventos={eventos.filter((e) => e.colaboradorId === detalhe.id)} documentos={documentos.filter((d) => d.colaboradorId === detalhe.id)} onSalvar={editar} onAddEvento={addEvento} onUploadDoc={addDocumento} onAssinarDoc={assinarDoc} onVerDoc={setViewDoc} onDesligar={desligar} onReativar={reativar} onVoltar={() => setDetalheId(null)} />;
    else conteudo = <Lista colaboradores={colaboradores} onNovo={() => setNovo(true)} onAbrir={(c) => setDetalheId(c.id)} />;
  }
  else if (modulo === "financeiro") conteudo = <Financeiro colaboradores={colaboradores} pagamentos={pagamentos} notas={notas} onRegistrar={registrarPagamento} onNovoPagamento={novoPagamento} onNotaStatus={notaStatus} onVerNota={setViewNota} />;
  else if (modulo === "ferias") conteudo = <EmBreve titulo="Controle de férias" fase="Fase 3" />;
  else if (modulo === "documentos") conteudo = <DocumentosGlobal colaboradores={colaboradores} documentos={documentos} onVer={setViewDoc} />;
  else if (modulo === "escala") conteudo = <EmBreve titulo="Feriados & Escala" fase="Fase 3" />;
  else conteudo = <EmBreve titulo="Configurações" fase="Fase 1" />;

  return (
    <div style={{ fontFamily: SANS, color: C.ink, background: C.bg, minHeight: "100vh" }}>
      <style>{`
        .btn:hover{filter:brightness(.97)} .btn:active{transform:translateY(1px)}
        .btn:focus-visible{outline:2px solid ${C.blurple};outline-offset:2px}
        .inp{font-family:${SANS};font-size:13.5px;color:${C.ink};background:#fff;border:1px solid ${C.borderStrong};border-radius:10px;padding:9px 11px;width:100%;box-sizing:border-box;transition:border-color .15s,box-shadow .15s}
        .inp:focus{outline:none;border-color:${C.blurple};box-shadow:0 0 0 3px rgba(88,101,242,.15)}
        select.inp{appearance:auto}
        .row:hover{background:#FAFAF8}
        .xmx-nav:hover{background:#EEEDE7}
        @media(max-width:760px){
          .xmx-shell{flex-direction:column}
          .xmx-side{width:auto !important;border-right:none !important;border-bottom:1px solid ${C.border}}
          .xmx-navlist{display:flex !important;overflow-x:auto;gap:4px}
          .xmx-navlist button{white-space:nowrap}
          .g2{grid-template-columns:1fr !important}
        }
      `}</style>

      <div className="xmx-shell" style={{ display: "flex", minHeight: "100vh" }}>
        {/* sidebar */}
        <div className="xmx-side" style={{ width: 218, flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.border}`, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 8px 16px" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "#0B1220", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, letterSpacing: 0.5 }}>XMX</div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1 }}>Sistema XMX</div>
              <div style={{ fontSize: 11, color: C.faint }}>Pessoas · RH · Financeiro</div>
            </div>
          </div>
          <div className="xmx-navlist">
            {nav.map((n) => {
              const Icon = n.icon; const on = modulo === n.id;
              return (
                <button key={n.id} className="xmx-nav btn" onClick={() => { setModulo(n.id); setNovo(false); setDetalheId(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer",
                    border: "none", borderRadius: 9, padding: "9px 10px", marginBottom: 2, fontFamily: SANS, fontSize: 13.5, fontWeight: 500,
                    background: on ? "#EDECFB" : "transparent", color: on ? C.blurple : C.ink }}>
                  <Icon size={17} /> {n.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ borderBottom: `1px solid ${C.border}`, background: C.surface, padding: "12px 20px",
            display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Ana Ribeiro</div>
                <div style={{ fontSize: 11, color: C.faint }}>Financeiro · Admin</div>
              </div>
              <Avatar nome="Ana Ribeiro" size={32} />
            </div>
          </div>
          <div style={{ padding: "26px 20px 60px" }}>{conteudo}</div>
        </div>
      </div>

      {viewNota && (
        <NotaViewer nota={viewNota} emitente={colaboradores.find((c) => c.id === viewNota.colaboradorId) || {}} onClose={() => setViewNota(null)} />
      )}
      {viewDoc && (
        <DocViewer doc={viewDoc} colaborador={colaboradores.find((c) => c.id === viewDoc.colaboradorId) || {}} onClose={() => setViewDoc(null)} />
      )}
    </div>
  );
}
