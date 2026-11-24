import Cenarios from "./componentes/Cenarios.jsx";
import Topo from "./componentes/Topo.jsx";
import Abertura from "./componentes/Abertura.jsx";
import Sobre from "./componentes/Sobre.jsx";
import Projetos from "./componentes/Projetos.jsx";
import Trajetoria from "./componentes/Trajetoria.jsx";
import Competencias from "./componentes/Competencias.jsx";
import Contato from "./componentes/Contato.jsx";
import Rodape from "./componentes/Rodape.jsx";
import useJornada from "./hooks/useJornada.js";
import useSecaoAtual from "./hooks/useSecaoAtual.js";

/** A página inteira, na ordem da jornada. */
export default function App() {
  const secaoAtual = useSecaoAtual();
  useJornada();

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Cenarios />
      <Topo secaoAtual={secaoAtual} />
      <main id="conteudo">
        <Abertura />
        <Sobre />
        <Projetos />
        <Trajetoria />
        <Competencias />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}
