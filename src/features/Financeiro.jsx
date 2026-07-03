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

export function NotaViewer({ nota, emitente, onClose }) {
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


export function Financeiro({ colaboradores, pagamentos, notas, onRegistrar, onNovoPagamento, onNotaStatus, onVerNota }) {
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


