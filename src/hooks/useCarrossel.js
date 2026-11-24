import { useCallback, useEffect, useRef, useState } from "react";
import { reduz } from "../util.js";

const INTERVALO = 5000; // ms parado em cada posição antes de passar para a próxima

/**
 * Carrossel com troca automática, para uma lista com scroll horizontal (scroll-snap no CSS).
 * Quantos cartões cabem por vez vem do CSS (3 no PC, 2 no tablet, 1 no celular): aqui só medimos.
 *
 * A troca automática PARA quando:
 *   - a pessoa pediu menos movimento no sistema (prefers-reduced-motion) — nem começa;
 *   - o mouse está em cima ou o foco do teclado está dentro (está lendo/escolhendo);
 *   - o botão "Pausar" foi apertado;
 *   - a vitrine não está na tela (não gira escondida).
 * Qualquer interação manual (setas, bolinhas, arrastar) reinicia a contagem.
 */
export default function useCarrossel(total) {
  const trilho = useRef(null);
  const [ativo, setAtivo] = useState(0);
  const [porVez, setPorVez] = useState(1);
  const [pausado, setPausado] = useState(reduz);
  const [ocupado, setOcupado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [vez, setVez] = useState(0); // muda a cada interação manual: reinicia o relógio
  const posicoes = Math.max(1, total - porVez + 1);

  // distância entre o começo de um cartão e o do próximo (largura + espaço)
  const passo = () => {
    const el = trilho.current;
    const itens = el?.children;
    return itens?.length > 1 ? itens[1].offsetLeft - itens[0].offsetLeft : el?.clientWidth || 1;
  };

  const irPara = useCallback(i => {
    trilho.current?.scrollTo({ left: i * passo(), behavior: reduz ? "auto" : "smooth" });
  }, []);

  // quantos cabem por vez: recalcula quando a largura muda (girar o celular, redimensionar a janela)
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const mede = () => setPorVez(Math.max(1, Math.round(el.clientWidth / passo())));
    mede();
    const ro = new ResizeObserver(mede);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // só gira enquanto a vitrine está na tela
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: .4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // o relógio: a cada INTERVALO avança uma posição; no fim, volta ao começo
  const roda = !pausado && !ocupado && visivel && posicoes > 1;
  useEffect(() => {
    if (!roda) return;
    const t = setTimeout(() => irPara(ativo + 1 >= posicoes ? 0 : ativo + 1), INTERVALO);
    return () => clearTimeout(t);
  }, [roda, ativo, posicoes, vez, irPara]);

  const manual = i => { setVez(v => v + 1); irPara((i + posicoes) % posicoes); };

  return {
    trilho, ativo, porVez, posicoes, pausado,
    automatico: !reduz, // com movimento reduzido não há troca automática (nem botão de pausa)
    irPara: manual,
    anterior: () => manual(ativo - 1),
    proximo: () => manual(ativo + 1),
    alternaPausa: () => setPausado(p => !p),
    // eventos para o contêiner da vitrine
    eventos: {
      onMouseEnter: () => setOcupado(true),
      onMouseLeave: () => setOcupado(false),
      onFocus: () => setOcupado(true),
      onBlur: e => { if (!e.currentTarget.contains(e.relatedTarget)) setOcupado(false); },
      onPointerDown: () => setVez(v => v + 1),
    },
    // no scroll (automático ou arrastado), descobre qual posição está à vista
    aoRolar: () => {
      const el = trilho.current;
      const i = Math.min(posicoes - 1, Math.round(el.scrollLeft / passo()));
      if (i !== ativo) setAtivo(i);
    },
  };
}
