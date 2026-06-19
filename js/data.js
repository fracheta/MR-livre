// ============================================================
// MR-LIVRE | data.js
// Dados centralizados de produtos (Essencial + Conceito)
// ============================================================

const produtosEssencial = [
  {
    id: 'ess-001',
    nome: 'Camiseta Livre 100% algodão',
    descricao: 'Malha macia, gola reforçada e modelagem fluida.',
    preco: 79.90,
    fit: 'regular',
    categoria: 'Essencial',
    img: 'Camiseta'
  },
  {
    id: 'ess-002',
    nome: 'Jeans Versátil corte reto',
    descricao: 'Lavagem clássica, tecido resistente e liberdade de movimento.',
    preco: 189.90,
    fit: 'regular',
    categoria: 'Essencial',
    img: 'Jeans'
  },
  {
    id: 'ess-003',
    nome: 'Moletom Atemporal',
    descricao: 'Conforto térmico e toque suave, ideal para camadas.',
    preco: 159.90,
    fit: 'solto',
    categoria: 'Essencial',
    img: 'Moletom'
  },
  {
    id: 'ess-004',
    nome: 'Camisa leve de linho',
    descricao: 'Tecido respirável, toque natural e caimento relax.',
    preco: 219.90,
    fit: 'solto',
    categoria: 'Essencial',
    img: 'Camisa'
  },
  {
    id: 'ess-005',
    nome: 'Short Versátil cintura elástica',
    descricao: 'Mobilidade e conforto com regulagem prática.',
    preco: 109.90,
    fit: 'regular',
    categoria: 'Essencial',
    img: 'Short'
  },
  {
    id: 'ess-006',
    nome: 'Cardigan Básico textura fina',
    descricao: 'Camada leve para compor looks atemporais.',
    preco: 169.90,
    fit: 'regular',
    categoria: 'Essencial',
    img: 'Cardigan'
  }
];

const produtosConceito = [
  {
    id: 'con-001',
    nome: 'Camisa Estrutural assimétrica',
    descricao: 'Recortes arquitetônicos, caimento inteligente e botões invisíveis.',
    preco: 249.90,
    fit: 'estruturado',
    categoria: 'Conceito',
    img: 'Camisa assimétrica'
  },
  {
    id: 'con-002',
    nome: 'Calça Fluida com pregas',
    descricao: 'Movimento elegante e tecido leve para looks autorais.',
    preco: 279.90,
    fit: 'solto',
    categoria: 'Conceito',
    img: 'Calça fluida'
  },
  {
    id: 'con-003',
    nome: 'Casaco Estrutural com gola ampla',
    descricao: 'Construção sofisticada, acabamento impecável e presença marcante.',
    preco: 399.90,
    fit: 'estruturado',
    categoria: 'Conceito',
    img: 'Casaco'
  },
  {
    id: 'con-004',
    nome: 'Colete Escultórico',
    descricao: 'Volumes equilibrados e regulagens que valorizam diferentes corpos.',
    preco: 229.90,
    fit: 'estruturado',
    categoria: 'Conceito',
    img: 'Colete'
  },
  {
    id: 'con-005',
    nome: 'Saia Painel Modular',
    descricao: 'Painéis ajustáveis e textura premium para composições autorais.',
    preco: 259.90,
    fit: 'regular',
    categoria: 'Conceito',
    img: 'Saia'
  },
  {
    id: 'con-006',
    nome: 'Macacão Linha Limpa',
    descricao: 'Design minimalista, zíper invisível e caimento elegante.',
    preco: 349.90,
    fit: 'regular',
    categoria: 'Conceito',
    img: 'Macacão'
  }
];

// IDs dos produtos em destaque
const idsDestaque = ['ess-001', 'ess-002', 'ess-003'];

// Todos os produtos (para busca global)
const todosProdutos = [...produtosEssencial, ...produtosConceito];
