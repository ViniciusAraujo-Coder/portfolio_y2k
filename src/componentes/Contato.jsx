import { useState } from "react";
import Janela from "./Janela.jsx";
import { Cabecalho, Slot, BotaoCurriculo } from "./Pecas.jsx";
import { EMAIL, GITHUB, LINKEDIN, WHATSAPP, SECOES } from "../dados.js";

const mailto = (assunto = "", corpo = "") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

// Canais de contato. "oque" explica em 2 palavras o que é (para quem não conhece o app).
const CANAIS = [
  { nome: "E-mail", oque: "escrever agora", href: mailto("Contato pelo portfólio"), icone: "" },
  { nome: "WhatsApp", oque: "mandar mensagem", href: WHATSAPP, icone: "/assets/tech/whatsapp.svg", fora: true },
  { nome: "LinkedIn", oque: "perfil profissional", href: LINKEDIN, icone: "/assets/tech/linkedin.svg", fora: true },
  { nome: "GitHub", oque: "meus códigos", href: GITHUB, icone: "/assets/tech/github.svg", fora: true },
];

/** 05 · CONTATO — ambiente: o dia recomeça. Cartão de visita + "Nova mensagem" (abre o app de e-mail). */
export default function Contato({ aoFocarFormulario }) {
  const [erro, setErro] = useState("");
  const [invalidos, setInvalidos] = useState([]);

  function envia(ev) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const obrigatorios = ["nome", "email", "mensagem"].map(n => form.elements[n]);
    const ruins = obrigatorios.filter(c => !c.checkValidity());
    setInvalidos(ruins.map(c => c.name));
    if (ruins.length) {
      const primeiro = ruins[0];
      setErro(primeiro.name === "email" && primeiro.value ? "Esse e-mail parece incompleto." : "Preencha nome, e-mail e mensagem.");
      primeiro.focus();
      return;
    }
    setErro("");
    const d = Object.fromEntries(new FormData(form));
    location.href = mailto(d.assunto || `Contato de ${d.nome}`, `${d.mensagem}\n\n— ${d.nome} (${d.email})`);
  }

  const campo = nome => `campo${invalidos.includes(nome) ? " erro" : ""}`;

  return (
    <section className="secao" id="contato">
      <div className="container colagem colagem-contato">
        <Cabecalho numero="05" olho="vamos conversar" titulo="entre em contato" texto={SECOES.contato}>
          <img className="brilho-titulo cintila" src="/assets/pack/brilhos-cruz-ciano.svg" alt="" aria-hidden="true" />
        </Cabecalho>

        <img className="sticker geo geo-mira revela" src="/assets/pack/mira-ciano.svg" alt="" aria-hidden="true" loading="lazy" data-prof=".3" />

        <Janela titulo="cartao.bmp" variante="98" barra98 className="revela cartao" inclinacao={-2}>
          <div className="cartao-corpo">
            <div className="perfil">
              <Slot className="perfil-foto" src="/minhas-imagens/eu.jpg" alt="Foto de Vinicius Araújo" loading="lazy" />
              <div>
                <p className="cartao-nome">Vinicius Araújo</p>
                <p className="cartao-cargo">dev em formação</p>
              </div>
            </div>
            <ul className="perfil-status contato-status" aria-label="Status">
              <li><i aria-hidden="true" />Disponível para estágio</li>
              <li>São Paulo, SP</li>
            </ul>
            {/* cada jeito de falar comigo é um cartãozinho: ícone + nome + o que é */}
            <ul className="canais" aria-label="Outros jeitos de falar comigo">
              {CANAIS.map(c => (
                <li key={c.nome}>
                  <a className="canal" href={c.href} {...(c.fora && { target: "_blank", rel: "noopener" })}>
                    <span className="canal-icone" aria-hidden="true">{c.icone ? <img src={c.icone} alt="" /> : <b>@</b>}</span>
                    <span className="canal-texto"><strong>{c.nome}</strong><small>{c.oque}</small></span>
                  </a>
                </li>
              ))}
            </ul>
            <BotaoCurriculo />
          </div>
        </Janela>

        <Janela titulo="Nova mensagem" className="revela email-janela" inclinacao={1}>
          <form className="form" noValidate onSubmit={envia} onFocus={aoFocarFormulario}>
            <p className="campo-para"><span>Para:</span> Vinicius Araújo</p>
            <div className="campos-duplos">
              <label className={campo("nome")}>Nome<input name="nome" autoComplete="name" placeholder="Seu nome" required /></label>
              <label className={campo("email")}>E-mail<input name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required /></label>
            </div>
            <label className={campo("mensagem")}>Mensagem<textarea name="mensagem" rows="5" placeholder="Escreva aqui o que quiser me contar" required /></label>
            <p className="form-erro" role="alert">{erro}</p>
            <div className="form-rodape">
              <button className="botao botao-azul" type="submit">Enviar mensagem →</button>
              <p className="form-nota">Abre o seu app de e-mail com a mensagem pronta.</p>
            </div>
          </form>
        </Janela>

        {/* Grupo "celular": a mensagem sai do flip phone, com o sinal do satélite */}
        <div className="celular revela" aria-hidden="true">
          <img className="sticker sticker-flip" src="/assets/recortes/flip.webp" alt="" loading="lazy" />
          <img className="sticker sticker-satelite" src="/assets/pack/satelite-cromo.svg" alt="" loading="lazy" />
          <div className="sms" style={{ "--r": "-3deg" }}>
            <span className="sms-topo"><b>ABC</b> Para: você</span>
            <p>bora conversar? :)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
