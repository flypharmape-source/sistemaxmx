/* Central de pendências do líder: obrigações com prazo, status e confirmação de escala. */
import { useState } from "react";
import { AlertTriangle, Check, CalendarClock, ArrowRight } from "lucide-react";
import { C, MONO, SANS } from "../theme";
import { STATUS_PEND, statusPendencia, dmy, diasEntre, HOJE } from "../core";
import { Card, Btn, Avatar } from "../ui";

export function Pendencias({ pendencias, colaboradores, confirmacoes, mesesFechados = [], role = "gestor", onConcluir, onSetConfirmacao, onNav }) {
  const [aberta, setAberta] = useState(null);
  const nomeDe = (id) => (colaboradores.find((c) => c.id === id) || {}).nome || "—";

  const ordem = { atrasada: 0, pendente: 1, concluida: 2 };
  const lista = [...pendencias].sort((a, b) => ordem[statusPendencia(a)] - ordem[statusPendencia(b)] || (a.prazo || "").localeCompare(b.prazo || ""));
  const abertas = pendencias.filter((p) => statusPendencia(p) !== "concluida").length;

  const prazoTexto = (p, st) => {
    const d = diasEntre(HOJE, p.prazo);
    if (st === "atrasada") return `atrasada há ${Math.abs(d)} dia(s)`;
    if (st === "concluida") return p.concluidaEm ? `concluída em ${dmy(p.concluidaEm)}` : "concluída";
    return d === 0 ? "vence hoje" : `vence em ${d} dia(s)`;
  };

  return (
    <div style={{ maxWidth: 780 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Minhas pendências</h1>
      <p style={{ fontSize: 13.5, color: C.muted, margin: "0 0 16px" }}>
        {role === "gestor" ? "Obrigações da sua equipe, com prazo e status." : "Pendências dos líderes (visão de acompanhamento)."}
        {abertas > 0 ? ` ${abertas} em aberto.` : " Tudo em dia."}
      </p>

      <div style={{ display: "grid", gap: 10 }}>
        {lista.length === 0 && <Card style={{ padding: 22, fontSize: 13.5, color: C.muted }}>Nenhuma pendência no momento.</Card>}
        {lista.map((p) => {
          const st = statusPendencia(p);
          const cfg = STATUS_PEND[st];
          const fechado = mesesFechados.includes(p.competencia);
          const equipe = colaboradores.filter((c) => c.status === "ativo" && c.setor === p.setor);
          const conf = (confirmacoes && confirmacoes[p.id]) || {};
          return (
            <Card key={p.id} style={{ padding: 16, borderColor: st === "atrasada" ? "#EDC9C3" : C.border }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {st === "concluida" ? <Check size={17} color={cfg.ink} /> : st === "atrasada" ? <AlertTriangle size={17} color={cfg.ink} /> : <CalendarClock size={17} color={cfg.ink} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{p.titulo}</div>
                  <div style={{ fontSize: 12.5, color: C.muted }}>{p.sub}</div>
                  <div style={{ fontSize: 12, color: st === "atrasada" ? cfg.ink : C.faint, marginTop: 3 }}>
                    Prazo {dmy(p.prazo)} · {prazoTexto(p, st)}
                    {role !== "gestor" && ` · responsável: ${nomeDe(p.responsavelId)}`}
                  </div>
                </div>
                <span style={{ background: cfg.bg, color: cfg.ink, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>{cfg.label}</span>
              </div>

              {st === "atrasada" && (
                <div style={{ fontSize: 12, color: cfg.ink, marginTop: 8 }}>Responsabilidade registrada em {nomeDe(p.responsavelId)}.</div>
              )}

              {fechado ? (
                <div style={{ fontSize: 12.5, color: C.faint, marginTop: 12 }}>Mês {p.competencia} fechado pelo Financeiro — sem alterações.</div>
              ) : st !== "concluida" && (
                <div style={{ marginTop: 12 }}>
                  {p.tipo === "escala_cadastrar" && (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Btn variant="ghost" onClick={() => onNav("escala")}>Abrir escala <ArrowRight size={14} /></Btn>
                      <Btn onClick={() => onConcluir(p)}>Marcar como concluída</Btn>
                    </div>
                  )}
                  {p.tipo === "escala_confirmar" && (
                    <div>
                      {aberta !== p.id ? (
                        <Btn variant="ghost" onClick={() => setAberta(p.id)}>Confirmar quem trabalhou</Btn>
                      ) : (
                        <Card style={{ padding: 12, marginTop: 4 }}>
                          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 8 }}>Marque quem realmente trabalhou (faltas/substituições):</div>
                          {equipe.map((c) => {
                            const v = conf[c.id] || "confirmado";
                            return (
                              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                                <Avatar nome={c.nome} size={26} />
                                <span style={{ flex: 1, fontSize: 13.5 }}>{c.nome}</span>
                                {["confirmado", "faltou"].map((opt) => (
                                  <button key={opt} className="btn" onClick={() => onSetConfirmacao(p.id, c.id, opt)}
                                    style={{ border: `1px solid ${v === opt ? (opt === "faltou" ? "#A83226" : "#256B3B") : C.borderStrong}`, background: v === opt ? (opt === "faltou" ? "#FAE7E4" : "#E3F2E6") : "#fff", color: v === opt ? (opt === "faltou" ? "#A83226" : "#256B3B") : C.muted, borderRadius: 8, padding: "5px 10px", fontSize: 12.5, cursor: "pointer", fontFamily: SANS }}>
                                    {opt === "faltou" ? "Faltou" : "Trabalhou"}
                                  </button>
                                ))}
                              </div>
                            );
                          })}
                          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                            <Btn onClick={() => { onConcluir(p); setAberta(null); }}>Concluir confirmação</Btn>
                            <Btn variant="ghost" onClick={() => setAberta(null)}>Cancelar</Btn>
                          </div>
                        </Card>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
