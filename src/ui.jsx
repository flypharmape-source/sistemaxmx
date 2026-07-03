/* Componentes de UI reutilizáveis. */
import { C, MONO, SANS } from "./theme";

export function Card({ children, style, ...rest }) {
  return <div {...rest} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, ...style }}>{children}</div>;
}
export function Btn({ children, onClick, variant = "primary", disabled, style }) {
  const v = { primary: { bg: C.blurple, ink: "#fff", bd: C.blurple }, ghost: { bg: "#fff", ink: C.ink, bd: C.borderStrong } }[variant];
  return (
    <button className="btn" onClick={onClick} disabled={disabled}
      style={{ display: "inline-flex", alignItems: "center", gap: 7, background: v.bg, color: v.ink,
        border: `1px solid ${v.bd}`, borderRadius: 10, padding: "9px 14px", fontSize: 13.5, fontWeight: 500,
        fontFamily: SANS, opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto", ...style }}>{children}</button>
  );
}
export function Field({ label, children, span }) {
  return (
    <label style={{ display: "block", gridColumn: span ? "1 / -1" : "auto" }}>
      <span style={{ display: "block", fontSize: 12, color: C.muted, fontWeight: 500, marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}
export function Avatar({ nome, size = 38 }) {
  const ini = nome.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "#8B8D97", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 600, flexShrink: 0 }}>{ini}</div>
  );
}
export function StatusPill({ status }) {
  const on = status === "ativo";
  return (
    <span style={{ background: on ? C.ativoBg : C.desligBg, color: on ? C.ativoInk : C.desligInk,
      fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 999 }}>{on ? "Ativo" : "Desligado"}</span>
  );
}

