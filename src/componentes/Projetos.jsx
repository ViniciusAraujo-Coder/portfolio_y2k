import { Cabecalho, Slot, IconeTec } from "./Pecas.jsx";
import { PROJETOS, SECOES, POR_NOME } from "../dados.js";
import useCarrossel from "../hooks/useCarrossel.js";

/**
 * 02 · PROJETOS — ambiente: dentro da máquina.
 * Um cartão por projeto: print, nome, uma frase, tecnologias e links.
 * Carrossel em todas as telas: 3 cartões por vez no PC, 2 no tablet, 1 no celular (o CSS decide),
 * passando sozinho de tempos em tempos (useCarrossel: pausa com mouse/foco em cima, botão Pausar,
 * fora da tela e para quem pediu menos movimento). Setas e bolinhas para navegar à mão.
 */
export default function Projetos() {
  const c = useCarrossel(PROJETOS.length);
  const rotulo = i => c.porVez === 1
    ? `Ver projeto ${i + 1}: ${PROJETOS[i].nome}`
    : `Ver projetos ${i + 1} a ${i + c.porVez}`;

  return (
    <section className="secao" id="projetos">
      <div className="container colagem colagem-projetos">
        <Cabecalho numero="02" olho="o que construí" titulo="projetos" texto={<>
          {SECOES.projetos} <span className="so-celular">Deslize para o lado para ver os outros.</span>
        </>}>
          <span className="etiqueta etiqueta-2" aria-hidden="true">!!!</span>
        </Cabecalho>

        <img className="sticker sticker-cubo revela" src="/assets/pack/cubo-ciano.svg" alt="" aria-hidden="true" loading="lazy" data-prof=".3" />

        <div className="vitrine revela" {...c.eventos}>
          <ul className="vitrine-lista" ref={c.trilho} onScroll={c.aoRolar} aria-label="Projetos">
            {PROJETOS.map(p => (
              <li key={p.id}>
                <article className="projeto-cartao">
                  <Slot className="projeto-tela" src={p.imagem} alt={`Tela do projeto ${p.nome}`} loading="lazy" />
                  <div className="projeto-info">
                    <h3>{p.nome}</h3>
                    <p className="projeto-resumo">{p.resumo}</p>
                    {/* rodapé do cartão: tecnologias à esquerda, links à direita (uma linha só no PC) */}
                    <div className="projeto-rodape">
                      <ul className="chips" aria-label="Tecnologias">
                        {p.tecnologias.map(t => <li key={t} className="chip">{POR_NOME[t]?.icone && <IconeTec nome={t} />}{t}</li>)}
                      </ul>
                      {(p.repositorio || p.demo) && (
                        <div className="acoes">
                          {p.demo && <a className="botao botao-azul" href={p.demo} target="_blank" rel="noopener" aria-label={`Abrir projeto ${p.nome} (nova aba)`}>Abrir projeto ↗</a>}
                          {p.repositorio && <a className="botao" href={p.repositorio} target="_blank" rel="noopener" aria-label={`Ver código do ${p.nome} (nova aba)`}>Ver código</a>}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          {/* controles: setas (PC/tablet), bolinhas = posições (onde você está) e pausa da troca automática */}
          <div className="vitrine-controles">
            <button type="button" className="botao seta" onClick={c.anterior} aria-label="Projetos anteriores">‹</button>
            <div className="bolinhas" role="group" aria-label="Escolher projeto">
              {Array.from({ length: c.posicoes }, (_, i) => (
                <button key={i} type="button" className="bolinha" aria-label={rotulo(i)}
                  aria-current={i === c.ativo} onClick={() => c.irPara(i)}><i /></button>
              ))}
            </div>
            <button type="button" className="botao seta" onClick={c.proximo} aria-label="Próximos projetos">›</button>
            {c.automatico && (
              <button type="button" className="botao pausa" onClick={c.alternaPausa} aria-pressed={c.pausado}>
                {c.pausado ? "Continuar" : "Pausar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
