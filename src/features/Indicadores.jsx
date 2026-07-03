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

export function exportarCSV(colaboradores) {
  const cols = ["nome", "tipo", "status", "setor", "cargo", "salario", "admissao", "cpf", "email"];
  const header = cols.join(";");
  const linhas = colaboradores.map((c) => cols.map((k) => `"${(c[k] ?? "").toString().replace(/"/g, '""')}"`).join(";"));
  const csv = "\uFEFF" + [header, ...linhas].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = "colaboradores-xmx.csv"; a.click();
  URL.revokeObjectURL(url);
}

export function Indicadores({ colaboradores, ferias, notas, documentos, onNav }) {
  const ativos = colaboradores.filter((c) => c.status === "ativo");
  const desligados = colaboradores.filter((c) => c.status === "desligado").length;
  const folha = ativos.reduce((s, c) => s + (c.salario || 0), 0);
  const media = ativos.length ? folha / ativos.length : 0;

  const porSetor = {};
  ativos.forEach((c) => { porSetor[c.setor] = (porSetor[c.setor] || 0) + 1; });
  const setorList = Object.entries(porSetor).sort((a, b) => b[1] - a[1]);
  const maxSetor = Math.max(...setorList.map((s) => s[1]), 1);

  const porAno = {};
  colaboradores.forEach((c) => { const y = (c.admissao || "").slice(0, 4); if (y) porAno[y] = (porAno[y] || 0) + 1; });
  const anoList = Object.entries(porAno).sort((a, b) => a[0].localeCompare(b[0]));
  const maxAno = Math.max(...anoList.map((a) => a[1]), 1);

  const feriasVencendo = ativos.filter((c) => { const s = computeFerias(c, getFerias(ferias, c.id)).status; return s === "vencimento" || s === "vencidas"; }).length;
  const notasPend = notas.filter((n) => n.status === "pendente").length;
  const contratosPend = documentos.filter((d) => CATEGORIAS[d.categoria] && CATEGORIAS[d.categoria].assinavel && d.assinado === false).length;

  const Stat = ({ label, value }) => (
    <Card style={{ padding: "14px 18px", flex: "1 1 150px" }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 19, fontWeight: 600, fontFamily: MONO }}>{value}</div>
    </Card>
  );
  const Chip = ({ label, n, mod }) => (
    <button className="btn" onClick={() => onNav(mod)} style={{ cursor: "pointer", border: `1px solid ${C.borderStrong}`, background: "#fff", borderRadius: 999, padding: "6px 12px", fontSize: 12.5, fontFamily: SANS, color: C.ink }}>
      {label} <b style={{ fontFamily: MONO }}>{n}</b>
    </button>
  );

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Indicadores</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost" onClick={() => exportarCSV(colaboradores)}><Download size={15} /> Excel (CSV)</Btn>
          <Btn variant="ghost" onClick={() => window.print()}><Printer size={15} /> PDF</Btn>
        </div>
      </div>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "4px 0 18px" }}>Visão analítica de pessoas e folha.</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <Stat label="Headcount ativo" value={ativos.length} />
        <Stat label="Folha mensal" value={brl(folha)} />
        <Stat label="Média salarial" value={brl(media)} />
        <Stat label="No arquivo morto" value={desligados} />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        <span style={{ fontSize: 12, color: C.faint, alignSelf: "center" }}>Filtros rápidos:</span>
        <Chip label="Férias vencendo" n={feriasVencendo} mod="ferias" />
        <Chip label="Notas a conferir" n={notasPend} mod="financeiro" />
        <Chip label="Contratos pendentes" n={contratosPend} mod="documentos" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Colaboradores por setor</div>
          <div style={{ display: "grid", gap: 9 }}>
            {setorList.map(([setor, n]) => (
              <div key={setor} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ flex: "0 0 110px", fontSize: 12.5, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{setor}</span>
                <div style={{ flex: 1, height: 18, background: "#F1F0EC", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(n / maxSetor) * 100}%`, background: C.blurple, borderRadius: 5 }} />
                </div>
                <span style={{ flex: "0 0 22px", textAlign: "right", fontFamily: MONO, fontSize: 12.5 }}>{n}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Admissões por ano</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150, paddingTop: 6 }}>
            {anoList.map(([ano, n]) => (
              <div key={ano} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 12, fontFamily: MONO, color: C.ink }}>{n}</span>
                <div style={{ width: "100%", maxWidth: 34, height: `${(n / maxAno) * 100}%`, minHeight: 4, background: "#1D9E75", borderRadius: "5px 5px 0 0" }} />
                <span style={{ fontSize: 11, color: C.faint, fontFamily: MONO }}>{ano}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>Desligamentos registrados: <b style={{ fontFamily: MONO }}>{desligados}</b></div>
        </Card>
      </div>
    </div>
  );
}


