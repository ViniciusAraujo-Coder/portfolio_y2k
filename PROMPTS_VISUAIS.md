# Imagens — como encontrar, tratar e (se precisar) gerar

O site usa **imagens reais com licença** e **vetores do sticker pack**. Antes de gerar qualquer coisa, procure uma foto real: ela combina melhor com o scrapbook e não levanta dúvida de direitos.

## 1. Buscar imagens reais (primeira opção)

**Onde:** [Wikimedia Commons](https://commons.wikimedia.org). Aceite só: domínio público, CC0, CC BY, CC BY-SA. Registre autor, link e licença em `CREDITOS.md`.

**Termos que funcionam bem** (em inglês):
- Aparelhos: `Nokia 3310`, `Sony Cyber-shot`, `Discman`, `portable CD player`, `MiniDisc`, `flip phone`, `PDA Palm`, `iMac G3`, `CRT monitor`, `Tamagotchi` (evitar tons rosa), `Game Boy`.
- Recortes prontos: adicione `png` ou filtre por `filemime:image/png` para achar fundos transparentes.
- Fundos: `printed circuit board macro`, `Milky Way night sky field`, `server room`, `fiber optic`, `data center`, `aurora night sky`.

**Tratamento:**
- Fundos: redimensionar para 1920px de largura e salvar em WebP (qualidade ~70) em `public/assets/cenas/`.
- Recortes: remover o fundo, cortar a sobra transparente, salvar em WebP em `public/assets/recortes/`.
- Polaroids: recorte quadrado de 720×720 px, JPG, em `public/assets/y2k/`.
- Se a cor não cabe na paleta, trate no CSS (P&B, duotone) em vez de editar a foto.

## 2. Vetores do sticker pack

O pack original está em `fontes/Y2K-Elements-Digital-Sticker-Pack-130873181.zip` (77 vetores em `SVG/`). Ele fica só na máquina local (está no `.gitignore`): não versione o zip. Para usar um novo:
1. Copie o `Asset N.svg`.
2. Troque o preenchimento (`fill:#333` ou `fill:#042f35`) por uma cor da paleta (`#4de8ff`, `#c8ff2e`, `#ffffff`) ou pelo gradiente cromado (veja `public/assets/pack/brilho-cromo.svg`).
3. Salve em `public/assets/pack/nome-cor.svg` e registre em `CREDITOS.md`.

Bons candidatos ainda não usados: 85/86 (roda de raios), 87 (três cubos), 89 (losangos empilhados), 94 (círculo cortado), 108 (planeta), 109 (constelação de brilhos), 120 (grade em perspectiva), 132/145 (luas).

## 3. Gerar com IA (só se não existir foto real)

Regras: nada de texto, logo, marca ou interface legível na imagem; nada de rosa; manter iluminação escura com reflexos frios; pedir variações antes de escolher. Imagens geradas também entram em `CREDITOS.md` (ferramenta e data).

**Fundo — dentro da máquina**
"Extreme macro photograph of a dark printed circuit board, shallow depth of field, cold blue and cyan rim light, subtle chrome reflections on components, dark negative space for website text, photorealistic, no text, no logos, no watermark, 16:9."

**Fundo — noite sobre o campo**
"Wide night photograph of an open grassy field under a clear Milky Way sky, deep blue and black tones, faint cyan horizon glow, calm and cinematic, large dark sky area for text, photorealistic, no people, no text, no watermark, 16:9."

**Fundo — superfície holográfica**
"Abstract macro of the iridescent surface of a compact disc, diffraction rainbow reduced to blue, cyan and violet, dark background, smooth gradients, chrome highlights, no text, no logos, 16:9."

**Objeto cromado isolado (recorte)**
"Product photo of a [early-2000s gadget: portable CD player / flip phone / digital camera] in brushed silver and chrome, three-quarter view, studio lighting with cold blue rim light, isolated on plain white background for easy cutout, no brand logo, no text."

**Geometria abstrata**
"Minimal vector Y2K/techno geometric symbol: [wireframe cube / orbit rings / four-point star / perspective grid], single flat color, clean outlines, transparent background, no text." (Depois recolorir como no item 2.)

## 4. Checklist antes de colocar no site
- [ ] Licença confirmada e registrada em `CREDITOS.md`.
- [ ] Cabe na paleta (ou foi tratada via CSS).
- [ ] Entra num **grupo com sentido** de uma única seção (ver `DESIGN_GUIDELINES.md`).
- [ ] Peso adequado (fundo < ~250 KB, recorte < ~120 KB).
- [ ] `alt` descritivo se for conteúdo; `alt=""` + `aria-hidden` se for decoração.
