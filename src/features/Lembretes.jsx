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

export function Lembretes({ lembretes, onAbrir }) {
  return (
    <div style={{ maxWidth: 780 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Lembretes automáticos</h1>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "0 0 16px" }}>Gerados automaticamente a partir dos dados do sistema.</p>
      {lembretes.length === 0 && <Card style={{ padding: 22, fontSize: 13.5, color: C.muted }}>Tudo em dia. Nenhum lembrete no momento.</Card>}
      <div style={{ display: "grid", gap: 8 }}>
        {lembretes.map((l) => {
          const cfg = LEMBRETE[l.tipo]; const Icon = cfg.icon;
          const clickable = !!l.colaboradorId;
          return (
            <Card key={l.id} className={clickable ? "row" : ""} onClick={clickable ? () => onAbrir(l.colaboradorId) : undefined}
              style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: clickable ? "pointer" : "default" }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: cfg.cor + "1A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} color={cfg.cor} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{l.titulo}</div>
                <div style={{ fontSize: 12.5, color: C.muted }}>{l.sub}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}


