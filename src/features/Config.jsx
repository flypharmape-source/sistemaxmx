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

export function ConfigAcessos({ perfil }) {
  const roles = ["admin", "financeiro", "rh", "gestor", "colaborador"];
  return (
    <div style={{ maxWidth: 820 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Controle de acessos por perfil</h1>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "0 0 16px" }}>O que cada perfil pode ver e fazer. Use o seletor "Ver como" no topo para testar cada visão.</p>

      <Card style={{ padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, background: "#EDECFB", borderColor: "#D7D4F5" }}>
        <Settings size={16} color={C.blurple} />
        <span style={{ fontSize: 13.5, color: C.ink }}>Você está navegando como <b>{ROLE_LABEL[perfil.role]}</b>.</span>
      </Card>

      <Card style={{ padding: 0, overflowX: "auto" }}>
        <div style={{ minWidth: 620 }}>
          <div style={{ display: "flex", padding: "10px 16px", borderBottom: `1px solid ${C.border}`, background: "#FAFAF8", fontSize: 11.5, color: C.faint, textTransform: "uppercase", letterSpacing: 0.4 }}>
            <span style={{ flex: "1 1 230px" }}>Permissão</span>
            {roles.map((r) => <span key={r} style={{ flex: "0 0 78px", textAlign: "center" }}>{ROLE_LABEL[r]}</span>)}
          </div>
          {MATRIZ_ACESSO.map(([acao, perm], idx) => (
            <div key={idx} style={{ display: "flex", padding: "11px 16px", borderBottom: idx < MATRIZ_ACESSO.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "center" }}>
              <span style={{ flex: "1 1 230px", fontSize: 13.5 }}>{acao}</span>
              {roles.map((r) => (
                <span key={r} style={{ flex: "0 0 78px", textAlign: "center" }}>
                  {perm[r]
                    ? <Check size={15} color="#256B3B" strokeWidth={3} style={{ display: "inline" }} />
                    : <span style={{ color: C.faint }}>—</span>}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Card>
      <p style={{ fontSize: 12, color: C.faint, marginTop: 12 }}>Na versão real, o perfil vem do login (via Discord) e essas regras são aplicadas no back-end.</p>
    </div>
  );
}


