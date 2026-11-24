# Diretrizes de design — vinicius.exe

## 1. Direção

**Uma apresentação futurista dos anos 2000, vista de dentro da máquina.** Cyber Y2K + techno: fundos escuros, cromado, linhas finas em ciano, grade em perspectiva, geometria vetorial abstrata e janelas de sistema operacional antigo funcionando como "cartões" de conteúdo — tudo montado como um **scrapbook digital planejado**, com sobreposições e leves inclinações.

O resultado deve ser profissional e fácil de navegar: a estética mora no cenário, nos materiais e no movimento; o conteúdo e o menu continuam óbvios.

**Fora da direção** (fases anteriores, descartadas): Frutiger Aero (água, peixes, bolhas, aquário), paleta rosa/pastel, Comic Sans, stickers "fofos" (borboleta, estrelinhas puffy, bichinho virtual).

## 2. Narrativa e ambientes

A página é **uma jornada contínua**, como um dia inteiro que termina onde começou. Cada seção tem um ambiente próprio, e a troca entre eles é perceptível, mas suave.

| Seção | Ambiente | Como o ambiente entra |
|---|---|---|
| Abertura | Tela de boot (azul CRT) + **CD girando** | O CD cresce e o céu abre **pelo furo do disco** |
| Início | Céu e campo graduados para a noite | Janelas "pipocam" uma a uma; depois sobem em profundidades diferentes |
| Sobre mim | **Superfície do CD** (o disco gigante girando) | Íris circular a partir do centro |
| Projetos | **Dentro da máquina** (placa de circuito, duotone azul/ciano + grade) | Fade com leve aproximação |
| Trajetória | Noite estrelada sobre o campo; o **CD vira a lua**. Conteúdo: linha do tempo com abas Estudos / Cursos dentro do CD Player — cada parada é uma "faixa" (ano cromado, bolinha na linha, cartão com etiqueta FAIXA 01…; a atual mostra ▶ TOCANDO AGORA com equalizador e brilha em lima) — no PC horizontal, no celular vertical com a linha à esquerda; a linha se desenha e as paradas entram em sequência | Fade das estrelas |
| Competências | **Amanhecer de aço** (P&B + duotone azul → ciano → lima) | Círculo nascendo do horizonte |
| Contato | O céu do começo — o ciclo fecha | Fade |

O **CD** é o fio condutor: sai da abertura, pousa no halo do Início, cai na superfície do disco e some dentro da máquina; reaparece como lua na Trajetória.

Ordem das seções: Início → Sobre mim → Projetos → Trajetória → Competências → Contato.

## 3. Paleta

```css
:root {
  --preto: #0b0d12;          /* fundo, sombras duras, etiquetas Dymo */
  --papel: #0d1118;          /* corpo das janelas */
  --linha: #2a3342;          /* divisórias */
  --tinta: #e6ecf6;          /* texto principal */
  --tinta-2: #97a3b8;        /* texto secundário */
  --azul-eletrico: #2330ff;  /* ações principais, etiquetas de seção */
  --ciano: #4de8ff;          /* luz, seleção, HUD, informação */
  --lima: #c8ff2e;           /* acento ácido — pouco e em pontos-chave */
  --cromo: linear-gradient(180deg, #fff 0%, #cfd6e0 34%, #5b6473 50%, #eef2f7 60%, #9aa3b2 82%, #e9edf3 100%);
}
```

- **Azul elétrico** = ação principal (botões "Ver meus projetos", "Enviar") e etiquetas "01 · quem sou".
- **Ciano** = estado ativo/selecionado (filtro, pasta, tecnologia), brilhos de HUD, linhas finas.
- **Lima** = no máximo 1–2 pontos por tela: botão Contato, post-it, faixa "Hoje", botão fechar das janelas, marca-texto.
- **Cromo** = títulos e ladrilhos de ícones; nunca em texto corrido.
- Proibido: rosa, lilás, pastéis. Laranja só quando vem da própria foto (ex.: disquete).

## 4. Tipografia (fontes do sistema — sem dependência externa)

| Uso | Fonte | Tratamento |
|---|---|---|
| Títulos de seção e nome | Arial Black | gradiente cromado, contorno azul elétrico, sombra preta dura + brilho ciano |
| Interface e texto corrido | Tahoma / Verdana | 13–15px, cor `--tinta` |
| Dados técnicos, visor, boot | Courier New | verde no visor do CD Player, ciano no terminal |
| Etiquetas (polaroid, post-it, balões) | Lucida Console | MAIÚSCULAS, letter-spacing, estilo etiquetadora Dymo |

## 5. Composição

- **Cada seção é uma tela:** ao clicar no menu, a seção ocupa exatamente a área abaixo da barra (`100svh − 64px`) com o conteúdo centralizado na vertical; tudo precisa caber em 1440×900 e 1366×768. Entre seções há um respiro de ~¼ da tela (`margin-bottom`), onde o próximo ambiente começa a entrar.
- **Janelas não cobrem o texto de outras janelas.** Ficam lado a lado (ou em cascata só pela borda); quem se sobrepõe são os recortes decorativos.
- **Cada seção:** 1 peça principal (janela grande) + **no máximo 2 grupos de apoio**. Sempre sobra uma área de respiro.
- **Grupos com sentido**, nunca peças soltas aleatórias. Exemplos atuais: flip phone + satélite + SMS; CD-lua + órbita + estrela cadente + Discman; polaroids (câmera digital + Nokia 3310) + redemoinho.
- **Sobreposição intencional:** inclinações de ±0,5° a ±3° nas janelas, até ±14° em recortes. 
- **Cada imagem aparece em uma única seção** — exceção: o CD, que é o protagonista.
- **Geometria abstrata** (espirógrafo, órbita, mira, cubo, globo de arame): 1 por seção, baixa opacidade ou cor de HUD, girando devagar.
- **Para qualquer pessoa entender (inclusive quem não é da área):** cada seção tem, embaixo do título, uma frase simples dizendo o que tem nela (`SECOES` em `dados.js`); cada etapa da trajetória tem título + local + um mini texto explicando o que é; termos técnicos vêm com explicação curta (ex.: "Back-end · por trás do site"). Nada de "interface de mentira" no conteúdo (menus Arquivo/Editar, visores, botões falsos): a janela retrô fica só na moldura e na barra de título.
- **Pouco texto:** frases curtas; listas no formato rótulo → valor; cada projeto com 1 frase de resumo + 1 de papel. O Sobre mim tem só 1 frase de destaque (com os botões de currículo e trajetória) + 4 cartões separados (ícone do pack + rótulo + 2–3 palavras) + o mural de aparelhos. Mais elemento, menos texto. Projetos: no PC fica o explorador com pastas + janela do projeto aberto (estética retrô); no celular vira um carrossel de cartões grandes, um projeto por vez, deslizando para o lado (scroll-snap) com bolinhas embaixo indicando quantos são e qual está à vista. Competências: painel com um cartão por grupo (nome + explicação curta), ícones em ladrilho cromado com anel ciano na escolhida; detalhes na janela ao lado (PC) ou logo abaixo do grupo tocado (celular). Contato: cartão de perfil (foto redonda, nome cromado, status em pílulas) + 4 canais em cartõezinhos (ícone + nome + o que é: E-mail, WhatsApp, LinkedIn, GitHub) + formulário com campos arredondados.
- Em telas ≤ 960px as colagens viram **uma coluna limpa**: tudo com a mesma largura e centralizado, janelas retas (inclinação só nos recortes), sem margens negativas. No celular o Zezinho só fala quando tocado.

### Materiais
- **Janelas:** vidro escuro com borda metálica fina; três variantes — `xp` (padrão), `98` (metal com relevo) e `grafite` (barra metálica). LED ciano na barra; botão fechar lima.
- **Botões:** metal escuro que acende em ciano no hover; azul elétrico e lima para ações de destaque.
- **Fotos:** polaroid branca com fita e etiqueta Dymo.
- **HUD:** grade "Tron" em perspectiva no chão, scanlines e vinheta — comuns a todos os ambientes.

## 6. Imagens e recortes

- Só **imagens reais com licença verificável** (Wikimedia Commons, domínio público, CC0, CC BY, CC BY-SA) ou **vetores do sticker pack** (`fontes/`), recoloridos em cromo, lima, ciano ou branco.
- Não desenhar stickers com CSS, SVG feito à mão ou emoji. CSS desenha apenas interface.
- Fundos podem ser tratados via CSS (P&B, duotone, brilho) para caber na paleta; recortes com cor fora da paleta podem virar P&B (ex.: Discman).
- Toda imagem nova entra em `CREDITOS.md` com autor, link e licença. Pinterest (`REFERENCIAS/`) é só inspiração.
- Formatos: WebP para fotos e recortes (fundos até 1920px, recortes até ~1000px), SVG para vetores.

## 7. Foto e assistente

- `public/minhas-imagens/eu.jpg` aparece na webcam da abertura (com a caixa verde "Dev") e no cartão do Contato.
- **Zezinho** (a calopsita do Vinicius) é o assistente: uma dica curta por seção, pode ser minimizado, silenciado ou ter as dicas desligadas; dorme após 1 minuto parado; some durante o mergulho. Confirmar a licença do GIF antes de publicar.

## 8. Movimento

- O scroll **conecta cenas**; nunca prende, acelera ou substitui a rolagem normal.
- Abertura em 3 atos: mergulho (0–34% da abertura), janelas abrindo (`data-quando`), saída em profundidade (`--saida` × `--prof`, a partir de 86%).
- Entradas de conteúdo: janelas "pulam" para dentro (`.revela`, IntersectionObserver), irmãos em sequência.
- Parallax leve em recortes com `data-prof`.
- Acabamento vivo, sem poluir: barra de progresso ciano → lima na base do menu; faixa de luz atravessando os títulos cromados quando a seção aparece (e no hover); LED das janelas respirando; recortes flutuando devagar, polaroids balançando e brilhos do pack cintilando ao lado dos títulos. Tudo pausa fora da tela e some no modo leve/movimento reduzido.
- Usar `transform`/`opacity`/`clip-path`; um único ciclo de `requestAnimationFrame` para tudo que depende do scroll (`useJornada`), que só escreve um estilo quando o valor muda.
- **Leve em qualquer máquina:** nada de `filter`, `mix-blend-mode` ou `backdrop-filter` em camadas de tela cheia (as cores dos fundos ficam prontas no arquivo via `fontes/assa-cenas.py`); nada de `drop-shadow` em peças que giram; animar `transform`, nunca `width`/`height`/`background-position`.
- Animações contínuas pausam quando a seção sai da tela (`.fora`). Em aparelhos lentos (mediana < ~42 fps na carga) o site liga sozinho o **modo leve** (`.leve`): param os giros decorativos e as sombras caras; a jornada continua igual. Testar com `?leve` no endereço.
- Entradas sem quicar: sobe ~28px e aparece, com `cubic-bezier(.22, 1, .36, 1)`.
- **`prefers-reduced-motion`:** sem mergulho, sem CD viajante, sem parallax e sem giros; os ambientes trocam de uma vez; toda a colagem da abertura aparece estática.

## 9. Responsividade, acessibilidade e performance

- Testar 1440×900 e 390×844 (e ao menos uma largura intermediária). Sem rolagem horizontal.
- Contraste no escuro: texto `--tinta` sobre `--papel`; logos de tecnologia sempre sobre ladrilho cromado claro.
- Foco visível (tracejado azul elétrico), navegação por Tab (ao entrar na colagem, todas as peças abrem), `aria-current` no menu, textos alternativos reais nas fotos e `alt=""` nos decorativos.
- Fundos só baixam quando a seção está perto (`data-src`); fotos com `loading="lazy"`.
- Som só depois de clique e com botão para desligar.
