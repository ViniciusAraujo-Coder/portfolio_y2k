"""
"Assa" (aplica de vez) os filtros de cor dos fundos nas próprias imagens.

Por quê: filtros CSS (grayscale, brightness, mix-blend-mode...) em fundos de tela
inteira são recalculados pelo navegador sempre que a camada muda (zoom, giro,
transição). Em PCs e celulares fracos isso trava o scroll. Com a cor já pronta no
arquivo, o navegador só desenha a imagem.

Uso (na raiz do projeto):  python fontes/assa-cenas.py
Lê os originais em fontes/cenas-originais/ e grava as versões tratadas em public/assets/.
Requer: pip install pillow numpy
"""
import math, pathlib
import numpy as np
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ORIG = RAIZ / "fontes" / "cenas-originais"
SAIDA = RAIZ / "public" / "assets"

# ---- filtros CSS, com as mesmas fórmulas da especificação (Filter Effects) ----
def matriz(img, m): return np.clip(img @ np.array(m).T, 0, 1)
def saturate(img, s):
    return matriz(img, [[.213 + .787*s, .715 - .715*s, .072 - .072*s],
                        [.213 - .213*s, .715 + .285*s, .072 - .072*s],
                        [.213 - .213*s, .715 - .715*s, .072 + .928*s]])
def grayscale(img): return saturate(img, 0)
def hue_rotate(img, graus):
    c, s = math.cos(math.radians(graus)), math.sin(math.radians(graus))
    return matriz(img, [[.213 + c*.787 - s*.213, .715 - c*.715 - s*.715, .072 - c*.072 + s*.928],
                        [.213 - c*.213 + s*.143, .715 + c*.285 + s*.140, .072 - c*.072 - s*.283],
                        [.213 - c*.213 - s*.787, .715 - c*.715 + s*.715, .072 + c*.928 + s*.072]])
def brightness(img, b): return np.clip(img * b, 0, 1)
def contrast(img, c): return np.clip(img * c + (.5 - .5 * c), 0, 1)

# ---- mix-blend-mode: color (a cor vem do degradê, a luz vem da foto) ----
def lum(c): return c[..., 0:1] * .3 + c[..., 1:2] * .59 + c[..., 2:3] * .11
def blend_color(base, cor, opacidade):
    r = cor + (lum(base) - lum(cor))
    l, n, x = lum(r), r.min(-1, keepdims=True), r.max(-1, keepdims=True)
    r = np.where(n < 0, l + (r - l) * l / np.maximum(l - n, 1e-6), r)
    r = np.where(x > 1, l + (r - l) * (1 - l) / np.maximum(x - l, 1e-6), r)
    return base * (1 - opacidade) + np.clip(r, 0, 1) * opacidade

def hexa(h): return np.array([int(h[i:i+2], 16) / 255 for i in (1, 3, 5)])
def degrade(t, paradas):
    pos = [p for p, _ in paradas]; cores = np.array([hexa(c) for _, c in paradas])
    return np.stack([np.interp(t, pos, cores[:, k]) for k in range(3)], -1)

def processa(origem, destino, funcao, largura=None):
    im = Image.open(ORIG / origem)
    if largura and im.width > largura: im = im.resize((largura, round(im.height * largura / im.width)), Image.LANCZOS)
    alfa = im.getchannel("A") if im.mode == "RGBA" else None
    rgb = np.asarray(im.convert("RGB"), dtype=np.float64) / 255
    out = Image.fromarray((funcao(rgb) * 255 + .5).astype(np.uint8))
    if alfa: out.putalpha(alfa)
    (SAIDA / destino).parent.mkdir(parents=True, exist_ok=True)
    out.save(SAIDA / destino, "WEBP", quality=80, method=6)
    print("ok", destino, out.size)

# céu (abertura e contato): brightness(.5) contrast(1.2) saturate(1.25) hue-rotate(-10deg)
ceu = lambda x: hue_rotate(saturate(contrast(brightness(x, .5), 1.2), 1.25), -10)
processa("sky-1280.webp", "sky-1280.webp", ceu)
processa("sky-2200.webp", "sky-2200.webp", ceu)

# superfície do CD (Sobre): brightness(.6) saturate(1.25) contrast(1.15)
processa("cd.webp", "cenas/disco.webp", lambda x: contrast(saturate(brightness(x, .6), 1.25), 1.15))

# noite (Trajetória): brightness(.8) contrast(1.1)
processa("noite.webp", "cenas/noite.webp", lambda x: contrast(brightness(x, .8), 1.1))

# circuito (Projetos): P&B escuro + duotone diagonal azul elétrico → ciano (135deg, 70%)
def circuito(x):
    h, w, _ = x.shape
    x = contrast(brightness(grayscale(x), .42), 1.35)
    yy, xx = np.mgrid[0:h, 0:w]
    s = math.sin(math.radians(135)); c = math.cos(math.radians(135))
    comp = abs(w * s) + abs(h * c)
    t = ((xx - w / 2) * s - (yy - h / 2) * c) / comp + .5
    return blend_color(x, degrade(t, [(0, "#1b28e6"), (1, "#4de8ff")]), .7)
processa("circuito.webp", "cenas/circuito.webp", circuito)

# amanhecer de aço (Competências): P&B + duotone vertical azul → ciano → lima (50%)
def amanhecer(x):
    h, w, _ = x.shape
    x = brightness(contrast(grayscale(x), 1.3), .55)
    t = np.repeat(np.linspace(0, 1, h)[:, None], w, 1)
    return blend_color(x, degrade(t, [(0, "#1b28e6"), (.35, "#2b7bff"), (.62, "#4de8ff"), (1, "#c8ff2e")]), .5)
processa("amanhecer.webp", "cenas/amanhecer.webp", amanhecer)
