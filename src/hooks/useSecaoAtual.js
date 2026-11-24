import { useEffect, useState } from "react";

/**
 * Descobre qual seção está no meio da tela (usado pelo menu).
 * margem = faixa da tela que conta como "estou aqui" (rootMargin do IntersectionObserver).
 */
export default function useSecaoAtual(margem = "-45% 0px -50% 0px") {
  const [atual, setAtual] = useState("inicio");
  useEffect(() => {
    const espiao = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setAtual(e.target.id); }),
      { rootMargin: margem }
    );
    document.querySelectorAll("main > section").forEach(s => espiao.observe(s));
    return () => espiao.disconnect();
  }, [margem]);
  return atual;
}
