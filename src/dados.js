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
  projetos: "Trabalhos que fiz na faculdade, em cursos e por conta própria.",
  trajetoria: "O caminho que fiz nos estudos até chegar aqui, do mais antigo ao mais recente.",
  competencias: "As linguagens e ferramentas que sei usar. Escolha uma para ver onde aprendi.",
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

// Falas do Zezinho: uma dica curta na primeira visita a cada seção.
// "projeto" pode apontar para um id de PROJETOS para abrir direto aquele projeto.
export const FALAS_ZEZINHO = {
  inicio: { texto: "Oi! Quer conhecer os projetos do Vinicius?", acao: "Ver projetos", href: "#projetos", pose: "aceno" },
  sobre: { texto: "Curiosidade é um ótimo ponto de partida. Quer ver o caminho até aqui?", acao: "Ver trajetória", href: "#trajetoria" },
  projetos: { texto: "O Hackathon Atria ficou em 2º lugar. Quer conhecer o projeto?", acao: "Ver Hackathon Atria", href: "#projetos", projeto: "hackathon-atria", pose: "aceno" },
  trajetoria: { texto: "Cada parada ensina algo. Quer espiar as ferramentas usadas?", acao: "Ver competências", href: "#competencias" },
  competencias: { texto: "Escolha uma tecnologia para ver onde ela aparece nos projetos.", acao: "Ir ao contato", href: "#contato" },
  contato: { texto: "Chegamos ao fim do passeio. O formulário está pronto quando você estiver." },
};

// Projetos: copie um bloco { ... } para adicionar. "tecnologias" usa os nomes de COMPETENCIAS.
// "imagem" fica em public/minhas-imagens/ (sem o arquivo, o cartão mostra "print em breve").
// "papel" é um selo curto (equipe/individual + destaque). Botões só aparecem se houver "repositorio" ou "demo".
export const PROJETOS = [
  { id: "memoria-viva", nome: "Memória Viva", categoria: "Instituto PROA", imagem: "/minhas-imagens/projeto-memoria-viva.jpg",
    resumo: "Plataforma web para guardar memórias e histórias de pessoas idosas e compartilhar com a família.",
    papel: "Em equipe · Demo Day 2026",
    tecnologias: [], repositorio: "", demo: "" },
  { id: "hackathon-atria", nome: "Hackathon Atria — 2º lugar", categoria: "Hackathon", imagem: "/minhas-imagens/projeto-hackathon-atria.jpg",
    resumo: "Dashboard com automação para controlar o estoque e a validade dos produtos de uma empresa do agronegócio.",
    papel: "Em equipe · 2º lugar",
    tecnologias: ["n8n"], repositorio: "", demo: "" },
  { id: "mini-rpg", nome: "Mini RPG em Python", categoria: "Projeto pessoal", imagem: "/minhas-imagens/projeto-mini-rpg.jpg",
    resumo: "RPG no terminal inspirado em Undertale, com combate por turnos.",
    papel: "Individual",
    tecnologias: ["Python"], repositorio: "", demo: "" },
  { id: "loja-impossivel", nome: "Loja Impossível", categoria: "Estudo", imagem: "/minhas-imagens/projeto-loja-impossivel.jpg",
    resumo: "Loja fictícia de “produtos que não existem”, feita do zero para estudar a base da web.",
    papel: "Individual · em andamento",
    tecnologias: ["HTML", "CSS", "JavaScript"], repositorio: "", demo: "" },
];

// Competências, agrupadas como no currículo. "icone" = arquivo em public/assets/tech/ (vazio = aparece o nome).
// "aprendi" é opcional: aparece no painel de detalhe.
export const COMPETENCIAS = [
  { nome: "Java",       icone: "java",       grupo: "Back-end · por trás do site",  tipo: "Linguagem",  aprendi: "Instituto PROA · Desenvolvimento Web Java" },
  { nome: "Python",     icone: "python",     grupo: "Back-end · por trás do site",  tipo: "Linguagem",  aprendi: "Curso em Vídeo · Python 3 (80h)" },
  { nome: "C#",         icone: "csharp",     grupo: "Back-end · por trás do site",  tipo: "Linguagem",  aprendi: "Alura · Praticando C# (38h)" },
  { nome: "HTML",       icone: "html5",      grupo: "Front-end · a parte que você vê", tipo: "Linguagem",  aprendi: "Curso em Vídeo · HTML5 & CSS3 (120h)" },
  { nome: "CSS",        icone: "css3",       grupo: "Front-end · a parte que você vê", tipo: "Linguagem",  aprendi: "Curso em Vídeo · HTML5 & CSS3 (120h)" },
  { nome: "JavaScript", icone: "javascript", grupo: "Front-end · a parte que você vê", tipo: "Linguagem" },
  { nome: "React",      icone: "react",      grupo: "Front-end · a parte que você vê", tipo: "Biblioteca" },
  { nome: "Figma",      icone: "figma",      grupo: "Design de telas", tipo: "Design" },
  { nome: "Canva",      icone: "canva",      grupo: "Design de telas", tipo: "Design" },
  { nome: "n8n",        icone: "",           grupo: "Automação e dados", tipo: "Automação",  aprendi: "Usado no Hackathon Atria (2º lugar)" },
  { nome: "Power BI",   icone: "",           grupo: "Automação e dados", tipo: "Dados" },
  { nome: "Git",        icone: "git",        grupo: "Ferramentas", tipo: "Versionamento" },
  { nome: "GitHub",     icone: "github",     grupo: "Ferramentas", tipo: "Plataforma" },
  { nome: "Copilot",    icone: "",           grupo: "Ferramentas", tipo: "IA generativa", aprendi: "USJT · IA Generativa e Copilot (51h)" },
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
  { quando: "51h", titulo: "IA Generativa e Copilot", local: "USJT", texto: "Como usar inteligência artificial para ajudar no trabalho." },
  { quando: "38h", titulo: "Praticando C#", local: "Alura", texto: "Linguagem de programação muito usada em sistemas e jogos." },
];
