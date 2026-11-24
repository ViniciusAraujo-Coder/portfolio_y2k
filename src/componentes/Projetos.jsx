import { useEffect, useRef, useState } from "react";
import Janela from "./Janela.jsx";
import { Cabecalho, Slot, IconeTec } from "./Pecas.jsx";
import { PROJETOS, GITHUB, SECOES, POR_NOME } from "../dados.js";
import { reduz } from "../util.js";

const CATEGORIAS = ["Todos", ...new Set(PROJETOS.map(p => p.categoria))];

/**
 * 02 · PROJETOS — ambiente: dentro da máquina.
 * Duas apresentações do MESMO conteúdo, escolhidas pelo tamanho da tela (CSS):
 *   PC/tablet (.so-pc): explorador com pastas → janela com o projeto aberto (a estética retrô).
 *   Celular (.so-celular): carrossel de cartões grandes, um projeto por vez, deslizando
 *   para o lado, com bolinhas embaixo mostrando quantos são e em qual você está.
 * "destaque" vem do App: Competências e Zezinho apontam um projeto → ele abre/aparece.
 */
export default function Projetos({ destaque }) {
  const [filtro, setFiltro] = useState("Todos");
  const [projetoAtual, setProjetoAtual] = useState(PROJETOS[0].id);
  const [aceso, setAceso] = useState(null);
  const visiveis = PROJETOS.filter(p => filtro === "Todos" || p.categoria === filtro);

  // carrossel do celular
  const trilho = useRef(null);
  const [ativo, setAtivo] = useState(0);
  const irPara = i => {
    const el = trilho.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: reduz ? "auto" : "smooth" });
  };
  // cada cartão ocupa a largura inteira do trilho: posição ÷ largura = número do cartão à vista
  const aoDeslizar = () => {
    const el = trilho.current;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== ativo) setAtivo(i);
  };

  // pedido de fora (Competências/Zezinho): mostra todos, abre o projeto e o leva para a vista
  useEffect(() => {
    if (!destaque) return;
    setFiltro("Todos");
    setProjetoAtual(destaque.id);
    setAceso(destaque.id);
    irPara(PROJETOS.findIndex(p => p.id === destaque.id));
    const t = setTimeout(() => setAceso(null), 2600);
    return () => clearTimeout(t);
  }, [destaque]); // eslint-disable-line react-hooks/exhaustive-deps

  // se o filtro esconder o projeto aberto, abre o primeiro visível
  useEffect(() => {
    if (!visiveis.some(p => p.id === projetoAtual)) setProjetoAtual(visiveis[0].id);
  }, [filtro]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="secao" id="projetos">
      <div className="container colagem colagem-projetos">
        <Cabecalho numero="02" olho="o que construí" titulo="projetos" texto={<>
          {SECOES.projetos} <span className="so-pc">Escolha uma pasta para ver os detalhes.</span>
          <span className="so-celular">Deslize para o lado para ver os outros.</span>
        </>}>
          <span className="etiqueta etiqueta-2" aria-hidden="true">!!!</span>
        </Cabecalho>

        <img className="sticker sticker-cubo revela" src="/assets/pack/cubo-ciano.svg" alt="" aria-hidden="true" loading="lazy" data-prof=".3" />

        {/* ---------- PC: explorador + projeto aberto ---------- */}
        <Janela titulo="C:\Meus Projetos" className="revela explorer so-pc" inclinacao={-1}>
          <div className="filtros" role="group" aria-label="Filtrar projetos">
            {CATEGORIAS.map(cat => (
              <button key={cat} type="button" className="filtro" aria-pressed={cat === filtro} onClick={() => setFiltro(cat)}>
                {cat}<small>{cat === "Todos" ? PROJETOS.length : PROJETOS.filter(p => p.categoria === cat).length}</small>
              </button>
            ))}
          </div>
          <ul className="projetos-lista" aria-label="Escolha um projeto">
            {visiveis.map(p => (
              <li key={p.id}>
                <button type="button" className="projeto-item" aria-current={p.id === projetoAtual} onClick={() => setProjetoAtual(p.id)}>
                  <span className="pasta" aria-hidden="true" /><strong>{p.nome}</strong><small>{p.categoria}</small>
                </button>
              </li>
            ))}
          </ul>
          <p className="janela-status" aria-hidden="true">escolha uma pasta para ver o projeto</p>
        </Janela>

        <ProjetoAberto id={projetoAtual} />

        {/* ---------- Celular: carrossel de cartões ---------- */}
        <div className="carrossel so-celular revela">
          <ul className="carrossel-trilho" ref={trilho} onScroll={aoDeslizar} tabIndex={0}
            aria-label="Projetos: deslize para o lado para ver os outros">
            {PROJETOS.map((p, i) => (
              <li key={p.id} aria-label={`Projeto ${i + 1} de ${PROJETOS.length}`}>
                <article className="projeto-cartao" data-aceso={aceso === p.id}>
                  <Slot className="projeto-tela" src={p.imagem} alt={`Tela do projeto ${p.nome}`} loading="lazy" />
                  <div className="projeto-info">
                    <span className="projeto-selo">{p.categoria}</span>
                    <h3>{p.nome}</h3>
                    <p className="projeto-resumo">{p.resumo}</p>
                    <p className="projeto-papel">{p.papel}</p>
                    {p.tecnologias.length > 0 && (
                      <ul className="chips" aria-label="Tecnologias">
                        {p.tecnologias.map(t => <li key={t} className="chip">{POR_NOME[t]?.icone && <IconeTec nome={t} />}{t}</li>)}
                      </ul>
                    )}
                    {(p.repositorio || p.demo) && (
                      <div className="acoes">
                        {p.repositorio && <a className="botao botao-azul" href={p.repositorio} target="_blank" rel="noopener">Ver código</a>}
                        {p.demo && <a className="botao" href={p.demo} target="_blank" rel="noopener">Abrir projeto ↗</a>}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
          {/* bolinhas: mostram que há mais projetos e em qual você está; tocar leva até ele */}
          <div className="bolinhas" role="group" aria-label="Escolher projeto">
            {PROJETOS.map((p, i) => (
              <button key={p.id} type="button" className="bolinha" aria-label={`Ver projeto ${i + 1}: ${p.nome}`}
                aria-current={i === ativo} onClick={() => irPara(i)}><i /></button>
            ))}
          </div>
        </div>

        {/* recorte decorativo embaixo do explorador (só no PC) */}
        <div className="salvar revela so-pc" aria-hidden="true">
          <img className="sticker sticker-disquetes" src="/assets/recortes/disquetes.webp" alt="" loading="lazy" data-prof=".3" />
        </div>
      </div>
    </section>
  );
}

/** Janela do projeto aberto (PC). Ao trocar de projeto, o conteúdo "pisca" (some e volta). */
function ProjetoAberto({ id }) {
  const [exibido, setExibido] = useState(id);
  const [trocando, setTrocando] = useState(false);

  useEffect(() => {
    if (id === exibido) return;
    setTrocando(true);
    const t = setTimeout(() => { setExibido(id); setTrocando(false); }, reduz ? 0 : 260);
    return () => clearTimeout(t);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const p = PROJETOS.find(x => x.id === exibido);
  return (
    <Janela como="article" titulo={`projeto.exe — ${p.nome}`} variante="98" className="revela projeto-destaque so-pc" inclinacao={1}
      aria-live="polite" data-trocando={trocando}>
      <div className="destaque-corpo">
        <Slot key={p.id} className="tela" src={p.imagem} alt={`Tela do projeto ${p.nome}`} loading="lazy" />
        <div className="info">
          <span className="categoria">{p.categoria}</span>
          <h3>{p.nome}</h3>
          <p className="resumo">{p.resumo}</p>
          <p className="papel"><b>Meu papel:</b> {p.papel}</p>
          {p.tecnologias.length > 0 && (
            <ul className="chips" aria-label="Tecnologias">
              {p.tecnologias.map(t => <li key={t} className="chip">{POR_NOME[t]?.icone && <IconeTec nome={t} />}{t}</li>)}
            </ul>
          )}
          <div className="acoes">
            <a className="botao botao-azul" href={p.repositorio || GITHUB} target="_blank" rel="noopener">{p.repositorio ? "Ver código" : "Ver no GitHub"}</a>
            {p.demo && <a className="botao" href={p.demo} target="_blank" rel="noopener">Abrir projeto ↗</a>}
          </div>
        </div>
      </div>
    </Janela>
  );
}
