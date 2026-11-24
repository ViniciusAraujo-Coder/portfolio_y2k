# Suas imagens

Coloque os arquivos **nesta pasta (`public/minhas-imagens/`), com estes nomes exatos**. Enquanto um arquivo não existir,
o site mostra uma caixa tracejada "[x] imagem não encontrada" com o nome que falta.

| Arquivo | Onde aparece | Tamanho ideal |
|---|---|---|
| `eu.jpg` ✅ | Webcam da abertura e cartão do Contato | vertical, ex.: 900×1350 px |
| `projeto-memoria-viva.jpg` | Projetos | 4:3, ex.: 1600×1200 px (print da tela) |
| `projeto-hackathon-atria.jpg` | Projetos | 1600×1200 px |
| `projeto-mini-rpg.jpg` | Projetos | 1600×1200 px |
| `projeto-loja-impossivel.jpg` | Projetos | 1600×1200 px |
| `curriculo.pdf` | Botão "Baixar currículo" no Sobre mim e no Contato (sem o arquivo, o botão não aparece no site publicado) | PDF |

**Novo projeto?** Abra `src/dados.js`, copie um bloco `{ ... }` dentro de `PROJETOS`, troque os textos
e use um nome novo em `imagem` (começando com `/minhas-imagens/`). A lista, os filtros e as contagens se atualizam sozinhos.

Dica: até ~300 KB por imagem é ótimo (dá para reduzir em https://squoosh.app).
