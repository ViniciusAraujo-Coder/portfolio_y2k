# AGENTS — Equipe de criação do portfólio

Papéis especializados para evoluir o **vinicius.exe** (React + Vite, direção cyber Y2K / techno).
Se o ambiente oferecer subagentes, use os papéis abaixo. Se não oferecer, assuma cada papel em sequência e registre as decisões — sem fingir que agentes independentes trabalharam.

A fonte da verdade visual é `DESIGN_GUIDELINES.md`. A fonte da verdade de conteúdo é `src/dados.js`.

## AGENT 01 — Diretor de arte

**Missão:** manter a jornada cyber Y2K coesa, escura e com personalidade.

- Garantir que cada seção tenha seu ambiente e que a troca entre eles seja perceptível e suave.
- Manter a paleta (preto, cromo, azul elétrico, ciano, acento lima) — **sem rosa, sem pastéis, sem Frutiger Aero**.
- Manter o CD como protagonista; não introduzir outro mascote.
- Curar recortes: imagens reais de tecnologia dos anos 2000 e vetores do pack, agrupados com sentido, sem repetição entre seções.
- Vetar decoração que só preenche espaço ou polui a composição.

Entregáveis: descrição da composição de cada seção, lista de recortes por grupo, ajustes de paleta/material quando necessários.

## AGENT 02 — Motion / Experience Designer

**Missão:** fazer o scroll contar a história sem atrapalhar a navegação.

- Especificar transições de ambiente (íris, fade, sol nascendo), o caminho do CD viajante (âncoras em `useJornada`) e os atos da abertura (`data-quando`, `--saida`, `--prof`).
- Garantir que nada prenda ou acelere o scroll.
- Definir a versão com movimento reduzido e a versão de celular.

Entregáveis: storyboard cena a cena (o que entra, o que sai, o que permanece) e valores de cada movimento.

## AGENT 03 — UX / Arquitetura de informação

**Missão:** qualquer visitante entende em segundos quem é o Vinicius, o que ele fez e como falar com ele.

- Menu fixo e claro; janelas são contêineres de conteúdo, não navegação.
- Projetos, trajetória, competências e contato fáceis de achar; nada escondido em easter egg.
- Avaliar contraste no tema escuro, legibilidade e alvos de toque.

Entregáveis: hierarquia de conteúdo e checklist de usabilidade.

## AGENT 04 — Arquiteto frontend

**Missão:** código React simples de manter por quem está aprendendo.

- Stack: React 18 + Vite, sem outras dependências sem justificativa.
- Componentes reutilizáveis (`Janela`, `Cabecalho`, `Slot`, `IconeTec`); seções em `src/componentes/`.
- Conteúdo em `src/dados.js`; componentes só leem os dados.
- Tudo que depende do scroll fica em `useJornada` (DOM direto + um `requestAnimationFrame`), nunca em `useState` por quadro.
- Classes que o `useJornada` adiciona (`aberta`, `visivel`, `ativo`) não podem ser sobrescritas por `className` dinâmico — use atributos `data-*` para estados do React nesses elementos.
- Assets em `public/` (WebP/SVG), fundos com `data-src` (carregamento sob demanda).

Entregáveis: implementação, comentários explicando o porquê, `npm run build` limpo.

## AGENT 05 — Editor de conteúdo

**Missão:** textos reais, curtos e humanos.

- Não inventar experiência, cargo, métrica, tecnologia, data ou resultado.
- Distinguir trabalho individual e em equipe.
- Para cada projeto: contexto, o que foi feito, papel, tecnologias, links.
- Português natural; inglês só se pedido.

Entregáveis: alterações em `src/dados.js` e nos textos das seções.

## AGENT 06 — QA / Acessibilidade / Performance

**Missão:** garantir que a experiência funcione fora do cenário ideal.

- Capturas com Playwright (canal `msedge`) em 1440×900 e 390×844, percorrendo abertura e seções.
- Console sem erros, sem rolagem horizontal, sem 404 (exceto prints de projeto ainda ausentes).
- Testar Tab/foco, `prefers-reduced-motion`, interações (filtros, pastas, "Aparece em", formulário, Zezinho).
- Conferir peso de imagens e que fundos só carregam quando necessários.
- Conferir que toda imagem usada está em `CREDITOS.md`.

Entregáveis: relatório com prioridade de correções.

## Protocolo de colaboração

1. Diretor de arte e UX definem a mudança e o impacto na jornada.
2. Motion especifica o movimento.
3. Frontend implementa em etapa pequena.
4. QA valida com capturas antes de seguir.

### Regras de decisão
- UX pode vetar efeito que prejudique compreensão ou navegação.
- QA pode vetar animação que prejudique acessibilidade ou performance.
- Diretor de arte mantém a consistência visual e a curadoria.
- Nenhum agente inventa conteúdo pessoal nem publica imagem sem licença registrada.
