# vinicius.exe — portfólio cyber Y2K

## ▶ Como rodar (versão atual: React + Vite)

Precisa do [Node.js](https://nodejs.org) 18 ou mais novo.

```bash
npm install      # só na primeira vez: baixa React e Vite para node_modules/
npm run dev      # abre o site em http://localhost:5173 e recarrega ao salvar
npm run build    # gera a versão final otimizada em dist/ (é ela que vai para a hospedagem)
npm run preview  # testa localmente a versão de dist/
```

### Publicar (GitHub Pages)
Todo `git push` na `main` roda `.github/workflows/deploy.yml`, que faz o build no GitHub e publica o `dist/`
em https://viniciusaraujo-coder.github.io/portfolio_y2k/. Configuração única: **Settings → Pages → Source: GitHub Actions**.

**Regra dos caminhos:** o site mora numa subpasta, então arquivos de `public/` são escritos **sem a barra inicial**
(`"assets/cd.webp"`, não `"/assets/cd.webp"`). Com a barra, a imagem funciona no `npm run dev` mas some no site publicado.

### Onde fica cada coisa

```
index.html              página-base (o React "monta" o site dentro de <div id="raiz">)
src/
├── dados.js            ← TEXTOS E LISTAS: projetos, competências, trajetória, links
├── App.jsx             a página inteira, na ordem da jornada
├── main.jsx            liga o React ao index.html
├── util.js             funçõezinhas comuns (limita, suaviza, rolaPara...)
├── componentes/
│   ├── Janela.jsx      a janela retrô reutilizável (barra de título + botões)
│   ├── Pecas.jsx       Cabecalho (título de seção), Slot (imagem com aviso) e IconeTec
│   ├── Cenarios.jsx    os fundos fixos de cada ambiente + o CD viajante
│   ├── Topo.jsx        menu fixo
│   ├── Abertura.jsx    boot → mergulho no CD → janelas abrindo
│   ├── Sobre.jsx · Projetos.jsx · Trajetoria.jsx · Competencias.jsx · Contato.jsx
│   └── Rodape.jsx      barra de tarefas com relógio
├── hooks/
│   ├── useJornada.js   motor do scroll (mergulho, cenários, CD viajante, parallax, revelar)
│   ├── useDigitando.js efeito de máquina de escrever do cargo
│   ├── useCarrossel.js carrossel dos projetos (troca automática com pausa)
│   └── useSecaoAtual.js qual seção está na tela
└── estilos/global.css  todo o visual (organizado em blocos na ordem da página)
public/
├── assets/             imagens, vetores do pack, ícones
└── minhas-imagens/     suas fotos e prints de projetos (veja o LEIA-ME de lá)
fontes/                 arquivos-fonte: sticker pack original (.zip, só local), fundos originais (cenas-originais/)
                        e assa-cenas.py, que aplica de vez as cores escuras/duotone nos fundos
REFERENCIAS/            imagens de inspiração (só local, fora do git; não são usadas pelo site)
CREDITOS.md             origem e licença de cada imagem usada
```

**Para editar conteúdo**, quase sempre basta mexer em `src/dados.js`.

---

## A ideia

> **Uma jornada por ambientes digitais, vista de dentro da máquina.**

Portfólio de **Vinicius Araújo** (Engenharia de Software · USJT, Desenvolvimento Web Java · Instituto PROA) com estética **cyber Y2K / techno**: fundos escuros, cromado, azul elétrico, ciano e um acento lima, janelas de sistema operacional antigo como "cartões" de conteúdo, geometria vetorial e fotos reais de aparelhos dos anos 2000 — montados como um scrapbook digital planejado.

O visitante precisa entender em poucos segundos **quem é o Vinicius, o que ele construiu e como falar com ele**. A estética mora no cenário e no movimento; o menu e o conteúdo continuam óbvios.

## A jornada (o que acontece quando você rola)

1. **Boot** — tela azul de CRT e um **CD** girando. Ao rolar, você entra pelo furo do disco e o céu se abre.
2. **Início** — as janelas "pipocam" como uma página antiga carregando (nome, webcam, avisos). O CD pousa num anel, como um planeta, e depois a colagem sobe em profundidades diferentes.
3. **Sobre mim** — na **superfície do CD**: o disco gigante gira atrás do bloco de notas e das polaroids (câmera digital, Nokia 3310).
4. **Projetos** — **dentro da máquina**: placa de circuito em azul e ciano; um carrossel de cartões (print, nome, uma frase, tecnologias e links) que passa sozinho de tempos em tempos.
5. **Trajetória** — **noite estrelada**: um CD Player com uma linha do tempo em duas abas (Estudos e Cursos), cada etapa com um mini texto explicando o que é, e o CD volta como a lua, sobre um Discman.
6. **Competências** — **amanhecer de aço**: painel de controle só com as tecnologias que sei usar, agrupadas.
7. **Contato** — o céu do começo volta, e o ciclo fecha: cartão de visita, formulário e um flip phone mandando "bora conversar?".

## Documentos do projeto

| Arquivo | Para quê |
|---|---|
| `DESIGN_GUIDELINES.md` | regras de visual: paleta, tipografia, composição, movimento, acessibilidade |
| `AGENTS.md` | papéis (direção de arte, motion, UX, frontend, conteúdo, QA) e protocolo de trabalho |
| `PROMPTS_VISUAIS.md` | como encontrar, tratar ou gerar novas imagens dentro da direção |
| `CREDITOS.md` | origem e licença de cada imagem usada |
| `CLAUDE.md` | instruções para o Claude Code trabalhar no projeto |

## Critérios de qualidade

- Navegação previsível e acessível por teclado; conteúdo legível sem animação.
- Responsivo de verdade (testado em 1440×900 e 390×844), sem rolagem horizontal.
- `prefers-reduced-motion` respeitado: sem mergulho nem parallax; ambientes trocam de uma vez.
- Imagens leves (WebP/SVG), fundos carregados só quando a seção se aproxima.
- Conteúdo real: nada de projetos, cargos ou métricas inventados.
- Toda imagem com licença registrada.
