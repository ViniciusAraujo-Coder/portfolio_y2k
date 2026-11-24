import { useEffect } from "react";
import { limita, suaviza, reduz } from "../util.js";

/* =========================================================
   O "MOTOR" DA JORNADA — tudo o que depende do scroll.

   Por que aqui é JavaScript "puro" (mexendo direto no DOM) e não estado do React?
   Porque isso roda a cada quadro de rolagem (60x por segundo). Guardar esses números
   em useState faria o React redesenhar a página inteira toda hora. Então o React
   desenha a estrutura UMA vez e este hook só ajusta estilos (transform, opacidade, --o).

   1) Mergulho: o CD cresce e o céu abre a partir do furo dele
   2) Peças da abertura "abrem" conforme o scroll (data-quando) e depois sobem (--saida)
   3) Cenários: cada fundo entra quando a seção dele chega (--o)
   4) CD viajante: atravessa as primeiras seções seguindo "âncoras"
   5) Parallax: recortes com data-prof andam em velocidades diferentes
   6) Revelar: janelas das seções "pulam" para dentro ao aparecer
   ========================================================= */

const FIM_MERGULHO = .34;  // até aqui (fração da abertura) dura o mergulho
const INICIO_SAIDA = .86;  // daqui em diante, a colagem da abertura vai embora

export default function useJornada() {
  useEffect(() => {
    const $ = s => document.querySelector(s);
    const abertura = $(".abertura"), arte = $(".inicio-arte"), orb = $(".orb");
    const mundo = $(".mundo"), aurora = $(".aurora"), cena = $(".cena"), viajante = $(".viajante"), topo = $(".topo");
    const secSobre = $("#sobre"), secProjetos = $("#projetos");
    const pecas = [...document.querySelectorAll(".cena .pop")];
    const cenarios = [...document.querySelectorAll(".cenario[data-secao]")].map(el => ({
      el, secao: document.getElementById(el.dataset.secao), img: el.querySelector(".cenario-img"),
    }));
    const paralaxe = [...document.querySelectorAll("[data-prof]")].map(el => ({ el, secao: el.closest("section"), prof: +el.dataset.prof }));
    let abrirTudo = false; // navegação por teclado: as janelas precisam existir para receber foco
    let ancoras = [];

    /* Escreve um estilo SÓ se o valor mudou. Cada escrita em style faz o navegador
       recalcular estilos; num scroll de 60 quadros/s, pular as repetidas economiza muito. */
    const ultimo = new WeakMap();
    const poe = (el, nome, valor) => {
      let m = ultimo.get(el);
      if (!m) ultimo.set(el, (m = {}));
      if (m[nome] === valor) return;
      m[nome] = valor;
      if (nome.startsWith("--")) el.style.setProperty(nome, valor); else el.style[nome] = valor;
    };
    let ultimoP = -1; // último progresso da abertura já desenhado

    const progresso = secao => {
      const r = secao.getBoundingClientRect();
      const percurso = r.height - innerHeight;
      return percurso > 0 ? limita(-r.top / percurso) : 0;
    };

    /* 1 + 2) Mergulho e peças da abertura */
    function atualizaMergulho(forca = false) {
      const p = progresso(abertura);
      if (p === ultimoP && !forca) return; // abertura parada (ou já lá para trás): nada para refazer
      ultimoP = p;
      const d = limita(p / FIM_MERGULHO);
      const e = suaviza(d);
      poe(abertura, "--boot", (1 - limita(d / .35)).toFixed(3));
      const s = 1 + 4.2 * e;
      poe(orb, "transform", `scale(${s.toFixed(4)})`);
      poe(orb, "opacity", String(1 - limita((d - .45) / .35)));
      // o círculo do céu nasce do tamanho do furo do CD (≈6,5% da largura) e cresce até o canto mais distante
      const a = arte.getBoundingClientRect();
      const cx = a.left + a.width / 2, cy = a.top + a.height / 2;
      const raioFinal = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 4;
      const raio = Math.max(a.width * .065 * s, raioFinal * e * e);
      poe(mundo, "clipPath", d >= 1 ? "none" : `circle(${raio.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`);
      poe(aurora, "opacity", String(1 - limita((d - .8) / .2)));
      document.body.classList.toggle("paisagem-pronta", d >= 1);
      pecas.forEach(el => el.classList.toggle("aberta", abrirTudo || p >= +el.dataset.quando));
      poe(cena, "--saida", suaviza(limita((p - INICIO_SAIDA) / (1 - INICIO_SAIDA))).toFixed(4));
    }

    /* 3) Cenários */
    function atualizaCenarios() {
      const h = innerHeight;
      let cheio = -1;
      cenarios.forEach((c, i) => {
        const topo = c.secao.getBoundingClientRect().top;
        if (c.img && !c.img.getAttribute("src") && topo < h * 3) c.img.src = c.img.dataset.src; // só baixa quando está perto
        let o = limita((h * .95 - topo) / (h * .85));
        if (reduz) o = o >= .5 ? 1 : 0;
        poe(c.el, "--o", o.toFixed(3));
        c.el.classList.toggle("ativo", o > 0);
        if (o >= 1) cheio = i;
      });
      cenarios.forEach((c, i) => c.el.classList.toggle("coberto", i < cheio));
      mundo.classList.toggle("coberto", cheio >= 0);
      aurora.classList.toggle("coberto", cheio >= 0);
    }

    /* 4) CD viajante. Âncora = [scroll, x (fração da largura), y (fração da altura), escala, opacidade, giro] */
    function medeAncoras() {
      const h = innerHeight, celular = innerWidth < 700;
      const ini = abertura.offsetTop, percurso = abertura.offsetHeight - h;
      const fimMergulho = ini + percurso * FIM_MERGULHO, fimAbertura = ini + percurso;
      const sobre = secSobre.offsetTop, projetos = secProjetos.offsetTop;
      const yCeu = celular ? .40 : .64;
      ancoras = [
        [fimMergulho - percurso * .05, .50, .58, .25, 0, 0],
        [fimMergulho + percurso * .06, .56, yCeu, 1, 1, -6],        // sai da abertura e pousa no halo
        [fimAbertura - percurso * .10, .64, yCeu + .04, .95, 1, 4],
        [sobre - h * .25, .74, .86, .8, 1, 32],                      // cai na superfície do disco
        [sobre + h * .35, .36, .66, .55, 1, 8],
        [sobre + secSobre.offsetHeight * .7, .14, .44, .42, 1, -6],
        [projetos + h * .15, .48, .92, .16, 0, 40],                  // some dentro da máquina
      ];
    }
    function atualizaViajante() {
      const y = scrollY;
      if (!ancoras.length || y <= ancoras[0][0] || y >= ancoras[ancoras.length - 1][0]) { poe(viajante, "opacity", "0"); return; }
      const i = ancoras.findIndex(a => a[0] > y) - 1;
      const a = ancoras[i], b = ancoras[i + 1];
      const t = suaviza((y - a[0]) / (b[0] - a[0]));
      const L = k => a[k] + (b[k] - a[k]) * t;
      const vira = b[1] < a[1] ? -1 : 1;
      const x = L(1) * innerWidth - viajante.offsetWidth / 2;
      const yy = L(2) * innerHeight - viajante.offsetHeight / 2;
      viajante.style.transform = `translate(${x.toFixed(1)}px, ${yy.toFixed(1)}px) rotate(${(L(5) * vira + y * .35).toFixed(1)}deg) scale(${(L(3) * vira).toFixed(3)}, ${L(3).toFixed(3)})`;
      poe(viajante, "opacity", L(4).toFixed(3));
    }

    /* 5) Parallax */
    function atualizaParalaxe() {
      paralaxe.forEach(({ el, secao, prof }) => {
        const r = secao.getBoundingClientRect();
        if (r.bottom < -300 || r.top > innerHeight + 300) return;
        poe(el, "translate", `0 ${Math.round((r.top + r.height / 2 - innerHeight / 2) * prof * -.25)}px`);
      });
    }

    /* um único "quadro" por frame */
    let pedido = false;
    const quadro = () => {
      if (!reduz) { atualizaMergulho(); atualizaViajante(); atualizaParalaxe(); }
      atualizaCenarios();
      // barra de progresso no menu: quanto da página já foi lida (0 a 1)
      const total = document.documentElement.scrollHeight - innerHeight;
      if (topo && total > 0) poe(topo, "--progresso", limita(scrollY / total).toFixed(3));
      pedido = false;
    };
    const aoRolar = () => { if (!pedido) { pedido = true; requestAnimationFrame(quadro); } };
    const remede = () => { medeAncoras(); if (!reduz) atualizaMergulho(true); quadro(); };

    // teclado: ao usar Tab, abre todas as peças; ao focar a colagem, pula para onde tudo já abriu
    const aoTeclar = ev => { if (ev.key === "Tab" && !abrirTudo) { abrirTudo = true; if (!reduz) atualizaMergulho(true); } };
    const aoFocarCena = () => {
      const p = progresso(abertura);
      if (reduz || (p >= .8 && p <= INICIO_SAIDA)) return;
      scrollTo({ top: abertura.offsetTop + (abertura.offsetHeight - innerHeight) * .82, behavior: "auto" });
    };

    /* 6) Revelar ao rolar (irmãos entram em sequência) */
    document.querySelectorAll(".secao").forEach(sec => sec.querySelectorAll(".revela").forEach((el, i) => el.style.setProperty("--i", i)));
    const revelador = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visivel"); revelador.unobserve(e.target); }
    }), { threshold: .15, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".revela").forEach(el => revelador.observe(el));

    /* 7) Animações que giram sem parar (CD, órbita, mira...) PAUSAM quando a seção sai da tela.
       Não faz sentido o computador desenhar um disco girando que ninguém está vendo. */
    const vigia = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("fora", !e.isIntersecting)), { rootMargin: "120px 0px" });
    document.querySelectorAll(".secao, .abertura").forEach(el => vigia.observe(el));

    /* 8) Modo leve automático: mede os quadros por ~1,5 s logo depois de carregar.
       Se o aparelho não passa de ~40 quadros/s, desliga os enfeites contínuos (classe .leve no <html>).
       Dá para forçar com ?leve no endereço, para testar. */
    let medidor;
    if (/[?&]leve\b/.test(location.search)) document.documentElement.classList.add("leve");
    else if (!reduz) {
      const tempos = []; let antes = 0;
      const mede = t => {
        if (antes && document.visibilityState === "visible") { const dt = t - antes; if (dt < 250) tempos.push(dt); }
        antes = t;
        if (tempos.length < 90) { medidor = requestAnimationFrame(mede); return; }
        tempos.sort((a, b) => a - b);
        if (tempos[tempos.length >> 1] > 24) document.documentElement.classList.add("leve"); // mediana > 24 ms ≈ menos de 42 fps
      };
      const comeca = setTimeout(() => (medidor = requestAnimationFrame(mede)), 1200);
      medidor = { cancela: () => clearTimeout(comeca) };
    }

    if (reduz) document.body.classList.add("paisagem-pronta");
    addEventListener("scroll", aoRolar, { passive: true });
    addEventListener("resize", remede);
    addEventListener("load", remede);
    addEventListener("keydown", aoTeclar);
    cena.addEventListener("focusin", aoFocarCena);
    const observaTamanho = new ResizeObserver(remede);
    observaTamanho.observe(document.querySelector("main"));
    remede();

    return () => {
      removeEventListener("scroll", aoRolar);
      removeEventListener("resize", remede);
      removeEventListener("load", remede);
      removeEventListener("keydown", aoTeclar);
      cena.removeEventListener("focusin", aoFocarCena);
      observaTamanho.disconnect();
      revelador.disconnect();
      vigia.disconnect();
      if (typeof medidor === "number") cancelAnimationFrame(medidor); else medidor?.cancela();
    };
  }, []);
}
