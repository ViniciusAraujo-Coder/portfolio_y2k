import Janela from "./Janela.jsx";
import { Slot } from "./Pecas.jsx";
import useDigitando from "../hooks/useDigitando.js";
import { CARGOS, GITHUB, LINKEDIN } from "../dados.js";

/**
 * INÍCIO: boot → mergulho pelo furo do CD → janelas abrindo → saída.
 * A colagem tem 2 grupos: IDENTIDADE (janela + webcam, à esquerda) e SISTEMA
 * (avisos empilhados, à direita). O centro fica livre: é por onde o CD passa.
 *
 * Em cada peça "pop":
 *   data-quando = ponto do scroll (0 a 1) em que ela abre
 *   --prof      = profundidade (quanto ela "sobe" quando a cena vai embora)
 * Quem lê esses valores é o hook useJornada.
 */
/** O cargo "digitado" fica num componente próprio: só ele redesenha a cada letra. */
function Cargo() {
  const cargo = useDigitando(CARGOS);
  return <p className="cargo"><span className="cargo-texto">{cargo}</span><span className="cursor" aria-hidden="true" /></p>;
}

export default function Abertura() {
  return (
    <section className="abertura" id="inicio">
      <div className="palco">
        <pre className="boot" aria-hidden="true">{"C:\\> iniciando vinicius.exe ...\ncarregando memória ........ ok\nconectando à internet ..... ok\n"}<b>role para entrar no disco</b></pre>

        <div className="inicio-arte" aria-hidden="true">
          <div className="anel-mergulho" />
          <img className="orb" src="/assets/recortes/cd.webp" alt="" width="1280" height="1284" fetchpriority="high" />
        </div>
        <p className="rolar" aria-hidden="true"><span />role</p>

        <div className="cena">
          <Janela como="article" titulo="vinicius_araujo.exe" className="pop hero" data-quando=".36" inclinacao={-1.2} style={{ "--prof": .6 }}
            menu={<><u>A</u>rquivo <u>E</u>ditar <u>E</u>xibir <u>F</u>avoritos Aj<u>u</u>da</>}>
            <div className="inicio-texto">
              {/* Só no celular (o CSS esconde no PC, onde a foto já está na webcam):
                  a janela vira um "perfil" completo, com foto e status numa tela só. */}
              <Slot como="div" className="perfil-avatar" src="/minhas-imagens/eu.jpg" alt="Foto de Vinicius Araújo" />
              <p className="saudacao">Olá, eu sou</p>
              <h1 className="nome">Vinicius<br />Araújo</h1>
              <span className="arco-iris" aria-hidden="true" />
              <Cargo />
              <ul className="perfil-status" aria-label="Status">
                <li><i aria-hidden="true" />Disponível para estágio</li>
                <li>São Paulo, SP</li>
              </ul>
              <p className="descricao">Transformo ideias em soluções — e acredito que a tecnologia também pode contar histórias, despertar sentimentos e criar conexões.</p>
              <div className="cta">
                <a className="botao botao-azul" href="#projetos">Ver meus projetos →</a>
                <a className="botao" href="#sobre">Sobre mim</a>
              </div>
              <ul className="sociais">
                <li><a className="icone-btn" href={GITHUB} target="_blank" rel="noopener" aria-label="GitHub"><img src="/assets/tech/github.svg" alt="" width="20" height="20" /></a></li>
                <li><a className="icone-btn" href={LINKEDIN} target="_blank" rel="noopener" aria-label="LinkedIn"><b>in</b></a></li>
                <li><a className="icone-btn" href="#contato" aria-label="Contato"><b>@</b></a></li>
              </ul>
            </div>
          </Janela>

          <Janela como="figure" titulo="webcam.jpg" barra98 botoes={["×"]} className="pop webcam" data-quando=".44" inclinacao={3} style={{ "--prof": 1 }}>
            <Slot como="div" className="webcam-foto" src="/minhas-imagens/eu.jpg" alt="Foto de Vinicius Araújo" width="900" height="1350">
              <span className="detecta" aria-hidden="true"><b>Dev</b></span>
            </Slot>
            <figcaption><i aria-hidden="true" />REC · São Paulo, SP</figcaption>
          </Janela>

          <Janela titulo="nova mensagem!" variante="grafite" botoes={["×"]} className="pop popup-msg" data-quando=".52" inclinacao={-2} style={{ "--prof": 1.3 }}>
            <div className="popup-corpo">
              <p>Você tem <b>(1)</b> nova mensagem: <i>“disponível para estágio”</i></p>
              <a className="botao botao-pequeno" href="#contato">ok</a>
            </div>
          </Janela>

          <Janela titulo="Baixando portfólio..." variante="98" barra98 botoes={["×"]} className="pop carregando" data-quando=".60" inclinacao={1.5} style={{ "--prof": .8 }} aria-hidden="true">
            <div className="carregando-corpo">
              <span>portfolio_2026.zip — 100%</span>
              <span className="barra-blocos"><i /></span>
              <span className="carregando-ok">Concluído! Role para abrir ↓</span>
            </div>
          </Janela>

          <img className="sticker pop geo geo-espirografo" data-quando=".38" src="/assets/pack/espirografo-branco.svg" alt="" aria-hidden="true" style={{ "--prof": .3 }} />
          <img className="sticker pop sticker-brilhos" data-quando=".56" src="/assets/pack/brilhos-cromo.svg" alt="" aria-hidden="true" style={{ "--prof": 2 }} />
          <img className="sticker pop sticker-brilho" data-quando=".46" src="/assets/pack/brilho-cromo.svg" alt="" aria-hidden="true" style={{ "--prof": 1.6 }} />
          <img className="sticker pop sticker-halo" data-quando=".40" src="/assets/pack/halo-branco.svg" alt="" aria-hidden="true" style={{ "--prof": .9 }} />

          <p className="balao-fala pop balao-1" data-quando=".70" aria-hidden="true" style={{ "--prof": .4 }}>o disco tá rodando. segue ele ↓</p>
        </div>
      </div>
    </section>
  );
}
