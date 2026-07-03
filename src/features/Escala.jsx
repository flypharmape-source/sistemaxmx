import { useState } from "react";
import {
  LayoutDashboard, Users, Wallet, Plane, FolderClosed, CalendarDays, Settings,
  Search, Plus, Cake, Gift, Clock, Receipt, BadgeCheck, FileText, Megaphone,
  PartyPopper, ArrowLeft, Briefcase, UserCheck, AlertTriangle,
  LogIn, LogOut, TrendingUp, Award, ArrowRightLeft,
  FileSignature, FileCheck, Paperclip, Star, Eye, UserX, RotateCcw,
  Coffee, DollarSign, Coins, CalendarClock, CalendarPlus, Bell, Check,
  BarChart3, Download, Printer, ChevronRight,
} from "lucide-react";
import { C, MONO, SANS } from "../theme";
import { HOJE,SETORES,seed,brl,idade,mesDia,primeiro,dmy,EVENTOS,TIPOS_MANUAIS,seedEventos,EMPRESA,FORMAS,STATUS_PAG,STATUS_NOTA,seedPagamentos,seedNotas,CATEGORIAS,seedDocumentos,addAnos,anosCompletos,diasEntre,STATUS_FERIAS,computeFerias,seedFerias,getFerias,REGRAS,seedFeriados,seedEscala,getRegra,CHECKLIST_ADMISSAO,CHECKLIST_DESLIGAMENTO,seedChecklists,getChecks,seedContas,ROLE_LABEL,NAV_PERM,podeVerSensivel,podeEditarCadastro,escopoColaboradores,MATRIZ_ACESSO,seedComemorativas,LEMBRETE,diasAteAniversario,gerarLembretes } from "../core";
import { Card, Btn, Field, Avatar, StatusPill } from "../ui";

export function exportarEscalaCSV(feriado, ativos, escala) {
  const cols = ["Colaborador", "Setor", "Situação", "Salário", "Valor a receber"];
  const linhas = ativos.map((c) => {
    const regra = getRegra(escala, feriado.id, c.id);
    const valor = regra === "normal" ? (c.salario || 0) / 30 * 2 : 0;
    return [c.nome, c.setor, REGRAS[regra].label, (c.salario || 0).toFixed(2).replace(".", ","), valor.toFixed(2).replace(".", ",")]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";");
  });
  const csv = "\uFEFF" + [cols.join(";"), ...linhas].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = `escala-${feriado.nome.replace(/\s+/g, "-").toLowerCase()}-${feriado.data}.csv`; a.click();
  URL.revokeObjectURL(url);
}

export function FeriadosEscala({ colaboradores, feriados, escala, onNovoFeriado, onSetRegra, verSalario = true }) {
  const ordenados = [...feriados].sort((a, b) => a.data.localeCompare(b.data));
  const [selId, setSelId] = useState(ordenados[0]?.id || null);
  const [addF, setAddF] = useState(false);
  const [nf, setNf] = useState({ data: "", nome: "", abrangencia: "Nacional", uf: "" });
  const sel = feriados.find((h) => h.id === selId);
  const ativos = colaboradores.filter((c) => c.status === "ativo");
  const inp = { fontFamily: SANS, fontSize: 13, color: C.ink, background: "#fff", border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "7px 9px" };
  const nfOk = nf.data && nf.nome.trim();
  const valorExtra = (c) => (c.salario || 0) / 30 * 2;
  const totalPagar = sel ? ativos.reduce((s, c) => s + (getRegra(escala, sel.id, c.id) === "normal" ? valorExtra(c) : 0), 0) : 0;

  return (
    <div style={{ maxWidth: 780 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Feriados & Escala</h1>
        <Btn onClick={() => setAddF(!addF)}><CalendarPlus size={16} /> Novo feriado</Btn>
      </div>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "4px 0 16px" }}>Cadastre feriados e defina a escala de cada colaborador.</p>

      {addF && (
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
            <Field label="Data"><input className="inp" type="date" value={nf.data} onChange={(e) => setNf({ ...nf, data: e.target.value })} /></Field>
            <Field label="Nome"><input className="inp" value={nf.nome} onChange={(e) => setNf({ ...nf, nome: e.target.value })} placeholder="Ex: Aniversário da cidade" /></Field>
            <Field label="Abrangência"><select className="inp" value={nf.abrangencia} onChange={(e) => setNf({ ...nf, abrangencia: e.target.value })}><option>Nacional</option><option>Estadual</option><option>Municipal</option></select></Field>
            <Field label="UF / Município"><input className="inp" value={nf.uf} onChange={(e) => setNf({ ...nf, uf: e.target.value })} placeholder="Ex: SP / São Paulo" /></Field>
          </div>
          <div style={{ marginTop: 12 }}>
            <Btn disabled={!nfOk} onClick={() => { const id = onNovoFeriado(nf); setSelId(id); setNf({ data: "", nome: "", abrangencia: "Nacional", uf: "" }); setAddF(false); }}>Cadastrar feriado</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 16 }}>
        {ordenados.map((h) => {
          const on = h.id === selId;
          return (
            <button key={h.id} className="btn" onClick={() => setSelId(h.id)} style={{ flexShrink: 0, textAlign: "left", cursor: "pointer", border: `1px solid ${on ? C.blurple : C.border}`, background: on ? "#EDECFB" : "#fff", borderRadius: 12, padding: "10px 14px", fontFamily: SANS }}>
              <div style={{ fontSize: 12, color: C.muted, fontFamily: MONO }}>{dmy(h.data)}</div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: on ? C.blurple : C.ink }}>{h.nome}</div>
              <div style={{ fontSize: 11, color: C.faint }}>{h.abrangencia}{h.uf ? ` · ${h.uf}` : ""}</div>
            </button>
          );
        })}
      </div>

      {/* legenda */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
        {Object.keys(REGRAS).map((k) => { const r = REGRAS[k]; const Icon = r.icon; return (
          <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
            <Icon size={14} color={r.cor} /> {r.label}
          </span>
        ); })}
      </div>

      {sel && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", background: "#FAFAF8", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <CalendarClock size={15} color={C.muted} />
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>{sel.nome}</span>
            <span style={{ fontSize: 12, color: C.faint, fontFamily: MONO }}>· {dmy(sel.data)}</span>
            {verSalario && (
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12.5, color: C.muted }}>Total a pagar: <b style={{ fontFamily: MONO, color: C.ink }}>{brl(totalPagar)}</b></span>
                <Btn variant="ghost" onClick={() => exportarEscalaCSV(sel, ativos, escala)}><Download size={15} /> Exportar CSV</Btn>
              </span>
            )}
          </div>
          <div style={{ display: "flex", padding: "8px 16px", fontSize: 11.5, color: C.faint, textTransform: "uppercase", letterSpacing: 0.4, borderBottom: `1px solid ${C.border}` }}>
            <span style={{ flex: 1 }}>Colaborador</span>
            <span style={{ flex: "0 0 200px" }}>Situação / Ação</span>
            {verSalario && <span style={{ flex: "0 0 120px", textAlign: "right" }}>Valor a receber</span>}
          </div>
          {ativos.map((c) => {
            const regra = getRegra(escala, sel.id, c.id);
            const r = REGRAS[regra];
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${C.border}`, flexWrap: "wrap" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <Avatar nome={c.nome} size={30} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{c.nome}</div>
                    <div style={{ fontSize: 11.5, color: C.faint }}>{c.setor}</div>
                  </div>
                </div>
                <div style={{ flex: "0 0 200px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: r.cor, flexShrink: 0 }} />
                  <select style={{ ...inp, flex: 1 }} value={regra} onChange={(e) => onSetRegra(sel.id, c.id, e.target.value)}>
                    {Object.keys(REGRAS).map((k) => <option key={k} value={k}>{REGRAS[k].label}</option>)}
                  </select>
                </div>
                {verSalario && (
                  <div style={{ flex: "0 0 120px", textAlign: "right" }}>
                    {regra === "normal"
                      ? <span title="(salário ÷ 30) × 2" style={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, color: "#256B3B", background: "#E3F2E6", padding: "5px 10px", borderRadius: 8, display: "inline-block" }}>{brl(valorExtra(c))}</span>
                      : <span style={{ color: C.faint, fontSize: 13 }}>—</span>}
                  </div>
                )}
              </div>
            );
          })}
          {verSalario && (
            <div style={{ padding: "10px 16px", fontSize: 11.5, color: C.faint }}>Valor a receber por trabalhar no feriado = (salário ÷ 30) × 2, para quem está como "Trabalha e recebe".</div>
          )}
        </Card>
      )}
    </div>
  );
}


