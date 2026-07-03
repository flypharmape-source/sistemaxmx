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

export function DocViewer({ doc, colaborador, onClose }) {
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


export function DocumentosGlobal({ colaboradores, documentos, onVer }) {
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


