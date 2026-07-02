import { useState } from "react";
import {
  LayoutDashboard, Users, Wallet, Plane, FolderClosed, CalendarDays, Settings,
  Search, Plus, Cake, Gift, Clock, Receipt, BadgeCheck, FileText, Megaphone,
  PartyPopper, ArrowLeft, Briefcase, UserCheck, AlertTriangle,
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
  { id: "c5", tipo: "colaborador", status: "desligado", nome: "EDUARDO PINTO", cpf: "567.890.123-44", cnpj: "", nomeCnpj: "", nascimento: "1988-05-14", telefone: "(11) 96666-0005", email: "edu@xmx.com", endereco: "Rua E, 500 - São Paulo/SP", pix: "", banco: "Santander", agencia: "3344", conta: "77889-0", tipoConta: "Corrente", discordId: "", admissao: "2021-03-01", setor: "Funil", cargo: "Especialista em Funil", salario: 5200, plano: "", ehMae: false, possuiFilhos: true, qtdFilhos: 3, obs: "Desligado em 05/2026." },
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
function Dashboard({ colaboradores }) {
  const ativos = colaboradores.filter((c) => c.tipo === "colaborador" && c.status === "ativo").length;
  const prestadores = colaboradores.filter((c) => c.tipo === "prestador" && c.status === "ativo").length;
  const aniMes = colaboradores.filter((c) => mesDia(c.nascimento).slice(0, 2) === "07");
  const aniSemana = colaboradores.filter((c) => {
    const md = mesDia(c.nascimento);
    return md >= "07-02" && md <= "07-09";
  });

  const cards = [
    { icon: Users, v: ativos, l: "Colaboradores ativos", c: "#5865F2" },
    { icon: Briefcase, v: prestadores, l: "Prestadores ativos", c: "#1D9E75" },
    { icon: Cake, v: aniSemana.length, l: "Aniversariantes da semana", c: "#D85A30" },
    { icon: Gift, v: aniMes.length, l: "Aniversariantes do mês", c: "#D4537E" },
    { icon: Plane, v: 15, l: "Próximas férias", c: "#378ADD" },
    { icon: AlertTriangle, v: 8, l: "Férias vencendo", c: "#BA7517" },
    { icon: Clock, v: 12, l: "Pagamentos pendentes", c: "#BA7517" },
    { icon: BadgeCheck, v: 45, l: "Pagamentos realizados (mês)", c: "#1D9E75" },
    { icon: FileText, v: 6, l: "Notas fiscais pendentes", c: "#7F77DD" },
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
  const [fStatus, setFStatus] = useState("Todos");
  const inp = { fontFamily: SANS, fontSize: 13, color: C.ink, background: "#fff",
    border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "8px 10px" };

  const filtrados = colaboradores.filter((c) => {
    const q = busca.toLowerCase();
    const bate = !q || [c.nome, c.cpf, c.cnpj, c.cargo, c.setor, c.banco, c.email, c.telefone]
      .some((v) => (v || "").toLowerCase().includes(q));
    return bate && (fSetor === "Todos" || c.setor === fSetor) && (fStatus === "Todos" || c.status === fStatus);
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Colaboradores</h1>
        <Btn onClick={onNovo}><Plus size={16} /> Novo colaborador</Btn>
      </div>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "4px 0 18px" }}>{filtrados.length} de {colaboradores.length}</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${C.borderStrong}`,
          borderRadius: 9, padding: "0 10px", flex: "1 1 240px" }}>
          <Search size={16} color={C.faint} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome, CPF, cargo, setor, banco…"
            style={{ ...inp, border: "none", padding: "9px 0", flex: 1, outline: "none" }} />
        </div>
        <select style={inp} value={fSetor} onChange={(e) => setFSetor(e.target.value)}>
          <option>Todos</option>{SETORES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select style={inp} value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
          <option value="Todos">Todos os status</option>
          <option value="ativo">Ativo</option>
          <option value="desligado">Desligado</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {filtrados.length === 0 && <Card style={{ padding: 22, fontSize: 13.5, color: C.muted }}>Ninguém encontrado com esses filtros.</Card>}
        {filtrados.map((c) => (
          <Card key={c.id} className="row" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", flexWrap: "wrap" }}>
            <div onClick={() => onAbrir(c)} style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 240px", minWidth: 0 }}>
              <Avatar nome={c.nome} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{c.nome}</div>
                <div style={{ fontSize: 12.5, color: C.muted }}>{c.cargo} · {c.setor}{c.tipo === "prestador" ? " · PJ" : ""}</div>
              </div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 13.5, color: C.ink }}>{brl(c.salario)}</div>
            <StatusPill status={c.status} />
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------- Formulário de cadastro ---------- */
function Cadastro({ inicial, onSalvar, onVoltar }) {
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
  const [modulo, setModulo] = useState("dashboard");
  const [editando, setEditando] = useState(null); // colaborador | "novo" | null

  function salvar(dados) {
    if (dados.id) setColaboradores((cs) => cs.map((c) => (c.id === dados.id ? dados : c)));
    else setColaboradores((cs) => [{ ...dados, id: "c" + Date.now() }, ...cs]);
    setEditando(null);
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

  let conteudo;
  if (modulo === "dashboard") conteudo = <Dashboard colaboradores={colaboradores} />;
  else if (modulo === "colaboradores")
    conteudo = editando
      ? <Cadastro inicial={editando === "novo" ? null : editando} onSalvar={salvar} onVoltar={() => setEditando(null)} />
      : <Lista colaboradores={colaboradores} onNovo={() => setEditando("novo")} onAbrir={(c) => setEditando(c)} />;
  else if (modulo === "financeiro") conteudo = <EmBreve titulo="Financeiro" feito />;
  else if (modulo === "ferias") conteudo = <EmBreve titulo="Controle de férias" fase="Fase 3" />;
  else if (modulo === "documentos") conteudo = <EmBreve titulo="Controle de documentos" fase="Fase 2" />;
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
                <button key={n.id} className="xmx-nav btn" onClick={() => { setModulo(n.id); setEditando(null); }}
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
    </div>
  );
}
