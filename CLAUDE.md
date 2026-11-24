# Instruções principais para Claude Code

Projeto: **vinicius.exe** — portfólio de Vinicius Araújo em React + Vite, com direção **cyber Y2K / techno**:
uma jornada escura por ambientes digitais, contada pelo scroll, com janelas retrô, cromado,
geometria vetorial e fotos reais de aparelhos dos anos 2000.

## Antes de qualquer alteração
1. Leia `README.md` (como rodar, estrutura de pastas e o resumo da direção).
2. Leia `DESIGN_GUIDELINES.md` (paleta, tipografia, composição, movimento — são regras, não sugestões).
3. Consulte `AGENTS.md` para os papéis e o protocolo de trabalho.
4. Consulte `CREDITOS.md` antes de adicionar, trocar ou remover qualquer imagem.
5. `REFERENCIAS/` é só inspiração (Pinterest) e fica fora do git: nada dali vai para o site nem para o repositório.

## Regras principais
- **Preserve a direção atual.** Escuro, cromado, azul elétrico, ciano e um acento lima. **Sem rosa**, sem tons fofos, sem Frutiger Aero (água, peixes, bolhas, aquário) — essa fase foi descartada.
- **O CD é o protagonista** da narrativa: abertura (mergulho pelo furo), viajante, superfície do Sobre mim e "lua" da Trajetória. Não introduza outro mascote.
- **Janelas retrô são contêineres de conteúdo**, não navegação. A navegação continua convencional: menu fixo no topo, links com nomes claros, conteúdo acessível sem interação obrigatória.
- **Recortes são imagens reais** (foto/PNG/SVG de terceiros com licença) ou vetores do sticker pack em `public/assets/pack/`. Não desenhe stickers com CSS, SVG feito à mão ou emoji. CSS desenha só interface (janelas, botões, barras).
- **Toda imagem nova** precisa de origem e licença verificáveis, registradas em `CREDITOS.md`. Preferir Wikimedia Commons (domínio público, CC0, CC BY, CC BY-SA).
- **Conteúdo é real.** Não invente projetos, cargos, métricas, datas ou falas atribuídas ao Vinicius. Texto e listas ficam em `src/dados.js`.
- Não adicionar dependências sem justificar (hoje: só React e Vite).

## Ao implementar
- Trabalhe em etapas pequenas e revisáveis; faça backup só se for uma mudança grande e apague depois.
- Componentes reutilizáveis (`Janela`, `Cabecalho`, `Slot`, `IconeTec`) antes de copiar markup.
- Animações ligadas ao scroll ficam em `src/hooks/useJornada.js` (DOM direto, um `requestAnimationFrame` por quadro) — não em `useState`.
- Cada movimento precisa reforçar a narrativa; nada só por decoração.
- Respeite `prefers-reduced-motion`, foco visível, teclado e contraste no tema escuro.
- Não bloquear scroll nem esconder a navegação essencial.

## Validação (obrigatória antes de dizer que terminou)
- `npm run build` sem erros.
- Capturas com Playwright (canal `msedge`) em **1440×900** e **390×844**, percorrendo a abertura e cada seção: sem erros no console, sem rolagem horizontal, sem recurso 404 (exceto prints de projeto ainda não adicionados em `public/minhas-imagens/`).
- Testar `prefers-reduced-motion` e a navegação por Tab.

## Comunicação
Em português. O Vinicius está aprendendo: explique o **porquê** das decisões e os trade-offs, mostre o que mudou (antes → depois) e, ao final, diga o que foi feito, o que falta e como validar. Para decisões de direção que mudam muita coisa, apresente opções com uma recomendação antes de executar.
