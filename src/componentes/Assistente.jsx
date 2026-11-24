import { useCallback, useEffect, useRef, useState } from "react";
import { FALAS_ZEZINHO } from "../dados.js";
import useSecaoAtual from "../hooks/useSecaoAtual.js";

/* Preferências guardadas no navegador (se o armazenamento falhar, tudo continua funcionando). */
const CHAVES = { dicas: "viniciusExplorer.zezinho.dicasOcultas", minimizado: "viniciusExplorer.zezinho.minimizado", som: "viniciusExplorer.zezinho.som" };
const le = chave => { try { return localStorage.getItem(chave); } catch { return null; } };
const grava = (chave, valor) => { try { localStorage.setItem(chave, valor); } catch { /* sem armazenamento */ } };

let contextoSom;
/** "Piu!" curtinho feito com Web Audio (sem arquivo de som). */
function tocaPiu() {
  const Audio = window.AudioContext || window.webkitAudioContext;
  if (!Audio) return;
  try {
    contextoSom ||= new Audio();
    if (contextoSom.state === "suspended") contextoSom.resume();
    const osc = contextoSom.createOscillator(), vol = contextoSom.createGain(), t = contextoSom.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(1050, t);
    osc.frequency.exponentialRampToValueAtTime(1650, t + .07);
    osc.frequency.exponentialRampToValueAtTime(1120, t + .15);
    vol.gain.setValueAtTime(.0001, t);
    vol.gain.exponentialRampToValueAtTime(.045, t + .018);
    vol.gain.exponentialRampToValueAtTime(.0001, t + .17);
    osc.connect(vol).connect(contextoSom.destination);
    osc.start(t); osc.stop(t + .18);
  } catch { /* sem áudio, a reação visual continua */ }
}

/**
 * ZEZINHO — a calopsita assistente.
 * Dá uma dica curta na primeira visita a cada seção, pode ser minimizado,
 * silenciado ou ter as dicas desligadas. Dorme depois de 1 minuto parado.
 */
export default function Assistente({ abreProjeto }) {
  const [dicasLigadas, setDicasLigadas] = useState(() => le(CHAVES.dicas) !== "sim");
  const [somLigado, setSomLigado] = useState(() => le(CHAVES.som) !== "nao");
  const [aberto, setAberto] = useState(false);
  const [fala, setFala] = useState(FALAS_ZEZINHO.inicio.texto);
  const [acao, setAcao] = useState(null);
  const [poses, setPoses] = useState({});          // { falando, aceno, voando, dormindo }
  const secao = useSecaoAtual("-35% 0px -45% 0px");

  const raiz = useRef(null), botao = useRef(null);
  const jaFalou = useRef(new Set());
  const minimizado = useRef(le(CHAVES.minimizado) === "sim");
  const dicas = useRef(dicasLigadas); dicas.current = dicasLigadas;
  const timers = useRef({});

  const pose = useCallback((nome, ms) => {
    setPoses(p => ({ ...p, [nome]: true }));
    clearTimeout(timers.current[nome]);
    if (ms) timers.current[nome] = setTimeout(() => setPoses(p => ({ ...p, [nome]: false })), ms);
  }, []);

  const fecha = useCallback((guardar = true) => {
    clearTimeout(timers.current.fechar);
    setAberto(false);
    setPoses(p => ({ ...p, falando: false }));
    if (guardar) { minimizado.current = true; grava(CHAVES.minimizado, "sim"); }
  }, []);

  const agendaFechamento = useCallback(() => {
    clearTimeout(timers.current.fechar);
    if (innerWidth > 1640) return; // em telas bem largas o balão pode ficar aberto
    timers.current.fechar = setTimeout(() => {
      const el = raiz.current;
      if (el && !el.matches(":hover") && !el.matches(":focus-within")) fecha(false);
    }, 6000); // fecha sozinho em 6 s para não ficar cobrindo o conteúdo
  }, [fecha]);

  const abre = useCallback((texto = "Estou por aqui. Use os links do site ou me chame quando quiser.", dica = null) => {
    setFala(texto);
    setAcao(dica?.acao ? dica : null);
    setAberto(true);
    minimizado.current = false; grava(CHAVES.minimizado, "nao");
    agendaFechamento();
  }, [agendaFechamento]);

  const mostraDica = useCallback(id => {
    const dica = FALAS_ZEZINHO[id];
    if (!dica || jaFalou.current.has(id) || !dicas.current || minimizado.current) return;
    if (matchMedia("(max-width: 700px)").matches) return; // no celular o balão cobriria o conteúdo: lá ele só fala quando tocado
    jaFalou.current.add(id);
    pose("falando", 1300);
    if (dica.pose === "aceno") pose("aceno", 1300);
    abre(dica.texto, dica);
  }, [abre, pose]);

  // primeira dica
  useEffect(() => { if (!minimizado.current && dicas.current) mostraDica("inicio"); }, [mostraDica]);

  // ao chegar numa seção nova: voa e, se ela continuar na tela, dá a dica dela
  const primeira = useRef(true);
  useEffect(() => {
    if (primeira.current) { primeira.current = false; return; }
    pose("voando", 700);
    if (jaFalou.current.has(secao)) { fecha(false); return; }
    const t = setTimeout(() => {
      const r = document.getElementById(secao)?.getBoundingClientRect();
      if (r && r.top < innerHeight * .72 && r.bottom > innerHeight * .28) mostraDica(secao);
    }, 620);
    return () => clearTimeout(t);
  }, [secao]); // eslint-disable-line react-hooks/exhaustive-deps

  // dorme depois de 1 minuto sem interação; Esc fecha; focar o formulário fecha
  useEffect(() => {
    const acorda = () => {
      setPoses(p => (p.dormindo ? { ...p, dormindo: false } : p));
      clearTimeout(timers.current.sono);
      timers.current.sono = setTimeout(() => { setPoses({ dormindo: true }); fecha(false); }, 60000);
    };
    const tecla = ev => { if (ev.key === "Escape") { fecha(); botao.current?.focus(); } };
    const foco = ev => { if (ev.target.closest?.(".form")) fecha(false); };
    ["pointerdown", "keydown", "touchstart"].forEach(e => document.addEventListener(e, acorda, { passive: true }));
    document.addEventListener("keydown", tecla);
    document.addEventListener("focusin", foco);
    acorda();
    const t = timers.current;
    return () => {
      ["pointerdown", "keydown", "touchstart"].forEach(e => document.removeEventListener(e, acorda));
      document.removeEventListener("keydown", tecla);
      document.removeEventListener("focusin", foco);
      Object.values(t).forEach(clearTimeout);
    };
  }, [fecha]);

  function clicaPassaro() {
    if (!aberto) {
      const dica = dicas.current ? FALAS_ZEZINHO[secao] : null;
      if (dica) jaFalou.current.add(secao);
      abre(dica?.texto, dica);
    } else {
      abre("Piu! Estou aqui se precisar de uma direção.");
    }
    pose("aceno", 1300);
    pose("falando", 1100);
    if (somLigado) tocaPiu();
  }

  function alternaDicas() {
    const novo = !dicasLigadas;
    setDicasLigadas(novo); dicas.current = novo;
    grava(CHAVES.dicas, novo ? "nao" : "sim");
    if (!novo) { fecha(); botao.current?.focus(); return; }
    const dica = FALAS_ZEZINHO[secao];
    if (dica) { jaFalou.current.add(secao); abre(dica.texto, dica); }
    pose("falando", 1300);
  }

  function alternaSom() {
    const novo = !somLigado;
    setSomLigado(novo);
    grava(CHAVES.som, novo ? "sim" : "nao");
    if (novo) tocaPiu();
  }

  function clicaAcao(ev) {
    if (!acao?.projeto) return; // link normal (#secao)
    ev.preventDefault();
    abreProjeto(acao.projeto);
    pose("voando", 700);
  }

  const classes = ["assistente", ...Object.keys(poses).filter(k => poses[k])].join(" ");

  return (
    <aside className={classes} id="assistente" aria-label="Assistente Zezinho" ref={raiz}
      onPointerEnter={() => clearTimeout(timers.current.fechar)} onPointerLeave={agendaFechamento}
      onFocus={() => clearTimeout(timers.current.fechar)} onBlur={agendaFechamento}>
      <div className="assistente-balao" id="assistente-balao" role="group" aria-labelledby="assistente-titulo" hidden={!aberto}>
        <div className="assistente-balao-topo">
          <strong id="assistente-titulo">Zezinho</strong>
          <button className="assistente-controle" type="button" aria-label="Minimizar o assistente" onClick={() => { fecha(); botao.current?.focus(); }}>−</button>
        </div>
        <p className="assistente-fala" aria-live="polite">{fala}</p>
        {acao && <a className="assistente-acao" href={acao.href} onClick={clicaAcao}>{acao.acao}</a>}
        <div className="assistente-balao-rodape">
          <button className="assistente-controle-texto" type="button" aria-pressed={somLigado} onClick={alternaSom}>{somLigado ? "Som: ligado" : "Som: desligado"}</button>
          <button className="assistente-controle-texto" type="button" onClick={alternaDicas}>{dicasLigadas ? "Não mostrar dicas" : "Reativar dicas"}</button>
        </div>
      </div>
      <button className="assistente-botao" type="button" ref={botao} onClick={clicaPassaro}
        aria-label={aberto ? "Falar com o assistente Zezinho" : "Abrir o assistente Zezinho"} aria-controls="assistente-balao" aria-expanded={aberto}>
        <img className="zezinho-animado" src="/assets/zezinho.gif" alt="" width="395" height="480" />
        <span className="assistente-status" aria-hidden="true" />
      </button>
    </aside>
  );
}
