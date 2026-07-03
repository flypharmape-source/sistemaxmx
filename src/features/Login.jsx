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

export function Login({ contas, onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const campo = { width: "100%", boxSizing: "border-box", fontFamily: SANS, fontSize: 14, color: C.ink, background: "#fff", border: `1px solid ${C.borderStrong}`, borderRadius: 10, padding: "10px 12px" };

  function entrar() {
    if (!onLogin(email, senha)) setErro("E-mail ou senha inválidos.");
  }

  return (
    <div style={{ fontFamily: SANS, background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#0B1220", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>XMX</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1 }}>Sistema XMX</div>
            <div style={{ fontSize: 11.5, color: C.faint }}>Pessoas · RH · Financeiro</div>
          </div>
        </div>

        <Card style={{ padding: 26 }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>Entrar</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>Acesse com o e-mail e a senha cadastrados pelo RH ou Financeiro.</p>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <span style={{ display: "block", fontSize: 12, color: C.muted, fontWeight: 500, marginBottom: 6 }}>E-mail</span>
              <input style={campo} value={email} onChange={(e) => { setEmail(e.target.value); setErro(""); }} placeholder="voce@xmx.com" onKeyDown={(e) => e.key === "Enter" && entrar()} />
            </div>
            <div>
              <span style={{ display: "block", fontSize: 12, color: C.muted, fontWeight: 500, marginBottom: 6 }}>Senha</span>
              <input style={campo} type="password" value={senha} onChange={(e) => { setSenha(e.target.value); setErro(""); }} placeholder="••••" onKeyDown={(e) => e.key === "Enter" && entrar()} />
            </div>
            {erro && <div style={{ fontSize: 12.5, color: C.desligInk }}>{erro}</div>}
            <Btn onClick={entrar} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>Entrar</Btn>
          </div>
        </Card>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11.5, color: C.faint, marginBottom: 8, textAlign: "center" }}>Contas de teste (senha: 123) — clique para entrar</div>
          <div style={{ display: "grid", gap: 6 }}>
            {contas.map((c) => (
              <button key={c.email} className="nf-login btn" onClick={() => onLogin(c.email, c.senha)}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", cursor: "pointer", fontFamily: SANS, textAlign: "left" }}>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: C.ink }}>{c.nome}</span>
                  <span style={{ fontSize: 11.5, color: C.muted, fontFamily: MONO }}>{c.email}</span>
                </span>
                <span style={{ fontSize: 11, color: C.blurple, background: "#EDECFB", padding: "3px 9px", borderRadius: 999 }}>{ROLE_LABEL[c.role]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


