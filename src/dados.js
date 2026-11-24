/* =========================================================
   DADOS DO PORTFÓLIO ← é aqui que você edita o conteúdo.
   Os componentes só leem estas listas; não precisa mexer no JSX
   para adicionar um projeto, uma competência ou trocar um texto.
   ========================================================= */

export const EMAIL = "viniciusaraujo.dev0@gmail.com"; // quem recebe as mensagens do formulário
export const GITHUB = "https://github.com/ViniciusAraujo-Coder";
export const LINKEDIN = "https://www.linkedin.com/in/vinicius-araujo-dev";
export const WHATSAPP = "https://wa.me/5511949476412";

// Currículo: coloque o PDF em public/minhas-imagens/curriculo.pdf (sem o arquivo, o botão não aparece no site publicado).
export const CURRICULO = "/minhas-imagens/curriculo.pdf";

// Frase curta embaixo do título de cada seção, explicando em palavras simples o que tem ali.
// Pense em alguém que nunca viu um portfólio: ela entende só lendo esta frase?
export const SECOES = {
  sobre: "Quem eu sou, o que estudo e do que gosto.",
  projetos: "Trabalhos que fiz na faculdade, no Instituto PROA e em hackathon.",
  trajetoria: "O caminho que fiz nos estudos até chegar aqui, do mais antigo ao mais recente.",
  competencias: "As linguagens e ferramentas que sei usar.",
  contato: "Quer conversar? Mande uma mensagem ou use um dos botões.",
};

// Sobre mim: 1 frase + 4 cartões. Cada cartão = ícone + rótulo + valor curto + detalhe.
// *palavra* = marca-texto lima. "cromo: true" põe o ícone num ladrilho claro (logos de tecnologia).
export const SOBRE = {
  destaque: "Curioso por natureza. Construindo meu caminho entre *tecnologia* e *histórias*.",
  cartoes: [
    { icone: "/assets/pack/camadas-ciano.svg", rotulo: "Estudo", valor: "Engenharia de Software", detalhe: "São Judas" },
    { icone: "/assets/tech/java.svg", cromo: true, rotulo: "Curso", valor: "Web Java", detalhe: "Instituto PROA" },
    { icone: "/assets/pack/planeta-ciano.svg", rotulo: "Idiomas", valor: "Espanhol e inglês", detalhe: "intermediário · básico" },
    { icone: "/assets/pack/estrela-anel-lima.svg", rotulo: "Nas horas livres", valor: "Música e história", detalhe: "sociologia · nostalgia" },
  ],
};

// Mais de um cargo? Eles se revezam sendo "digitados" na abertura.
export const CARGOS = ["Estudante de Engenharia de Software", "Desenvolvedor Web Java em formação", "Front-end e Back-end"];

// Projetos: copie um bloco { ... } para adicionar. A ordem aqui é a ordem no site.
// "resumo": UMA frase curta. "tecnologias" usa os nomes de COMPETENCIAS.
// "imagem" fica em public/minhas-imagens/ (sem o arquivo, o cartão mostra "print em breve").
// Botões só aparecem se houver "repositorio" (Ver código) ou "demo" (Abrir projeto).
export const PROJETOS = [
  { id: "memoria-viva", nome: "Memória Viva", imagem: "/minhas-imagens/projeto-memoria-viva.jpg",
    resumo: "Plataforma para registrar a própria história a partir de fotos, com a família participando.",
    tecnologias: ["React"], repositorio: "", demo: "https://memoria-viva-react.vercel.app/" },
  { id: "quintal", nome: "Quintal", imagem: "/minhas-imagens/projeto-quintal.jpg",
    resumo: "Rede social para animais, inspirada no Instagram.",
    tecnologias: ["React"], repositorio: "", demo: "https://viniciusaraujo-coder.github.io/quintal-clone-instagram/" },
  { id: "loja-impossivel", nome: "Loja Impossível", imagem: "/minhas-imagens/projeto-loja-impossivel.jpg",
    resumo: "Loja online de produtos que não existem, feita do zero.",
    tecnologias: ["HTML", "CSS", "JavaScript"], repositorio: "", demo: "https://viniciusaraujo-coder.github.io/Loja_Escola/" },
  { id: "multiverso-news", nome: "Multiverso News", imagem: "/minhas-imagens/projeto-multiverso-news.jpg",
    resumo: "Portal de notícias geek com matérias fictícias da cultura pop.",
    tecnologias: ["HTML", "CSS"], repositorio: "https://github.com/ViniciusAraujo-Coder/Multiverso_News", demo: "" },
  { id: "mini-rpg", nome: "Mini RPG em Python", imagem: "/minhas-imagens/projeto-mini-rpg.jpg",
    resumo: "Jogo de terminal inspirado em Undertale, feito para a disciplina de IA da faculdade.",
    tecnologias: ["Python"], repositorio: "https://github.com/ViniciusAraujo-Coder/Jogo-Undertale", demo: "" },
  { id: "hackathon-atria", nome: "Hackathon Atria — 2º lugar", imagem: "/minhas-imagens/projeto-hackathon-atria.jpg",
    resumo: "Dashboard com automação para controlar o estoque e a validade de produtos do agronegócio.",
    tecnologias: ["n8n"], repositorio: "", demo: "" },
];

// Competências, agrupadas como no currículo. "icone" = arquivo em public/assets/tech/ (vazio = aparece o nome).
export const COMPETENCIAS = [
  { nome: "Java",       icone: "java",       grupo: "Back-end · por trás do site" },
  { nome: "Python",     icone: "python",     grupo: "Back-end · por trás do site" },
  { nome: "C#",         icone: "csharp",     grupo: "Back-end · por trás do site" },
  { nome: "HTML",       icone: "html5",      grupo: "Front-end · a parte que você vê" },
  { nome: "CSS",        icone: "css3",       grupo: "Front-end · a parte que você vê" },
  { nome: "JavaScript", icone: "javascript", grupo: "Front-end · a parte que você vê" },
  { nome: "React",      icone: "react",      grupo: "Front-end · a parte que você vê" },
  { nome: "Figma",      icone: "figma",      grupo: "Design de telas" },
  { nome: "Canva",      icone: "canva",      grupo: "Design de telas" },
  { nome: "n8n",        icone: "",           grupo: "Automação e dados" },
  { nome: "Power BI",   icone: "",           grupo: "Automação e dados" },
  { nome: "Git",        icone: "git",        grupo: "Ferramentas" },
  { nome: "GitHub",     icone: "github",     grupo: "Ferramentas" },
  { nome: "Copilot",    icone: "",           grupo: "Ferramentas" },
];
export const POR_NOME = Object.fromEntries(COMPETENCIAS.map(c => [c.nome, c]));

// Trajetória: linha do tempo com duas abas (Estudos e Cursos).
// Cada item: "quando" (ano ou carga horária), "titulo", "local" e um "texto" curto
// explicando, em palavras simples, O QUE é aquilo. O item com atual: true fica destacado.
export const TRAJETORIA = [
  { quando: "2023", titulo: "Técnico em Administração", local: "ETEC Sapopemba",
    texto: "Curso técnico feito junto com o ensino médio." },
  { quando: "2024", titulo: "Engenharia de Software", local: "Universidade São Judas",
    texto: "Faculdade que ensina a criar e organizar programas. Lá fiquei em 2º lugar no Hackathon Atria, uma competição de soluções." },
  { quando: "2026", titulo: "Desenvolvimento Web Java", local: "Instituto PROA",
    texto: "Curso para criar sites e sistemas. Apresentei o projeto Memória Viva no dia de apresentações (Demo Day)." },
  { quando: "Hoje", titulo: "Em busca de estágio", local: "Desenvolvimento de Software",
    texto: "Procurando uma vaga para aprender e trabalhar criando sistemas.", atual: true },
];
export const CURSOS = [
  { quando: "120h", titulo: "HTML5 e CSS3", local: "Curso em Vídeo", texto: "A base para montar e dar estilo às páginas da internet." },
  { quando: "80h", titulo: "Python 3", local: "Curso em Vídeo", texto: "Linguagem de programação usada em automações, dados e jogos." },
  { quando: "51h", titulo: "Algoritmos, Lógica e Programação Orientada a Objetos", local: "USJT", texto: "A base da programação: pensar a solução passo a passo e organizar o código em partes reaproveitáveis." },
  { quando: "51h", titulo: "IA Generativa e Copilot para Desenvolvimento de Software", local: "USJT", texto: "Como usar inteligência artificial para ajudar no trabalho." },
  { quando: "38h", titulo: "Praticando C#", local: "Alura", texto: "Linguagem de programação muito usada em sistemas e jogos." },
];
