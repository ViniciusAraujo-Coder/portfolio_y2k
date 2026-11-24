/**
 * Janela retrô reutilizável (a peça que aparece em todas as seções).
 *
 * <Janela titulo="sobre_mim.txt" variante="xp" inclinacao={-0.8} menu={...}>conteúdo</Janela>
 *
 * - variante: "xp" (padrão, vidro escuro) · "98" (metal com relevo) · "grafite" (barra metálica)
 * - barra98: usa a barra estilo 98 mesmo numa janela "xp" (ex.: webcam)
 * - inclinacao: graus de rotação (deixa a colagem "solta")
 * - botoes: os botõezinhos da barra de título (só decoração)
 * - menu: a linha "Arquivo Editar..." (opcional)
 * - como: a tag HTML usada ("div", "article", "figure"...)
 */
export default function Janela({
  titulo, variante = "xp", barra98 = false, inclinacao = 0, botoes = ["_", "□", "×"],
  menu, como: Tag = "div", className = "", style, children, ...resto
}) {
  const classes = ["janela", variante === "98" && "janela-98", variante === "grafite" && "janela-grafite", className]
    .filter(Boolean).join(" ");
  return (
    <Tag className={classes} style={{ "--r": `${inclinacao}deg`, ...style }} {...resto}>
      <div className={`janela-barra${barra98 ? " janela-barra-98" : ""}`}>
        <span>{titulo}</span>
        <span className="janela-botoes" aria-hidden="true">{botoes.map((b, i) => <i key={i}>{b}</i>)}</span>
      </div>
      {menu && <div className="janela-menu" aria-hidden="true">{menu}</div>}
      {children}
    </Tag>
  );
}
