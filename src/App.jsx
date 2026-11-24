import { useCallback, useState } from "react";
import Cenarios from "./componentes/Cenarios.jsx";
import Topo from "./componentes/Topo.jsx";
import Assistente from "./componentes/Assistente.jsx";
import Abertura from "./componentes/Abertura.jsx";
import Sobre from "./componentes/Sobre.jsx";
import Projetos from "./componentes/Projetos.jsx";
import Trajetoria from "./componentes/Trajetoria.jsx";
import Competencias from "./componentes/Competencias.jsx";
import Contato from "./componentes/Contato.jsx";
import Rodape from "./componentes/Rodape.jsx";
import useJornada from "./hooks/useJornada.js";
import useSecaoAtual from "./hooks/useSecaoAtual.js";
import { rolaPara } from "./util.js";

/**
 * A página inteira, na ordem da jornada.
 * "destaque" mora aqui porque dois lugares apontam para um projeto: o "Usei no projeto"
 * das Competências e o botão do Zezinho. Eles rolam até Projetos e o projeto escolhido abre (PC) ou aparece no carrossel (celular).
 */
export default function App() {
  const [destaque, setDestaque] = useState(null); // { id, vez } — "vez" muda a cada pedido, para acender de novo
  const secaoAtual = useSecaoAtual();
  useJornada();

  const abreProjeto = useCallback(id => {
    setDestaque(d => ({ id, vez: (d?.vez ?? 0) + 1 }));
    rolaPara("projetos");
  }, []);

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Cenarios />
      <Topo secaoAtual={secaoAtual} />
      <Assistente abreProjeto={abreProjeto} />
      <main id="conteudo">
        <Abertura />
        <Sobre />
        <Projetos destaque={destaque} />
        <Trajetoria />
        <Competencias abreProjeto={abreProjeto} />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}
