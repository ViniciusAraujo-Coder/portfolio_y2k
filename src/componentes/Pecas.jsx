import { useEffect, useState } from "react";
import { POR_NOME, CURRICULO } from "../dados.js";

/** Troca *palavra* por <mark>palavra</mark> (marca-texto), para o texto poder ficar em dados.js. */
export function comMarca(texto) {
  return texto.split(/\*(.+?)\*/).map((parte, i) => (i % 2 ? <mark key={i}>{parte}</mark> : parte));
}

/* O currículo existe? Pergunta ao servidor UMA vez (HEAD = só o cabeçalho, sem baixar o PDF).
   Confere o tipo porque o servidor de desenvolvimento responde a página do site para arquivos que faltam. */
let checagem;
const temCurriculo = () => (checagem ??= fetch(CURRICULO, { method: "HEAD" })
  .then(r => r.ok && (r.headers.get("content-type") || "").includes("pdf"))
  .catch(() => false));

/** Botão "Baixar currículo". Sem o PDF: some no site publicado e vira um aviso só no modo dev. */
export function BotaoCurriculo({ className = "botao botao-azul" }) {
  const [existe, setExiste] = useState(null);
  useEffect(() => { let vivo = true; temCurriculo().then(ok => vivo && setExiste(ok)); return () => { vivo = false; }; }, []);
  if (existe) return <a className={className} href={CURRICULO} download="Curriculo-Vinicius-Araujo.pdf">Baixar currículo (PDF)</a>;
  if (existe === false && import.meta.env.DEV) return <span className="botao botao-falta" title="Coloque o arquivo em public/minhas-imagens/curriculo.pdf">[x] curriculo.pdf não encontrado</span>;
  return null;
}

/** Título de seção: etiqueta azul ("01 quem sou") + título cromado + extra opcional (sticker)
 *  + "texto": uma frase simples dizendo o que tem na seção (vem de SECOES, em dados.js). */
export function Cabecalho({ numero, olho, titulo, texto, children }) {
  return (
    <header className="cabecalho revela">
      <p className="olho"><span>{numero}</span>{olho}</p>
      <h2>{titulo}</h2>
      {children}
      {texto && <p className="cabecalho-texto">{texto}</p>}
    </header>
  );
}

/**
 * Imagem que pode ainda não existir (ex.: prints dos projetos em public/minhas-imagens/).
 * Se o arquivo faltar, mostra o aviso "[x] imagem não encontrada" com o nome esperado.
 */
export function Slot({ src, alt, className = "", como: Tag = "figure", children, ...img }) {
  const [vazio, setVazio] = useState(false);
  return (
    <Tag className={`slot ${className}${vazio ? " vazio" : ""}`} data-nome={src.split("/").pop()}>
      <img key={src} src={src} alt={alt} onError={() => setVazio(true)} onLoad={() => setVazio(false)} {...img} />
      {children}
    </Tag>
  );
}

/** Ícone de uma tecnologia (arquivo em public/assets/tech/); sem ícone, mostra o nome. */
export function IconeTec({ nome }) {
  const c = POR_NOME[nome];
  if (!c) return null;
  return c.icone ? <img src={`/assets/tech/${c.icone}.svg`} alt="" /> : <span className="mono">{c.nome}</span>;
}
