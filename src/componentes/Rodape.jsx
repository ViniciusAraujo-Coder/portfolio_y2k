import { useEffect, useState } from "react";

/** Rodapé em forma de barra de tarefas, com relógio de verdade no canto. */
export default function Rodape() {
  const [agora, setAgora] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setAgora(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="rodape">
      <div className="rodape-linha">
        <a className="iniciar" href="#inicio"><span className="logo-orb" aria-hidden="true" />iniciar ↑</a>
        <span className="tarefa">vinicius.exe</span>
        <span className="tarefa tarefa-2">© 2026 Vinicius Araújo · feito à mão com React, CSS e JavaScript</span>
        <span className="bandeja">
          <time className="relogio" dateTime={agora.toISOString()}>{agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</time>
        </span>
      </div>
    </footer>
  );
}
