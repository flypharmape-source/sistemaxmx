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

export function FeriasGlobal({ colaboradores, ferias, onAbrir }) {
  const ativos = colaboradores.filter((c) => c.status === "ativo");
  const linhas = ativos.map((c) => ({ c, info: computeFerias(c, getFerias(ferias, c.id)) }))
    .sort((a, b) => a.info.dLimite - b.info.dLimite);
  const alertas = linhas.filter((l) => l.info.status === "vencidas" || l.info.status === "vencimento");

  return (
    <div style={{ maxWidth: 780 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Controle de férias</h1>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "0 0 16px" }}>Período aquisitivo, saldo e vencimentos — aplicado a todos, inclusive PJ.</p>

      {alertas.length > 0 && (
        <Card style={{ padding: "12px 16px", marginBottom: 16, background: "#FBF1DA", borderColor: "#EAD9A8", display: "flex", alignItems: "center", gap: 10 }}>
          <AlertTriangle size={16} color="#8A6410" />
          <span style={{ fontSize: 13.5, color: "#8A6410" }}>{alertas.length} colaborador(es) com férias vencendo ou vencidas.</span>
        </Card>
      )}

      <div style={{ display: "grid", gap: 8 }}>
        {linhas.map(({ c, info }) => {
          const st = STATUS_FERIAS[info.status];
          return (
            <Card key={c.id} className="row" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", flexWrap: "wrap" }} >
              <div onClick={() => onAbrir(c)} style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 220px", minWidth: 0 }}>
                <Avatar nome={c.nome} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 500 }}>{c.nome}</div>
                  <div style={{ fontSize: 12.5, color: C.muted }}>{c.setor} · limite {dmy(info.concLimite)}</div>
                </div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 13.5 }}>{info.saldo} dias</div>
              <span style={{ background: st.bg, color: st.ink, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>{st.label}</span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}


