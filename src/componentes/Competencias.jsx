import Janela from "./Janela.jsx";
import { Cabecalho, IconeTec } from "./Pecas.jsx";
import { COMPETENCIAS, SECOES } from "../dados.js";

const GRUPOS = [...new Set(COMPETENCIAS.map(c => c.grupo))];
// posição de cada tecnologia na lista toda: os ícones entram um depois do outro (--n no CSS)
const ORDEM = Object.fromEntries(COMPETENCIAS.map((c, i) => [c.nome, i]));

/**
 * 04 · COMPETÊNCIAS — ambiente: amanhecer de aço.
 * Só o que eu sei usar: um cartão por grupo (nome + explicação curta) com os ícones cromados.
 * Nada para clicar: é uma lista para ler de relance.
 */
export default function Competencias() {
  return (
    <section className="secao" id="competencias">
      <div className="container colagem colagem-competencias">
        <Cabecalho numero="04" olho="com o que trabalho" titulo="competências" texto={SECOES.competencias}>
          <span className="estrelas" aria-hidden="true">
            <img className="e1" src="assets/pack/explosao-lima.svg" alt="" />
            <img className="e2" src="assets/pack/brilho-cromo.svg" alt="" />
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
                      <li key={c.nome} className="tec" style={{ "--n": ORDEM[c.nome] }}>
                        <span className="tec-bolha" aria-hidden="true"><IconeTec nome={c.nome} /></span><span>{c.nome}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Janela>

        <img className="sticker sticker-globo revela" src="assets/pack/globo-arame-branco.svg" alt="" aria-hidden="true" loading="lazy" data-prof=".35" />
      </div>
    </section>
  );
}
