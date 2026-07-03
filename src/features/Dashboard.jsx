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

export function Dashboard({ colaboradores, pagamentos = [], notas = [], ferias = {}, documentos = [], feriados = [], role = "admin", onNav = () => {}, onAbrir = () => {} }) {
  const ativos = colaboradores.filter((c) => c.status === "ativo").length;
  const aniMes = colaboradores.filter((c) => mesDia(c.nascimento).slice(0, 2) === "07");
  const aniSemana = colaboradores.filter((c) => {
    const md = mesDia(c.nascimento);
    return md >= "07-02" && md <= "07-09";
  });
  const pagPend = pagamentos.filter((p) => p.status === "pendente").length;
  const pagFeitos = pagamentos.filter((p) => p.status === "realizado").length;
  const notasPend = notas.filter((n) => n.status === "pendente").length;
  const feriasVencendo = colaboradores.filter((c) => {
    if (c.status !== "ativo") return false;
    const s = computeFerias(c, getFerias(ferias, c.id)).status;
    return s === "vencimento" || s === "vencidas";
  }).length;
  const proximasFerias = Object.values(ferias).reduce((n, r) => n + r.movimentos.filter((m) => m.data >= HOJE).length, 0);
  const lembretes = gerarLembretes({ colaboradores, ferias, notas, pagamentos, documentos });
  const feriadosNac = feriados.filter((h) => h.abrangencia === "Nacional" && h.data >= HOJE).length;

  const cards = [
    { icon: Users, v: ativos, l: "Colaboradores ativos", c: "#5865F2", mod: "colaboradores" },
    { icon: Gift, v: aniMes.length, l: "Aniversariantes do mês", c: "#D4537E", mod: "colaboradores" },
    { icon: Plane, v: proximasFerias, l: "Próximas férias", c: "#378ADD", mod: "ferias" },
    { icon: AlertTriangle, v: feriasVencendo, l: "Férias vencendo", c: "#BA7517", mod: "ferias" },
    { icon: Clock, v: pagPend, l: "Pagamentos pendentes", c: "#BA7517", mod: "financeiro" },
    { icon: FileText, v: notasPend, l: "Notas fiscais pendentes", c: "#7F77DD", mod: "financeiro" },
    { icon: Megaphone, v: lembretes.length, l: "Avisos / lembretes", c: "#D85A30", mod: "lembretes" },
    { icon: CalendarDays, v: feriadosNac, l: "Feriados nacionais", c: "#378ADD", mod: "escala" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Dashboard</h1>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "0 0 22px" }}>Visão geral de pessoas, RH e financeiro.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
        {cards.map((k, i) => {
          const Icon = k.icon;
          const clic = k.mod && NAV_PERM[k.mod] && NAV_PERM[k.mod].includes(role);
          return (
            <Card key={i} className={clic ? "dashcard" : ""} onClick={clic ? () => onNav(k.mod) : undefined} style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: k.c + "1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color={k.c} />
                </div>
                {clic && <ChevronRight size={15} color={C.faint} />}
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
            <div key={c.id} className="row" onClick={() => onAbrir(c.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 8px", margin: "0 -8px", borderRadius: 8, cursor: "pointer" }}>
              <Avatar nome={c.nome} size={30} />
              <span style={{ fontSize: 13.5, flex: 1 }}>{c.nome}</span>
              <span style={{ fontSize: 12.5, color: C.muted, fontFamily: MONO }}>{mesDia(c.nascimento).replace("-", "/")}</span>
            </div>
          ))}
        </Card>
        <Card style={{ padding: 18 }}>
          <div className={NAV_PERM.lembretes.includes(role) ? "row" : ""} onClick={NAV_PERM.lembretes.includes(role) ? () => onNav("lembretes") : undefined}
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "2px 8px", margin: "-2px -8px 10px", borderRadius: 8, cursor: NAV_PERM.lembretes.includes(role) ? "pointer" : "default" }}>
            <Megaphone size={16} color="#D85A30" />
            <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>Avisos e lembretes</span>
            {NAV_PERM.lembretes.includes(role) && <ChevronRight size={15} color={C.faint} />}
          </div>
          {lembretes.length === 0 && <div style={{ fontSize: 13, color: C.muted }}>Nada pendente.</div>}
          {lembretes.slice(0, 5).map((l, i, arr) => (
            <div key={l.id} style={{ fontSize: 13.5, color: C.ink, padding: "7px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>{l.titulo}</div>
          ))}
        </Card>
      </div>
    </div>
  );
}


