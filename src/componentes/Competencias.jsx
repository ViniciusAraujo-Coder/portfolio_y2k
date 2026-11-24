import { useEffect, useState } from "react";
import Janela from "./Janela.jsx";
import { Cabecalho, IconeTec } from "./Pecas.jsx";
import { COMPETENCIAS, POR_NOME, PROJETOS, SECOES } from "../dados.js";
import { reduz } from "../util.js";

const GRUPOS = [...new Set(COMPETENCIAS.map(c => c.grupo))];
// posição de cada tecnologia na lista toda: os ícones entram um depois do outro (--n no CSS)
const ORDEM = Object.fromEntries(COMPETENCIAS.map((c, i) => [c.nome, i]));

/**
 * 04 · COMPETÊNCIAS — ambiente: amanhecer de aço.
 * Painel de controle com um CARTÃO por grupo (nome + explicação curta) e ícones cromados.
 * Escolher uma tecnologia mostra os detalhes (onde aprendi, em qual projeto usei):
 *   PC: na janela "Detalhes" ao lado.  Celular: logo abaixo do grupo tocado (sem precisar rolar).
 * "Usei no projeto" leva direto ao projeto (abreProjeto vem do App).
 */
export default function Competencias({ abreProjeto }) {
  const [escolhida, setEscolhida] = useState("Java");
  const grupoEscolhido = POR_NOME[escolhida].grupo;

  return (
    <section className="secao" id="competencias">
      <div className="container colagem colagem-competencias">
        <Cabecalho numero="04" olho="com o que trabalho" titulo="competências" texto={SECOES.competencias}>
          <span className="estrelas" aria-hidden="true">
            <img className="e1" src="/assets/pack/explosao-lima.svg" alt="" />
            <img className="e2" src="/assets/pack/brilho-cromo.svg" alt="" />
          </span>
        </Cabecalho>

        <Janela titulo="Painel de controle — competências" className="revela painel" inclinacao={-.6}>
          <div className="comp-grupos">
            {GRUPOS.map(grupo => {
              const [nome, explica] = grupo.split(" · "); // "Back-end · por trás do site" → título + explicação
              return (
                <section key={grupo} className="grupo">
                  <h3>{nome}{explica && <small>{explica}</small>}</h3>
                  <ul className="tecs">
                    {COMPETENCIAS.filter(c => c.grupo === grupo).map(c => (
                      <li key={c.nome} style={{ "--n": ORDEM[c.nome] }}>
                        <button type="button" className="tec" aria-pressed={c.nome === escolhida}
                          onMouseEnter={() => setEscolhida(c.nome)} onFocus={() => setEscolhida(c.nome)} onClick={() => setEscolhida(c.nome)}>
                          <span className="tec-bolha"><IconeTec nome={c.nome} /></span><span>{c.nome}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* celular: os detalhes abrem aqui mesmo, embaixo do grupo tocado */}
                  {grupo === grupoEscolhido && (
                    <div className="comp-aqui so-celular"><Propriedades nome={escolhida} abreProjeto={abreProjeto} /></div>
                  )}
                </section>
              );
            })}
          </div>
        </Janela>

        <Janela titulo="Detalhes" variante="98" barra98 botoes={["?", "×"]} className="revela comp-janela so-pc" inclinacao={2}>
          <Propriedades nome={escolhida} abreProjeto={abreProjeto} />
        </Janela>

        <img className="sticker sticker-globo revela" src="/assets/pack/globo-arame-branco.svg" alt="" aria-hidden="true" loading="lazy" data-prof=".35" />
      </div>
    </section>
  );
}

/** Detalhe da tecnologia. Ao trocar, o conteúdo some e volta (transição curta no CSS). */
function Propriedades({ nome, abreProjeto }) {
  const [exibida, setExibida] = useState(nome);
  const [trocando, setTrocando] = useState(false);

  useEffect(() => {
    if (nome === exibida) return;
    setTrocando(true);
    const t = setTimeout(() => { setExibida(nome); setTrocando(false); }, reduz ? 0 : 200);
    return () => clearTimeout(t);
  }, [nome]); // eslint-disable-line react-hooks/exhaustive-deps

  const c = POR_NOME[exibida];
  const usados = PROJETOS.filter(p => p.tecnologias.includes(exibida));
  return (
    <div className={`comp-info${trocando ? " trocando" : ""}`} aria-live="polite">
      <div className="comp-info-logo"><IconeTec nome={exibida} /></div>
      <div>
        <span className="tipo">{c.tipo}</span>
        <h3>{c.nome}</h3>
      </div>
      {c.aprendi && <p className="aprendi"><small>Onde aprendi</small>{c.aprendi}</p>}
      {usados.length > 0 && (
        <div className="usado">
          <small>Usei no projeto</small>
          {usados.map(p => <button key={p.id} type="button" onClick={() => abreProjeto(p.id)}>{p.nome} →</button>)}
        </div>
      )}
    </div>
  );
}
