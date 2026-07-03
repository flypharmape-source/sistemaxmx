/* App — shell do sistema: estado, autenticação, navegação e roteamento dos módulos. */
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
import { C, MONO, SANS } from "./theme";
import { HOJE,SETORES,seed,brl,idade,mesDia,primeiro,dmy,EVENTOS,TIPOS_MANUAIS,seedEventos,EMPRESA,FORMAS,STATUS_PAG,STATUS_NOTA,seedPagamentos,seedNotas,CATEGORIAS,seedDocumentos,addAnos,anosCompletos,diasEntre,STATUS_FERIAS,computeFerias,seedFerias,getFerias,REGRAS,seedFeriados,seedEscala,getRegra,CHECKLIST_ADMISSAO,CHECKLIST_DESLIGAMENTO,seedChecklists,getChecks,seedContas,ROLE_LABEL,NAV_PERM,podeVerSensivel,podeEditarCadastro,escopoColaboradores,MATRIZ_ACESSO,seedComemorativas,LEMBRETE,diasAteAniversario,gerarLembretes } from "./core";
import { Card, Btn, Field, Avatar, StatusPill } from "./ui";
import { Dashboard } from "./features/Dashboard";
import { Lista, Cadastro, Ficha } from "./features/Colaboradores";
import { Financeiro, NotaViewer } from "./features/Financeiro";
import { FeriasGlobal } from "./features/Ferias";
import { DocumentosGlobal, DocViewer } from "./features/Documentos";
import { FeriadosEscala } from "./features/Escala";
import { Lembretes } from "./features/Lembretes";
import { Indicadores } from "./features/Indicadores";
import { ConfigAcessos } from "./features/Config";
import { Login } from "./features/Login";

export default function App() {
  const [colaboradores, setColaboradores] = useState(seed);
  const [eventos, setEventos] = useState(seedEventos);
  const [modulo, setModulo] = useState("dashboard");
  const [novo, setNovo] = useState(false);
  const [detalheId, setDetalheId] = useState(null);
  const [pagamentos, setPagamentos] = useState(seedPagamentos);
  const [notas, setNotas] = useState(seedNotas);
  const [viewNota, setViewNota] = useState(null);
  const [documentos, setDocumentos] = useState(seedDocumentos);
  const [viewDoc, setViewDoc] = useState(null);
  const [ferias, setFerias] = useState(seedFerias);
  const [feriados, setFeriados] = useState(seedFeriados);
  const [escala, setEscala] = useState(seedEscala);
  const [checklists, setChecklists] = useState(seedChecklists);
  const [competenciaAberta, setCompetenciaAberta] = useState("2026-07");
  const [usuario, setUsuario] = useState(null);
  const [contas, setContas] = useState(seedContas);

  function login(email, senha) {
    const c = contas.find((x) => x.email.toLowerCase() === (email || "").trim().toLowerCase() && x.senha === senha);
    if (!c) return false;
    setUsuario(c);
    setNovo(false);
    if (c.role === "colaborador") { setModulo("colaboradores"); setDetalheId(c.colaboradorId); }
    else { setModulo(NAV_PERM.dashboard.includes(c.role) ? "dashboard" : "colaboradores"); setDetalheId(null); }
    return true;
  }
  function logout() { setUsuario(null); setModulo("dashboard"); setDetalheId(null); setNovo(false); }

  function toggleCheck(colaboradorId, tipo, itemId) {
    setChecklists((cl) => {
      const rec = cl[colaboradorId] || { admissao: {}, desligamento: {} };
      const bloco = { ...(rec[tipo] || {}), [itemId]: !(rec[tipo] || {})[itemId] };
      return { ...cl, [colaboradorId]: { ...rec, [tipo]: bloco } };
    });
  }

  function novoFeriado(dados) {
    const id = "h" + Date.now();
    setFeriados((hs) => [...hs, { ...dados, id }]);
    return id;
  }
  function setRegra(feriadoId, colaboradorId, regra) {
    setEscala((e) => ({ ...e, [feriadoId]: { ...(e[feriadoId] || {}), [colaboradorId]: regra } }));
  }

  function programarFerias(colaboradorId, { dias, dataInicio, obs }) {
    setFerias((f) => {
      const rec = f[colaboradorId] || { saldo: 30, movimentos: [] };
      const saldoApos = rec.saldo - dias;
      return { ...f, [colaboradorId]: { saldo: saldoApos, movimentos: [...rec.movimentos, { id: "fm" + Date.now(), data: dataInicio, dias, obs, saldoApos }] } };
    });
    setEventos((es) => [mkEvento(colaboradorId, "ferias", dataInicio, `Férias programadas (${dias} dias)`), ...es]);
  }

  function addDocumento(colaboradorId, categoria, nome) {
    const assinado = CATEGORIAS[categoria]?.assinavel ? false : null;
    setDocumentos((ds) => [{ id: "d" + Date.now(), colaboradorId, categoria, nome, enviadoEm: HOJE, assinado }, ...ds]);
  }
  function assinarDoc(id) {
    setDocumentos((ds) => ds.map((d) => (d.id === id ? { ...d, assinado: !d.assinado } : d)));
  }

  function registrarPagamento(id) {
    setPagamentos((ps) => ps.map((p) => (p.id === id ? { ...p, status: "realizado", dataPagamento: HOJE } : p)));
  }
  function novoPagamento(dados) {
    setPagamentos((ps) => [{ ...dados, id: "p" + Date.now(), dataPagamento: "", status: "pendente" }, ...ps]);
  }
  function notaStatus(id, status) {
    setNotas((ns) => ns.map((n) => (n.id === id ? { ...n, status } : n)));
  }
  function enviarNota(colaboradorId, dados) {
    const c = colaboradores.find((x) => x.id === colaboradorId) || {};
    setNotas((ns) => [{
      id: "nf" + Date.now(), colaboradorId, setor: c.setor || "", numero: dados.numero || "s/nº",
      competencia: dados.competencia, valor: dados.valor, descricao: dados.descricao || "",
      arquivo: dados.arquivo || "nota.pdf", status: "pendente", enviadaEm: HOJE,
    }, ...ns]);
  }
  function reenviarNota(id) {
    setNotas((ns) => ns.map((n) => (n.id === id ? { ...n, status: "pendente", enviadaEm: HOJE } : n)));
  }

  const mkEvento = (colaboradorId, tipo, data, descricao) =>
    ({ id: "e" + Math.random().toString(36).slice(2, 8), colaboradorId, tipo, data, descricao });

  // criar novo colaborador (gera evento de admissão)
  function criar(dados) {
    const id = "c" + Date.now();
    setColaboradores((cs) => [{ ...dados, id }, ...cs]);
    setEventos((es) => [mkEvento(id, "admissao", dados.admissao || HOJE, `Admitido como ${dados.cargo || "colaborador"}`), ...es]);
    if (dados.email && dados.acessoSenha) {
      setContas((cts) => [...cts.filter((c) => c.email.toLowerCase() !== dados.email.toLowerCase()),
        { email: dados.email, senha: dados.acessoSenha, senhaVisivel: dados.acessoSenha, nome: dados.nome, role: dados.acessoRole || "colaborador", setor: dados.setor, colaboradorId: id }]);
    }
    setNovo(false);
    setDetalheId(id);
  }

  // editar colaborador existente (gera eventos automáticos pelas mudanças)
  function editar(dados) {
    const antigo = colaboradores.find((c) => c.id === dados.id);
    const novos = [];
    if (antigo && antigo.salario !== dados.salario)
      novos.push(mkEvento(dados.id, "alteracao_salarial", HOJE, `Salário de ${brl(antigo.salario)} para ${brl(dados.salario)}`));
    if (antigo && antigo.setor !== dados.setor && dados.setor)
      novos.push(mkEvento(dados.id, "mudanca_setor", HOJE, `Setor de ${antigo.setor || "—"} para ${dados.setor}`));
    if (antigo && antigo.cargo !== dados.cargo && dados.cargo)
      novos.push(mkEvento(dados.id, "promocao", HOJE, `Cargo alterado para ${dados.cargo}`));
    if (antigo && antigo.status !== dados.status && dados.status === "desligado")
      novos.push(mkEvento(dados.id, "desligamento", HOJE, "Colaborador desligado"));
    setColaboradores((cs) => cs.map((c) => (c.id === dados.id ? dados : c)));
    if (novos.length) setEventos((es) => [...novos, ...es]);
  }

  function addEvento(colaboradorId, e) {
    setEventos((es) => [mkEvento(colaboradorId, e.tipo, e.data || HOJE, e.descricao), ...es]);
  }

  function desligar(id, { data, motivo }) {
    setColaboradores((cs) => cs.map((c) => (c.id === id ? { ...c, status: "desligado", desligadoEm: data || HOJE, motivoDesligamento: motivo } : c)));
    setEventos((es) => [mkEvento(id, "desligamento", data || HOJE, motivo || "Colaborador desligado"), ...es]);
  }
  function reativar(id) {
    setColaboradores((cs) => cs.map((c) => (c.id === id ? { ...c, status: "ativo", desligadoEm: "", motivoDesligamento: "" } : c)));
    setEventos((es) => [mkEvento(id, "reativacao", HOJE, "Colaborador reativado"), ...es]);
  }

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "colaboradores", label: "Colaboradores", icon: Users },
    { id: "financeiro", label: "Financeiro", icon: Wallet },
    { id: "ferias", label: "Férias", icon: Plane },
    { id: "documentos", label: "Documentos", icon: FolderClosed },
    { id: "escala", label: "Feriados & Escala", icon: CalendarDays },
    { id: "lembretes", label: "Lembretes", icon: Bell },
    { id: "indicadores", label: "Indicadores", icon: BarChart3 },
    { id: "config", label: "Configurações", icon: Settings },
  ];

  if (!usuario) return <Login contas={contas} onLogin={login} />;
  const perfil = usuario;
  const totalLembretes = gerarLembretes({ colaboradores, ferias, notas, pagamentos, documentos }).length;

  const detalhe = detalheId ? colaboradores.find((c) => c.id === detalheId) : null;
  const visiveis = escopoColaboradores(colaboradores, perfil);
  const mostrarSalario = podeVerSensivel(perfil.role);
  const podeEditar = podeEditarCadastro(perfil.role);

  function fichaProps(c) {
    const verSensivel = podeVerSensivel(perfil.role) || (perfil.role === "colaborador" && c.id === perfil.colaboradorId);
    const podeEnviarNota = (perfil.role === "colaborador" && c.id === perfil.colaboradorId) || ["admin", "financeiro"].includes(perfil.role);
    return { colaborador: c, eventos: eventos.filter((e) => e.colaboradorId === c.id), documentos: documentos.filter((d) => d.colaboradorId === c.id), ferias: getFerias(ferias, c.id), checks: getChecks(checklists, c.id), notas: notas.filter((n) => n.colaboradorId === c.id), competenciaAberta, podeEnviarNota, podeEditar, verSensivel, onSalvar: editar, onAddEvento: addEvento, onUploadDoc: addDocumento, onAssinarDoc: assinarDoc, onVerDoc: setViewDoc, onDesligar: desligar, onReativar: reativar, onProgramarFerias: programarFerias, onToggleCheck: toggleCheck, onEnviarNota: enviarNota, onReenviarNota: reenviarNota, onVerNota: setViewNota };
  }

  let conteudo;
  if (modulo === "dashboard") conteudo = <Dashboard colaboradores={visiveis} pagamentos={pagamentos} notas={notas} ferias={ferias} documentos={documentos} feriados={feriados} role={perfil.role} onNav={(m) => { if (NAV_PERM[m].includes(perfil.role)) { setModulo(m); setNovo(false); setDetalheId(null); } }} onAbrir={(id) => { setModulo("colaboradores"); setDetalheId(id); }} />;
  else if (modulo === "colaboradores") {
    if (perfil.role === "colaborador") {
      const meu = colaboradores.find((c) => c.id === perfil.colaboradorId);
      conteudo = <Ficha {...fichaProps(meu)} onVoltar={() => {}} />;
    } else if (novo && podeEditar) conteudo = <Cadastro inicial={null} onSalvar={criar} onVoltar={() => setNovo(false)} />;
    else if (detalhe) conteudo = <Ficha {...fichaProps(detalhe)} onVoltar={() => setDetalheId(null)} />;
    else conteudo = <Lista colaboradores={visiveis} mostrarSalario={mostrarSalario} podeNovo={podeEditar} onNovo={() => setNovo(true)} onAbrir={(c) => setDetalheId(c.id)} />;
  }
  else if (modulo === "financeiro") conteudo = <Financeiro colaboradores={colaboradores} pagamentos={pagamentos} notas={notas} competenciaAberta={competenciaAberta} onAbrirCompetencia={setCompetenciaAberta} onRegistrar={registrarPagamento} onNovoPagamento={novoPagamento} onNotaStatus={notaStatus} onVerNota={setViewNota} />;
  else if (modulo === "ferias") conteudo = <FeriasGlobal colaboradores={visiveis} ferias={ferias} onAbrir={(c) => { setModulo("colaboradores"); setDetalheId(c.id); }} />;
  else if (modulo === "documentos") conteudo = <DocumentosGlobal colaboradores={colaboradores} documentos={documentos} onVer={setViewDoc} />;
  else if (modulo === "escala") conteudo = <FeriadosEscala colaboradores={visiveis} feriados={feriados} escala={escala} onNovoFeriado={novoFeriado} onSetRegra={setRegra} verSalario={mostrarSalario} />;
  else if (modulo === "lembretes") conteudo = <Lembretes lembretes={gerarLembretes({ colaboradores, ferias, notas, pagamentos, documentos })} onAbrir={(id) => { setModulo("colaboradores"); setDetalheId(id); }} />;
  else if (modulo === "indicadores") conteudo = <Indicadores colaboradores={colaboradores} ferias={ferias} notas={notas} documentos={documentos} onNav={(m) => { setModulo(m); setNovo(false); setDetalheId(null); }} />;
  else conteudo = <ConfigAcessos perfil={perfil} />;

  return (
    <div style={{ fontFamily: SANS, color: C.ink, background: C.bg, minHeight: "100vh" }}>
      <style>{`
        .btn:hover{filter:brightness(.97)} .btn:active{transform:translateY(1px)}
        .btn:focus-visible{outline:2px solid ${C.blurple};outline-offset:2px}
        .inp{font-family:${SANS};font-size:13.5px;color:${C.ink};background:#fff;border:1px solid ${C.borderStrong};border-radius:10px;padding:9px 11px;width:100%;box-sizing:border-box;transition:border-color .15s,box-shadow .15s}
        .inp:focus{outline:none;border-color:${C.blurple};box-shadow:0 0 0 3px rgba(88,101,242,.15)}
        select.inp{appearance:auto}
        .row:hover{background:#FAFAF8}
        .dashcard{cursor:pointer;transition:border-color .15s, transform .05s, box-shadow .15s}
        .dashcard:hover{border-color:${C.borderStrong};box-shadow:0 2px 8px rgba(0,0,0,.05)}
        .dashcard:active{transform:translateY(1px)}
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
            {nav.filter((n) => NAV_PERM[n.id].includes(perfil.role)).map((n) => {
              const Icon = n.icon; const on = modulo === n.id;
              const label = perfil.role === "colaborador" && n.id === "colaboradores" ? "Meu perfil" : n.label;
              return (
                <button key={n.id} className="xmx-nav btn" onClick={() => { setModulo(n.id); setNovo(false); if (perfil.role !== "colaborador") setDetalheId(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", cursor: "pointer",
                    border: "none", borderRadius: 9, padding: "9px 10px", marginBottom: 2, fontFamily: SANS, fontSize: 13.5, fontWeight: 500,
                    background: on ? "#EDECFB" : "transparent", color: on ? C.blurple : C.ink }}>
                  <Icon size={17} /> <span style={{ flex: 1 }}>{label}</span>
                  {n.id === "lembretes" && totalLembretes > 0 && (
                    <span style={{ fontSize: 11, fontWeight: 600, fontFamily: MONO, color: "#fff", background: "#D85A30", minWidth: 18, height: 18, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{totalLembretes}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ borderBottom: `1px solid ${C.border}`, background: C.surface, padding: "10px 20px",
            display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{usuario.nome}</div>
              <div style={{ fontSize: 11, color: C.faint }}>{usuario.email}</div>
            </div>
            <span style={{ fontSize: 11.5, fontWeight: 500, color: C.blurple, background: "#EDECFB", padding: "4px 10px", borderRadius: 999 }}>{ROLE_LABEL[perfil.role]}</span>
            <Btn variant="ghost" onClick={logout}><LogOut size={15} /> Sair</Btn>
          </div>
          <div style={{ padding: "26px 20px 60px" }}>{conteudo}</div>
        </div>
      </div>

      {viewNota && (
        <NotaViewer nota={viewNota} emitente={colaboradores.find((c) => c.id === viewNota.colaboradorId) || {}} onClose={() => setViewNota(null)} />
      )}
      {viewDoc && (
        <DocViewer doc={viewDoc} colaborador={colaboradores.find((c) => c.id === viewDoc.colaboradorId) || {}} onClose={() => setViewDoc(null)} />
      )}
    </div>
  );
}
