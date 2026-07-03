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

export function Cadastro({ inicial, onSalvar, onVoltar, embed, verSensivel = true, podeEditar = true }) {
  const [f, setF] = useState(inicial || {
    tipo: "colaborador", status: "ativo", nome: "", cpf: "", cnpj: "", nomeCnpj: "", nascimento: "",
    telefone: "", email: "", endereco: "", pix: "", banco: "", agencia: "", conta: "", tipoConta: "Corrente",
    discordId: "", admissao: "", setor: "", cargo: "", salario: "", plano: "", ehMae: false, possuiFilhos: false, qtdFilhos: 0, obs: "",
    acessoRole: "colaborador", acessoSenha: "",
  });
  const set = (k, v) => setF({ ...f, [k]: v });
  const ok = f.nome.trim() && f.cpf.trim();
  const inp = "inp";
  const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 };

  const Toggle = ({ val, on, off, onChange }) => (
    <div style={{ display: "inline-flex", background: "#EEEDE7", borderRadius: 9, padding: 3 }}>
      {[[true, on], [false, off]].map(([v, label]) => (
        <button key={String(v)} className="btn" onClick={() => onChange(v)}
          style={{ border: "none", cursor: "pointer", fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: "6px 16px",
            borderRadius: 7, background: val === v ? "#fff" : "transparent", color: val === v ? C.ink : C.muted,
            boxShadow: val === v ? "0 1px 2px rgba(0,0,0,.08)" : "none" }}>{label}</button>
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: 720 }}>
      {!embed && (
        <>
          <button className="btn" onClick={onVoltar} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 13, fontFamily: SANS, padding: 0, marginBottom: 14 }}>
            <ArrowLeft size={15} /> Voltar
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <Avatar nome={f.nome || "N N"} size={52} />
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{inicial ? f.nome : "Novo colaborador"}</h1>
              <div style={{ fontSize: 13, color: C.muted }}>{idade(f.nascimento) !== "" ? `${idade(f.nascimento)} anos` : "cadastro"}</div>
            </div>
          </div>
        </>
      )}

      <Card style={{ padding: 22, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Dados pessoais</h2>
        <div style={grid} className="g2">
          <Field label="Nome completo (maiúsculo)" span>
            <input className={inp} value={f.nome} onChange={(e) => set("nome", e.target.value.toUpperCase())} placeholder="NOME SOBRENOME" />
          </Field>
          <Field label="CPF"><input className={inp} value={f.cpf} onChange={(e) => set("cpf", e.target.value)} placeholder="000.000.000-00" /></Field>
          <Field label="CNPJ (quando houver)"><input className={inp} value={f.cnpj} onChange={(e) => set("cnpj", e.target.value)} placeholder="00.000.000/0000-00" /></Field>
          <Field label="Nome vinculado ao CNPJ" span><input className={inp} value={f.nomeCnpj} onChange={(e) => set("nomeCnpj", e.target.value)} placeholder="Razão social (se diferente)" /></Field>
          <Field label="Data de nascimento"><input className={inp} type="date" value={f.nascimento} onChange={(e) => set("nascimento", e.target.value)} /></Field>
          <Field label="Idade (automática)">
            <div style={{ padding: "9px 11px", border: `1px solid ${C.border}`, borderRadius: 10, background: "#F4F3EF", fontSize: 13.5, color: C.muted }}>{idade(f.nascimento) !== "" ? `${idade(f.nascimento)} anos` : "—"}</div>
          </Field>
          <Field label="Telefone"><input className={inp} value={f.telefone} onChange={(e) => set("telefone", e.target.value)} placeholder="(00) 00000-0000" /></Field>
          <Field label="E-mail"><input className={inp} value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="email@empresa.com" /></Field>
          <Field label="Endereço completo" span><input className={inp} value={f.endereco} onChange={(e) => set("endereco", e.target.value)} placeholder="Rua, número - cidade/UF" /></Field>
          <Field label="Discord ID"><input className={inp} value={f.discordId} onChange={(e) => set("discordId", e.target.value)} placeholder="usuario#0000" /></Field>
        </div>
        {verSensivel && (<>
        <div style={{ height: 1, background: C.border, margin: "18px 0" }} />
        <div style={{ fontSize: 12.5, color: C.muted, fontWeight: 500, marginBottom: 12 }}>Dados bancários</div>
        <div style={grid} className="g2">
          <Field label="Chave Pix"><input className={inp} value={f.pix} onChange={(e) => set("pix", e.target.value)} /></Field>
          <Field label="Banco"><input className={inp} value={f.banco} onChange={(e) => set("banco", e.target.value)} /></Field>
          <Field label="Agência"><input className={inp} value={f.agencia} onChange={(e) => set("agencia", e.target.value)} /></Field>
          <Field label="Conta"><input className={inp} value={f.conta} onChange={(e) => set("conta", e.target.value)} /></Field>
          <Field label="Tipo da conta">
            <select className={inp} value={f.tipoConta} onChange={(e) => set("tipoConta", e.target.value)}><option>Corrente</option><option>Poupança</option></select>
          </Field>
        </div>
        </>)}
      </Card>

      <Card style={{ padding: 22, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Dados profissionais</h2>
        <div style={grid} className="g2">
          <Field label="Data de admissão"><input className={inp} type="date" value={f.admissao} onChange={(e) => set("admissao", e.target.value)} /></Field>
          <Field label="Setor">
            <select className={inp} value={f.setor} onChange={(e) => set("setor", e.target.value)}><option value="">Selecionar…</option>{SETORES.map((s) => <option key={s}>{s}</option>)}</select>
          </Field>
          <Field label="Cargo / Função"><input className={inp} value={f.cargo} onChange={(e) => set("cargo", e.target.value)} /></Field>
          {verSensivel && <Field label="Salário atual (R$)"><input className={inp} value={f.salario} inputMode="decimal" onChange={(e) => set("salario", e.target.value.replace(",", "."))} placeholder="0,00" /></Field>}
          <Field label="Status">
            <div style={{ paddingTop: 2 }}><Toggle val={f.status === "ativo"} on="Ativo" off="Desligado" onChange={(v) => set("status", v ? "ativo" : "desligado")} /></div>
          </Field>
          <Field label="Plano de desenvolvimento / carreira" span>
            <input className={inp} value={f.plano} onChange={(e) => set("plano", e.target.value)} placeholder="Ex: trilha para coordenador em 12 meses" />
          </Field>
        </div>
        <div style={{ fontSize: 11.5, color: C.faint, marginTop: 12 }}>Histórico salarial e de promoções são gerados automaticamente a cada mudança (Fase 2).</div>
      </Card>

      <Card style={{ padding: 22, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Benefícios e informações</h2>
        <div style={grid} className="g2">
          <Field label="É mãe?"><div style={{ paddingTop: 2 }}><Toggle val={f.ehMae} on="Sim" off="Não" onChange={(v) => set("ehMae", v)} /></div></Field>
          <Field label="Possui filhos?"><div style={{ paddingTop: 2 }}><Toggle val={f.possuiFilhos} on="Sim" off="Não" onChange={(v) => set("possuiFilhos", v)} /></div></Field>
          {f.possuiFilhos && (
            <Field label="Quantos filhos?"><input className={inp} type="number" min="0" value={f.qtdFilhos} onChange={(e) => set("qtdFilhos", e.target.value)} /></Field>
          )}
          <Field label="Observações importantes" span>
            <input className={inp} value={f.obs} onChange={(e) => set("obs", e.target.value)} placeholder="Ex: lembrete de Dia das Mães" />
          </Field>
        </div>
      </Card>

      {!inicial && podeEditar && (
        <Card style={{ padding: 22, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>Acesso ao sistema</h2>
          <p style={{ fontSize: 12.5, color: C.muted, margin: "0 0 16px" }}>Defina como a pessoa vai entrar. O login é o e-mail informado acima.</p>
          <div style={grid} className="g2">
            <Field label="Perfil de acesso">
              <select className={inp} value={f.acessoRole} onChange={(e) => set("acessoRole", e.target.value)}>
                <option value="colaborador">Colaborador</option>
                <option value="gestor">Gestor</option>
                <option value="rh">RH</option>
                <option value="financeiro">Financeiro</option>
                <option value="admin">Admin</option>
              </select>
            </Field>
            <Field label="Senha inicial"><input className={inp} value={f.acessoSenha} onChange={(e) => set("acessoSenha", e.target.value)} placeholder="defina uma senha" /></Field>
          </div>
          <div style={{ fontSize: 11.5, color: C.faint, marginTop: 10 }}>Deixe a senha em branco se a pessoa não for acessar o sistema.</div>
        </Card>
      )}

      {podeEditar ? (
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={() => onSalvar({ ...f, salario: parseFloat(f.salario) || 0, qtdFilhos: Number(f.qtdFilhos) || 0 })} disabled={!ok}>Salvar colaborador</Btn>
          <Btn variant="ghost" onClick={onVoltar}>Cancelar</Btn>
        </div>
      ) : (
        <div style={{ fontSize: 12.5, color: C.faint }}>Somente leitura para este perfil.</div>
      )}
    </div>
  );
}


export function DocumentosTab({ colaborador, documentos, onUpload, onAssinar, onVer }) {
  const ordem = ["contrato", "pessoais", "comprovantes", "termos", "outros"];
  const UploadBtn = ({ categoria }) => (
    <label className="btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${C.borderStrong}`, background: "#fff", borderRadius: 9, padding: "6px 11px", cursor: "pointer", fontSize: 12.5, color: C.ink }}>
      <Paperclip size={14} /> Enviar
      <input type="file" style={{ display: "none" }} onChange={(e) => { const n = e.target.files[0]?.name; if (n) onUpload(colaborador.id, categoria, n); e.target.value = ""; }} />
    </label>
  );

  const DocRow = ({ d }) => {
    const cat = CATEGORIAS[d.categoria];
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
        <FileText size={16} color={C.faint} />
        <button className="btn" onClick={() => onVer(d)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: MONO, fontSize: 12.5, color: C.blurple, textAlign: "left", flex: "1 1 160px", minWidth: 0 }}>{d.nome}</button>
        <span style={{ fontSize: 12, color: C.faint }}>enviado {dmy(d.enviadoEm)}</span>
        {cat.assinavel && (
          <span style={{ fontSize: 11.5, fontWeight: 500, color: d.assinado ? C.ativoInk : "#8A6410", background: d.assinado ? C.ativoBg : "#FBF1DA", padding: "2px 9px", borderRadius: 999 }}>
            {d.assinado ? "Assinado" : "Pendente"}
          </span>
        )}
        {cat.assinavel && (
          <Btn variant="ghost" onClick={() => onAssinar(d.id)}>{d.assinado ? "Desmarcar" : "Marcar assinado"}</Btn>
        )}
        <Btn variant="ghost" onClick={() => onVer(d)}><Eye size={14} /> Ver</Btn>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {ordem.map((catId) => {
        const cat = CATEGORIAS[catId];
        const Icon = cat.icon;
        const docs = documentos.filter((d) => d.categoria === catId);
        return (
          <Card key={catId} style={{ padding: 16, ...(cat.destaque ? { borderColor: "#D7D4F5", background: "#FBFBFE" } : {}) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: docs.length ? 4 : 0 }}>
              <Icon size={16} color={cat.destaque ? C.blurple : C.muted} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{cat.label}</span>
              {cat.destaque && <Star size={13} color="#E0A500" fill="#E0A500" />}
              <span style={{ marginLeft: "auto" }}><UploadBtn categoria={catId} /></span>
            </div>
            {docs.length === 0 && <div style={{ fontSize: 12.5, color: C.faint, paddingTop: 8 }}>Nenhum documento nesta categoria.</div>}
            {docs.map((d) => <DocRow key={d.id} d={d} />)}
          </Card>
        );
      })}
    </div>
  );
}


export function FeriasTab({ colaborador, ferias, onProgramar }) {
  const [prog, setProg] = useState(false);
  const [pf, setPf] = useState({ dias: "", dataInicio: HOJE, obs: "" });
  const info = computeFerias(colaborador, ferias);
  const st = STATUS_FERIAS[info.status];
  const podeProgramar = pf.dias && Number(pf.dias) > 0 && Number(pf.dias) <= info.saldo && pf.dataInicio;

  const Mini = ({ label, value, cor }) => (
    <Card style={{ padding: "12px 16px", flex: "1 1 120px" }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 600, fontFamily: MONO, color: cor || C.ink }}>{value}</div>
    </Card>
  );
  const linhaTab = (data, mov, dias, saldo, primeira) => (
    <div style={{ display: "flex", padding: "9px 0", borderTop: primeira ? "none" : `1px solid ${C.border}`, fontSize: 13 }}>
      <span style={{ flex: "0 0 100px", color: C.muted, fontFamily: MONO }}>{data}</span>
      <span style={{ flex: 1 }}>{mov}</span>
      <span style={{ flex: "0 0 70px", textAlign: "right", fontFamily: MONO, color: dias < 0 ? C.desligInk : C.muted }}>{dias === 0 ? "—" : dias > 0 ? `+${dias}` : dias}</span>
      <span style={{ flex: "0 0 70px", textAlign: "right", fontFamily: MONO, fontWeight: 500 }}>{saldo}</span>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ background: st.bg, color: st.ink, fontSize: 12.5, fontWeight: 500, padding: "4px 12px", borderRadius: 999 }}>{st.label}</span>
        <span style={{ marginLeft: "auto" }}>
          <Btn variant="ghost" onClick={() => setProg(!prog)}><Plus size={15} /> Programar férias</Btn>
        </span>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <Mini label="Dias de direito" value={info.diasDireito} />
        <Mini label="Dias utilizados" value={info.diasUtil} />
        <Mini label="Saldo disponível" value={info.saldo} cor={info.saldo > 0 ? "#256B3B" : C.muted} />
      </div>

      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Informações automáticas</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", fontSize: 13 }} className="g2">
          <div><span style={{ color: C.muted }}>Período aquisitivo: </span>{dmy(info.aqInicio)} a {dmy(info.aqFim)}</div>
          <div><span style={{ color: C.muted }}>Data limite para concessão: </span>{dmy(info.concLimite)}</div>
          <div><span style={{ color: C.muted }}>Dias disponíveis: </span>{info.saldo}</div>
          <div><span style={{ color: C.muted }}>Vence em: </span>{info.dLimite < 0 ? "vencido" : `${info.dLimite} dias`}</div>
        </div>
      </Card>

      {prog && (
        <Card style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Programar férias</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
            <Field label={`Dias (saldo: ${info.saldo})`}><input className="inp" type="number" min="1" max={info.saldo} value={pf.dias} onChange={(e) => setPf({ ...pf, dias: e.target.value })} /></Field>
            <Field label="Início"><input className="inp" type="date" value={pf.dataInicio} onChange={(e) => setPf({ ...pf, dataInicio: e.target.value })} /></Field>
            <Field label="Observação" span><input className="inp" value={pf.obs} onChange={(e) => setPf({ ...pf, obs: e.target.value })} placeholder="Ex: férias de fim de ano" /></Field>
          </div>
          <div style={{ marginTop: 12 }}>
            <Btn disabled={!podeProgramar} onClick={() => { onProgramar(colaborador.id, { dias: Number(pf.dias), dataInicio: pf.dataInicio, obs: pf.obs }); setPf({ dias: "", dataInicio: HOJE, obs: "" }); setProg(false); }}>Confirmar</Btn>
          </div>
        </Card>
      )}

      <Card style={{ padding: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Controle do saldo</div>
        <div style={{ display: "flex", padding: "4px 0", fontSize: 11.5, color: C.faint, textTransform: "uppercase", letterSpacing: 0.4 }}>
          <span style={{ flex: "0 0 100px" }}>Data</span><span style={{ flex: 1 }}>Movimento</span>
          <span style={{ flex: "0 0 70px", textAlign: "right" }}>Dias</span><span style={{ flex: "0 0 70px", textAlign: "right" }}>Saldo</span>
        </div>
        {linhaTab("—", "Saldo inicial", 30, 30, true)}
        {[...ferias.movimentos].sort((a, b) => a.data.localeCompare(b.data)).map((m) => linhaTab(dmy(m.data), m.obs || "Férias", -m.dias, m.saldoApos, false))}
      </Card>
    </div>
  );
}


export function ChecklistsTab({ colaborador, checks, onToggle }) {
  const Secao = ({ tipo, titulo, itens, cor }) => {
    const state = checks[tipo] || {};
    const feitos = itens.filter((i) => state[i.id]).length;
    const pct = Math.round((feitos / itens.length) * 100);
    return (
      <Card style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{titulo}</span>
          <span style={{ marginLeft: "auto", fontSize: 12.5, color: C.muted, fontFamily: MONO }}>{feitos}/{itens.length}</span>
        </div>
        <div style={{ height: 6, background: "#EEEDE7", borderRadius: 99, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: cor, borderRadius: 99, transition: "width .2s" }} />
        </div>
        <div style={{ display: "grid", gap: 2 }}>
          {itens.map((i) => {
            const on = !!state[i.id];
            return (
              <button key={i.id} className="btn" onClick={() => onToggle(colaborador.id, tipo, i.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: "7px 0", textAlign: "left", fontFamily: SANS }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, border: `1.5px solid ${on ? cor : C.borderStrong}`, background: on ? cor : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {on && <Check size={13} color="#fff" strokeWidth={3} />}
                </span>
                <span style={{ fontSize: 13.5, color: on ? C.faint : C.ink, textDecoration: on ? "line-through" : "none" }}>{i.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
    );
  };
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Secao tipo="admissao" titulo="Checklist de admissão" itens={CHECKLIST_ADMISSAO} cor="#256B3B" />
      <Secao tipo="desligamento" titulo="Checklist de desligamento" itens={CHECKLIST_DESLIGAMENTO} cor="#A83226" />
    </div>
  );
}


export function NotasTab({ colaborador, notas, competenciaAberta, podeEnviar, onEnviar, onReenviar, onVer }) {
  const [nf, setNf] = useState({ numero: "", valor: "", descricao: "", arquivo: "" });
  const mesRef = (s) => { if (!s) return ""; const [y, m] = s.split("-"); return `${m}/${y}`; };
  const ordenadas = [...notas].sort((a, b) => (b.enviadaEm || "").localeCompare(a.enviadaEm || ""));
  const jaEnviou = competenciaAberta && notas.some((n) => n.competencia === competenciaAberta && n.status !== "rejeitada");
  const mostrarForm = competenciaAberta && podeEnviar && !jaEnviou;
  const nfOk = nf.valor && !isNaN(parseFloat(nf.valor)) && nf.arquivo;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {competenciaAberta
        ? <Card style={{ padding: "12px 16px", background: "#E3F2E6", borderColor: "#BFE0C6", fontSize: 13, color: "#256B3B" }}>
            Competência <b style={{ fontFamily: MONO }}>{mesRef(competenciaAberta)}</b> aberta para envio de nota fiscal.
          </Card>
        : <Card style={{ padding: "12px 16px", fontSize: 13, color: C.muted }}>Nenhuma competência aberta no momento. Você verá aqui suas notas já enviadas.</Card>}

      {mostrarForm && (
        <Card style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Enviar nota — {mesRef(competenciaAberta)}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
            <Field label="Nº da nota"><input className="inp" value={nf.numero} onChange={(e) => setNf({ ...nf, numero: e.target.value })} placeholder="ex: 000123" /></Field>
            <Field label="Valor (R$)"><input className="inp" value={nf.valor} inputMode="decimal" onChange={(e) => setNf({ ...nf, valor: e.target.value.replace(",", ".") })} placeholder="0,00" /></Field>
            <Field label="Descrição do serviço" span><input className="inp" value={nf.descricao} onChange={(e) => setNf({ ...nf, descricao: e.target.value })} placeholder="ex: gestão de tráfego" /></Field>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            <label className="btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${C.borderStrong}`, background: "#fff", borderRadius: 9, padding: "8px 12px", cursor: "pointer", fontSize: 13, color: C.ink }}>
              <Paperclip size={14} /> {nf.arquivo || "Anexar PDF"}
              <input type="file" style={{ display: "none" }} onChange={(e) => { const n = e.target.files[0]?.name; if (n) setNf({ ...nf, arquivo: n }); }} />
            </label>
            <Btn disabled={!nfOk} onClick={() => { onEnviar(colaborador.id, { numero: nf.numero, valor: parseFloat(nf.valor), competencia: competenciaAberta, descricao: nf.descricao, arquivo: nf.arquivo }); setNf({ numero: "", valor: "", descricao: "", arquivo: "" }); }}>Enviar para análise</Btn>
          </div>
        </Card>
      )}
      {jaEnviou && <Card style={{ padding: "12px 16px", fontSize: 13, color: C.muted }}>Você já enviou a nota desta competência. Acompanhe o status abaixo.</Card>}

      <Card style={{ padding: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Minhas notas fiscais</div>
        {ordenadas.length === 0 && <div style={{ fontSize: 13, color: C.muted }}>Nenhuma nota enviada ainda.</div>}
        {ordenadas.map((n) => {
          const cfg = STATUS_NOTA[n.status] || STATUS_NOTA.pendente;
          return (
            <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 160px", minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Nota nº {n.numero}</div>
                <div style={{ fontSize: 12, color: C.faint }}>comp. {mesRef(n.competencia)} · enviada {dmy(n.enviadaEm)}</div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 13.5 }}>{brl(n.valor)}</div>
              <span style={{ background: cfg.bg, color: cfg.ink, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 999 }}>{cfg.label}</span>
              <Btn variant="ghost" onClick={() => onVer(n)}><Eye size={14} /> Ver</Btn>
              {n.status === "rejeitada" && podeEnviar && <Btn variant="ghost" onClick={() => onReenviar(n.id)}>Reenviar</Btn>}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export function Ficha({ colaborador: c, eventos, documentos, ferias, checks, notas = [], competenciaAberta = "", podeEnviarNota = false, podeEditar = true, verSensivel = true, onSalvar, onAddEvento, onUploadDoc, onAssinarDoc, onVerDoc, onDesligar, onReativar, onProgramarFerias, onToggleCheck, onEnviarNota, onReenviarNota, onVerNota, onVoltar }) {
  const [tab, setTab] = useState("historico");
  const [add, setAdd] = useState(false);
  const [ev, setEv] = useState({ tipo: "advertencia", data: HOJE, descricao: "" });
  const [deslig, setDeslig] = useState(false);
  const [dl, setDl] = useState({ data: HOJE, motivo: "" });
  const ordenados = [...eventos].sort((a, b) => b.data.localeCompare(a.data));

  const TabBtn = ({ id, label }) => (
    <button className="btn" onClick={() => setTab(id)}
      style={{ background: "none", border: "none", borderBottom: `2px solid ${tab === id ? C.blurple : "transparent"}`,
        color: tab === id ? C.ink : C.muted, fontSize: 14, fontWeight: 500, padding: "8px 2px", cursor: "pointer", fontFamily: SANS }}>{label}</button>
  );

  return (
    <div style={{ maxWidth: 720 }}>
      <button className="btn" onClick={onVoltar} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 13, fontFamily: SANS, padding: 0, marginBottom: 14 }}>
        <ArrowLeft size={15} /> Voltar
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <Avatar nome={c.nome} size={52} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{c.nome}</h1>
          <div style={{ fontSize: 13, color: C.muted }}>{c.cargo} · {c.setor}</div>
        </div>
        <StatusPill status={c.status} />
        {c.status === "ativo" && podeEditar && (
          <Btn variant="ghost" onClick={() => setDeslig(!deslig)}><UserX size={15} /> Desligar</Btn>
        )}
      </div>

      {c.status === "desligado" && (
        <Card style={{ padding: "14px 16px", marginBottom: 18, background: "#FAE7E4", borderColor: "#EDC9C3", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <UserX size={18} color={C.desligInk} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: C.desligInk }}>Desligado em {dmy(c.desligadoEm)}</div>
            {c.motivoDesligamento && <div style={{ fontSize: 12.5, color: "#8A5049" }}>{c.motivoDesligamento}</div>}
          </div>
          <Btn variant="ghost" onClick={() => onReativar(c.id)}><RotateCcw size={14} /> Reativar</Btn>
        </Card>
      )}

      {deslig && c.status === "ativo" && (
        <Card style={{ padding: 16, marginBottom: 18, borderColor: "#EDC9C3" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Desligar {primeiro(c.nome)}</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 14 }}>A pessoa sai da lista de ativos e vai para o Arquivo Morto, com todo o histórico preservado.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
            <Field label="Data do desligamento"><input className="inp" type="date" value={dl.data} onChange={(e) => setDl({ ...dl, data: e.target.value })} /></Field>
            <Field label="Motivo" span><input className="inp" value={dl.motivo} onChange={(e) => setDl({ ...dl, motivo: e.target.value })} placeholder="Ex: pedido de demissão, término de contrato…" /></Field>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="btn" onClick={() => { onDesligar(c.id, dl); setDeslig(false); }} style={{ background: C.desligBg, color: C.desligInk, border: "1px solid transparent", borderRadius: 10, padding: "9px 14px", fontSize: 13.5, fontWeight: 500, fontFamily: SANS, cursor: "pointer" }}>Confirmar desligamento</button>
            <Btn variant="ghost" onClick={() => setDeslig(false)}>Cancelar</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", gap: 22, borderBottom: `1px solid ${C.border}`, marginBottom: 18 }}>
        <TabBtn id="historico" label={`Histórico (${eventos.length})`} />
        <TabBtn id="ferias" label={`Férias (${ferias.saldo})`} />
        <TabBtn id="documentos" label={`Documentos (${documentos.length})`} />
        <TabBtn id="notas" label={`Notas fiscais (${notas.length})`} />
        <TabBtn id="checklists" label="Checklists" />
        <TabBtn id="dados" label="Dados" />
      </div>

      {tab === "historico" ? (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <Btn variant="ghost" onClick={() => setAdd(!add)}><Plus size={15} /> Adicionar evento</Btn>
          </div>
          {add && (
            <Card style={{ padding: 16, marginBottom: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="g2">
                <Field label="Tipo">
                  <select className="inp" value={ev.tipo} onChange={(e) => setEv({ ...ev, tipo: e.target.value })}>
                    {TIPOS_MANUAIS.map((t) => <option key={t} value={t}>{EVENTOS[t].label}</option>)}
                  </select>
                </Field>
                <Field label="Data"><input className="inp" type="date" value={ev.data} onChange={(e) => setEv({ ...ev, data: e.target.value })} /></Field>
                <Field label="Descrição" span><input className="inp" value={ev.descricao} onChange={(e) => setEv({ ...ev, descricao: e.target.value })} placeholder="O que aconteceu" /></Field>
              </div>
              <div style={{ marginTop: 12 }}>
                <Btn disabled={!ev.descricao.trim()} onClick={() => { onAddEvento(c.id, ev); setEv({ tipo: "advertencia", data: HOJE, descricao: "" }); setAdd(false); }}>Registrar</Btn>
              </div>
            </Card>
          )}
          <Card style={{ padding: 20 }}>
            {ordenados.length === 0 && <div style={{ fontSize: 13.5, color: C.muted }}>Sem eventos ainda.</div>}
            {ordenados.map((e, i) => {
              const cfg = EVENTOS[e.tipo] || EVENTOS.advertencia; const Icon = cfg.icon;
              return (
                <div key={e.id} style={{ display: "flex", gap: 12 }}>
                  <div style={{ position: "relative", width: 28, flexShrink: 0 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: cfg.cor + "1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={15} color={cfg.cor} />
                    </div>
                    {i < ordenados.length - 1 && <div style={{ position: "absolute", left: 13, top: 28, bottom: -6, width: 2, background: C.border }} />}
                  </div>
                  <div style={{ paddingBottom: 18, flex: 1 }}>
                    <div style={{ fontSize: 12, color: C.faint, fontFamily: MONO }}>{dmy(e.data)}</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{cfg.label}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{e.descricao}</div>
                  </div>
                </div>
              );
            })}
          </Card>
        </>
      ) : tab === "ferias" ? (
        <FeriasTab colaborador={c} ferias={ferias} onProgramar={onProgramarFerias} />
      ) : tab === "documentos" ? (
        <DocumentosTab colaborador={c} documentos={documentos} onUpload={onUploadDoc} onAssinar={onAssinarDoc} onVer={onVerDoc} />
      ) : tab === "notas" ? (
        <NotasTab colaborador={c} notas={notas} competenciaAberta={competenciaAberta} podeEnviar={podeEnviarNota} onEnviar={onEnviarNota} onReenviar={onReenviarNota} onVer={onVerNota} />
      ) : tab === "checklists" ? (
        <ChecklistsTab colaborador={c} checks={checks} onToggle={onToggleCheck} />
      ) : (
        <Cadastro inicial={c} embed verSensivel={verSensivel} podeEditar={podeEditar} onSalvar={(d) => { onSalvar(d); setTab("historico"); }} onVoltar={() => setTab("historico")} />
      )}
    </div>
  );
}


export function Lista({ colaboradores, onNovo, onAbrir, mostrarSalario = true, podeNovo = true }) {
  const [busca, setBusca] = useState("");
  const [fSetor, setFSetor] = useState("Todos");
  const [aba, setAba] = useState("ativos");
  const inp = { fontFamily: SANS, fontSize: 13, color: C.ink, background: "#fff",
    border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "8px 10px" };

  const nAtivos = colaboradores.filter((c) => c.status === "ativo").length;
  const nArquivo = colaboradores.filter((c) => c.status === "desligado").length;

  const base = colaboradores.filter((c) => (aba === "ativos" ? c.status === "ativo" : c.status === "desligado"));
  const filtrados = base.filter((c) => {
    const q = busca.toLowerCase();
    const bate = !q || [c.nome, c.cpf, c.cnpj, c.cargo, c.setor, c.banco, c.email, c.telefone].some((v) => (v || "").toLowerCase().includes(q));
    return bate && (fSetor === "Todos" || c.setor === fSetor);
  });

  const Seg = ({ id, label }) => (
    <button className="btn" onClick={() => setAba(id)} style={{ border: "none", cursor: "pointer", fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 8, background: aba === id ? "#fff" : "transparent", color: aba === id ? C.ink : C.muted, boxShadow: aba === id ? "0 1px 2px rgba(0,0,0,.08)" : "none" }}>{label}</button>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Colaboradores</h1>
        {aba === "ativos" && podeNovo && <Btn onClick={onNovo}><Plus size={16} /> Novo colaborador</Btn>}
      </div>

      <div style={{ display: "inline-flex", background: "#EEEDE7", borderRadius: 10, padding: 3, marginBottom: 16 }}>
        <Seg id="ativos" label={`Ativos (${nAtivos})`} />
        <Seg id="arquivo" label={`Arquivo morto (${nArquivo})`} />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${C.borderStrong}`, borderRadius: 9, padding: "0 10px", flex: "1 1 240px" }}>
          <Search size={16} color={C.faint} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome, CPF, cargo, setor, banco…" style={{ ...inp, border: "none", padding: "9px 0", flex: 1, outline: "none" }} />
        </div>
        <select style={inp} value={fSetor} onChange={(e) => setFSetor(e.target.value)}>
          <option>Todos</option>{SETORES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {filtrados.length === 0 && (
          <Card style={{ padding: 22, fontSize: 13.5, color: C.muted }}>
            {aba === "ativos" ? "Nenhum colaborador ativo com esses filtros." : "Arquivo morto vazio."}
          </Card>
        )}
        {filtrados.map((c) => (
          <Card key={c.id} className="row" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", flexWrap: "wrap" }}>
            <div onClick={() => onAbrir(c)} style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 240px", minWidth: 0 }}>
              <Avatar nome={c.nome} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{c.nome}</div>
                <div style={{ fontSize: 12.5, color: C.muted }}>{c.cargo} · {c.setor}</div>
              </div>
            </div>
            {aba === "ativos"
              ? (mostrarSalario ? <div style={{ fontFamily: MONO, fontSize: 13.5, color: C.ink }}>{brl(c.salario)}</div> : null)
              : <div style={{ fontSize: 12.5, color: C.faint }}>Desligado em {dmy(c.desligadoEm)}</div>}
            <StatusPill status={c.status} />
          </Card>
        ))}
      </div>
    </div>
  );
}


