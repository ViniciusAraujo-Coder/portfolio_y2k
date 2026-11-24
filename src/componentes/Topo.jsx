import { useLayoutEffect, useRef, useState } from "react";

const LINKS = [
  { id: "sobre", texto: "Sobre mim" },
  { id: "projetos", texto: "Projetos" },
  { id: "trajetoria", texto: "Trajetória" },
  { id: "competencias", texto: "Competências" },
];

/** Menu fixo no topo. O "indicador" azul desliza até o link da seção atual. */
export default function Topo({ secaoAtual }) {
  const [aberto, setAberto] = useState(false);
  const [indicador, setIndicador] = useState({ opacity: 0 });
  const refs = useRef({});

  useLayoutEffect(() => {
    const ativo = refs.current[secaoAtual];
    setIndicador(ativo
      ? { opacity: 1, transform: `translateX(${ativo.offsetLeft}px)`, width: ativo.offsetWidth }
      : { opacity: 0 });
  }, [secaoAtual]);

  const fecha = () => setAberto(false);

  return (
    <header className={`topo${aberto ? " aberto" : ""}`}>
      <a className="logo" href="#inicio"><span className="logo-orb" aria-hidden="true" />vinicius<b>.exe</b></a>
      <nav className="links" aria-label="Principal">
        <span className="indicador" aria-hidden="true" style={indicador} />
        {LINKS.map(l => (
          <a key={l.id} href={`#${l.id}`} ref={el => (refs.current[l.id] = el)} aria-current={secaoAtual === l.id}>{l.texto}</a>
        ))}
      </nav>
      <a className="botao botao-lima topo-cta" href="#contato">Contato</a>
      <button className="menu-botao botao" aria-expanded={aberto} aria-controls="menu-celular" onClick={() => setAberto(a => !a)}>Menu</button>
      <nav className="menu-celular" id="menu-celular" aria-label="Principal (celular)">
        {[...LINKS, { id: "contato", texto: "Contato" }].map(l => <a key={l.id} href={`#${l.id}`} onClick={fecha}>{l.texto}</a>)}
      </nav>
    </header>
  );
}
