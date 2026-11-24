import { useEffect, useState } from "react";
import { reduz } from "../util.js";

/**
 * Efeito de "máquina de escrever": digita um texto, apaga e passa para o próximo.
 * Devolve o pedaço de texto que deve aparecer agora.
 */
export default function useDigitando(textos, { digitar = 70, apagar = 35, pausa = 2200, inicio = 600 } = {}) {
  const [texto, setTexto] = useState(reduz ? textos[0] : "");

  useEffect(() => {
    if (reduz) return;
    let i = 0, n = 0, apagando = false, timer;
    const passo = () => {
      const alvo = textos[i];
      n += apagando ? -1 : 1;
      setTexto(alvo.slice(0, n));
      if (!apagando && n === alvo.length) {
        if (textos.length === 1) return;
        apagando = true;
        timer = setTimeout(passo, pausa);
        return;
      }
      if (apagando && n === 0) { apagando = false; i = (i + 1) % textos.length; }
      timer = setTimeout(passo, apagando ? apagar : digitar);
    };
    timer = setTimeout(passo, inicio);
    return () => clearTimeout(timer);
  }, [textos, digitar, apagar, pausa, inicio]);

  return texto;
}
