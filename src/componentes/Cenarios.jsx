/**
 * CENÁRIOS — a pilha de fundos fixos, um por "ambiente" da jornada:
 * boot → céu → superfície do CD (Sobre) → dentro da máquina (Projetos)
 * → noite (Trajetória) → amanhecer de aço (Competências) → dia de novo (Contato).
 *
 * Cada camada com data-secao recebe --o (0 a 1) do hook useJornada quando a seção
 * dela se aproxima; o CSS decide COMO ela entra (íris, sol nascendo, fade...).
 * data-src = a imagem só é baixada quando a seção está perto.
 */
const CAMADAS = [
  { secao: "sobre", classe: "cenario-disco", img: "/assets/cenas/disco.webp" }, // o CD já escurecido (fontes/assa-cenas.py)
  { secao: "projetos", classe: "cenario-digital", img: "/assets/cenas/circuito.webp" },
  { secao: "trajetoria", classe: "cenario-noite", img: "/assets/cenas/noite.webp" },
  { secao: "competencias", classe: "cenario-aco", img: "/assets/cenas/amanhecer.webp" },
  { secao: "contato", classe: "cenario-dia", img: "/assets/sky-1280.webp" },
];

export default function Cenarios() {
  return (
    <div className="cenarios" aria-hidden="true">
      <div className="aurora" />
      <div className="cenario mundo">
        <img className="ceu" src="/assets/sky-1280.webp" srcSet="/assets/sky-1280.webp 1280w, /assets/sky-2200.webp 2200w" sizes="100vw" alt="" />
      </div>
      {CAMADAS.map(c => (
        <div key={c.secao} className={`cenario ${c.classe}`} data-secao={c.secao}>
          <img className="cenario-img" data-src={c.img} alt="" />
        </div>
      ))}
      {/* HUD techno: grade em perspectiva + vinheta/scanlines, comum a todos os ambientes */}
      <div className="hud-grade" />
      <div className="hud-vinheta" />
      {/* o CD que sai da abertura e atravessa a jornada */}
      <img className="viajante" src="/assets/recortes/cd.webp" alt="" width="1280" height="1284" />
    </div>
  );
}
