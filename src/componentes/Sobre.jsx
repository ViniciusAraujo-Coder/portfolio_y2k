import Janela from "./Janela.jsx";
import { Cabecalho, BotaoCurriculo, comMarca } from "./Pecas.jsx";
import { SOBRE, SECOES } from "../dados.js";

/**
 * 01 · SOBRE MIM — ambiente: na superfície do CD.
 * Pouco texto, mais elementos, tudo bem separado:
 *   janela com UMA frase + botões → 4 cartões (ícone + 2 palavras) → mural de aparelhos ao lado.
 * Cada cartão é uma peça própria (.revela), então eles entram um depois do outro.
 */
export default function Sobre() {
  return (
    <section className="secao" id="sobre">
      <div className="container colagem colagem-sobre">
        <Cabecalho numero="01" olho="quem sou" titulo="sobre mim" texto={SECOES.sobre}>
          <img className="brilho-titulo cintila" src="/assets/pack/brilho-longo-cromo.svg" alt="" aria-hidden="true" />
        </Cabecalho>

        <Janela como="article" titulo="sobre_mim.txt" className="revela notepad" inclinacao={-.8}>
          <div className="notepad-corpo">
            <p className="destaque">{comMarca(SOBRE.destaque)}</p>
            <div className="sobre-acoes">
              <BotaoCurriculo />
              <a className="botao" href="#trajetoria">Ver trajetória ↓</a>
            </div>
          </div>
        </Janela>

        {/* <ul>: são itens de uma lista (4 coisas sobre mim), cada um vira um cartão */}
        <ul className="sobre-cartoes" aria-label="Um pouco sobre mim">
          {SOBRE.cartoes.map(c => (
            <li key={c.rotulo} className="cartao-sobre revela">
              <span className={`cartao-sobre-icone${c.cromo ? " cromo" : ""}`} aria-hidden="true"><img src={c.icone} alt="" loading="lazy" /></span>
              <span className="cartao-sobre-texto">
                <small>{c.rotulo}</small>
                <strong>{c.valor}</strong>
                <span>{c.detalhe}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Grupo "aparelhos": duas fotos de tecnologia dos anos 2000 presas no mural */}
        <div className="mural revela" role="group" aria-label="Colagem de aparelhos dos anos 2000">
          <figure className="polaroid polaroid-1"><img src="/assets/y2k/camera-digital.jpg" alt="Câmera digital compacta prateada dos anos 2000" loading="lazy" /><figcaption>câmera digital · 2004</figcaption></figure>
          <figure className="polaroid polaroid-2"><img src="/assets/y2k/nokia-3310.jpg" alt="Celular Nokia 3310" loading="lazy" /><figcaption>nokia 3310 · indestrutível</figcaption></figure>
          <img className="sticker sticker-espiral" src="/assets/pack/espiral-branco.svg" alt="" aria-hidden="true" loading="lazy" data-prof=".15" />
          <img className="sticker sticker-brilho-fino" src="/assets/pack/brilho-fino-cromo.svg" alt="" aria-hidden="true" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
