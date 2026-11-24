import { useRef, useState } from "react";
import Janela from "./Janela.jsx";
import { Cabecalho } from "./Pecas.jsx";
import { TRAJETORIA, CURSOS, SECOES } from "../dados.js";

const ABAS = [
  { id: "estudos", nome: "Estudos", itens: TRAJETORIA },
  { id: "cursos", nome: "Cursos", itens: CURSOS },
];

/**
 * 03 · TRAJETÓRIA — ambiente: noite estrelada.
 * O CD Player continua sendo a "moldura"; dentro dele, uma linha do tempo com duas abas
 * (Estudos e Cursos). Cada parada: quando · bolinha na linha · cartão (título, onde, mini texto).
 * PC: linha HORIZONTAL, um cartão por parada lado a lado. Celular: linha vertical (CSS).
 */
export default function Trajetoria() {
  const [aba, setAba] = useState(ABAS[0].id);
  const botoes = useRef([]);
  const i = ABAS.findIndex(a => a.id === aba);
  const atual = ABAS[i];

  // padrão de abas acessível: setas ← → trocam de aba e levam o foco junto
  function teclas(ev) {
    const passo = { ArrowRight: 1, ArrowLeft: -1 }[ev.key];
    if (!passo) return;
    ev.preventDefault();
    const novo = (i + passo + ABAS.length) % ABAS.length;
    setAba(ABAS[novo].id);
    botoes.current[novo]?.focus();
  }

  return (
    <section className="secao" id="trajetoria">
      <div className="container colagem colagem-trajetoria">
        <Cabecalho numero="03" olho="meu caminho" titulo="trajetória" texto={SECOES.trajetoria}>
          <img className="brilho-titulo cintila" src="/assets/pack/brilho-triplo-lima.svg" alt="" aria-hidden="true" />
        </Cabecalho>

        <Janela titulo="CD Player — trajetoria.cda" variante="98" barra98 className="revela cdplayer" inclinacao={.8}>
          <div className="abas" role="tablist" aria-label="Trajetória">
            {ABAS.map((a, n) => (
              <button key={a.id} id={`aba-${a.id}`} ref={el => (botoes.current[n] = el)} type="button" role="tab" className="aba"
                aria-selected={a.id === aba} aria-controls="painel-trajetoria" tabIndex={a.id === aba ? 0 : -1}
                onClick={() => setAba(a.id)} onKeyDown={teclas}>
                {a.nome}
              </button>
            ))}
          </div>

          {/* key={aba}: ao trocar de aba a lista é recriada e "aparece" de novo (animação curta no CSS) */}
          <ol key={aba} className="linha-tempo" id="painel-trajetoria" role="tabpanel" aria-labelledby={`aba-${aba}`}>
            {atual.itens.map((t, n) => (
              <li key={t.titulo} className={`etapa${t.atual ? " atual" : ""}`} style={{ "--n": n }}>
                <span className="etapa-quando">{t.quando}</span>
                {/* título, local e texto em linhas separadas: cada informação no seu lugar */}
                <div className="etapa-cartao">
                  {/* etiqueta de "faixa" do CD: a atual aparece como "tocando agora" */}
                  <p className="etapa-faixa" aria-hidden="true">
                    {t.atual
                      ? <>▶ tocando agora <span className="equalizador"><i /><i /><i /><i /></span></>
                      : `faixa ${String(n + 1).padStart(2, "0")}`}
                  </p>
                  <h3>{t.titulo}</h3>
                  <p className="etapa-local">{t.local}</p>
                  <p className="etapa-texto">{t.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </Janela>

        {/* Grupo "a trilha": o CD volta, agora como uma lua sobre o Discman */}
        <div className="trilha revela" aria-hidden="true">
          <img className="sticker geo geo-orbita" src="/assets/pack/orbita-ciano.svg" alt="" loading="lazy" />
          <img className="sticker sticker-cadente" src="/assets/pack/estrela-cadente-cromo.svg" alt="" loading="lazy" data-prof=".5" />
          <img className="sticker cd-girando" src="/assets/recortes/cd.webp" alt="" loading="lazy" data-prof=".35" />
          <img className="sticker sticker-portatil" src="/assets/recortes/cd-portatil.webp" alt="" loading="lazy" />
          <p className="balao-fala balao-3">próxima faixa: <b>seu time?</b></p>
        </div>
      </div>
    </section>
  );
}
