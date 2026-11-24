// Pequenas funções usadas em vários lugares.

/** true se a pessoa pediu ao sistema para reduzir animações. */
export const reduz = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Prende um número entre a e b (padrão: entre 0 e 1). */
export const limita = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Curva "ease-in-out": começa devagar, acelera e termina devagar (t de 0 a 1). */
export const suaviza = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Rola até uma seção pelo id, respeitando quem prefere menos movimento. */
export const rolaPara = id => document.getElementById(id)?.scrollIntoView({ behavior: reduz ? "auto" : "smooth" });
