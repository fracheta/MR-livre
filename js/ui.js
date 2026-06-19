// ============================================================
// MR-LIVRE | ui.js
// Renderização de produtos, carrinho, modais, filtros e toast
// ============================================================

// ---------- TOAST ----------
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ---------- RENDERIZAÇÃO DE CARDS ----------
function criarCard(produto) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.name = produto.nome;
  card.dataset.fit = produto.fit;
  card.dataset.price = produto.preco;
  card.dataset.id = produto.id;

  card.innerHTML = `
    <div class="img">${produto.img || 'Produto'}</div>
    <h3>${produto.nome}</h3>
    <p>${produto.descricao}</p>
    <div class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
    <span class="tag">${produto.categoria}</span>
    <div class="card-actions">
      <button class="btn btn-outline btn-add-cart" data-name="${produto.nome}">Adicionar</button>
      <button class="btn btn-outline btn-quick-view" data-name="${produto.nome}">Ver rápido</button>
    </div>
    <div class="small-actions">
      <button class="btn btn-outline btn-wishlist" data-name="${produto.nome}">♡ Wishlist</button>
      <button class="btn btn-outline btn-compare" data-name="${produto.nome}">⇆ Comparar</button>
    </div>
  `;
  return card;
}

// ---------- RENDERIZAR GRIDS ----------
function renderizarGrid(containerId, produtos) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  produtos.forEach(prod => grid.appendChild(criarCard(prod)));
}

function renderizarDestaques() {
  const destaques = idsDestaque.map(id => todosProdutos.find(p => p.id === id)).filter(Boolean);
  renderizarGrid('gridDestaques', destaques);
}

// ---------- CARRINHO UI ----------
function renderizarCarrinho() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  if (!cartItemsEl) return;

  cartItemsEl.innerHTML = '';

  if (cartManager.isEmpty) {
    cartEmptyEl.style.display = 'block';
    return;
  }

  cartEmptyEl.style.display = 'none';
  cartManager.items.forEach((p, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%">
        <div>
          <strong style="color:#4a3b10;font-size:0.9rem">${p.name}</strong>
          <div style="font-size:0.82rem;color:#7a7a7a">Qtd: ${p.qty}</div>
        </div>
        <div style="display:flex;gap:4px">
          <button class="btn btn-outline btn-cart-inc" data-index="${idx}" style="padding:4px 8px;font-size:0.8rem">+</button>
          <button class="btn btn-outline btn-cart-dec" data-index="${idx}" style="padding:4px 8px;font-size:0.8rem">-</button>
          <button class="btn btn-outline btn-cart-rem" data-index="${idx}" style="padding:4px 8px;font-size:0.8rem">×</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(li);
  });
}

// ---------- FILTROS ----------
function aplicarFiltros(gridId, searchId, fitId, precoId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  const termo = (document.getElementById(searchId)?.value || '').trim().toLowerCase();
  const fit = document.getElementById(fitId)?.value || '';
  const precoRange = document.getElementById(precoId)?.value || '';

  const cards = grid.querySelectorAll('.card');
  cards.forEach(card => {
    const nome = (card.dataset.name || '').toLowerCase();
    const cardFit = card.dataset.fit || '';
    const preco = parseFloat(card.dataset.price || '0');

    const matchNome = !termo || nome.includes(termo);
    const matchFit = !fit || cardFit === fit;

    let matchPreco = true;
    if (precoRange) {
      const [min, max] = precoRange.split('-').map(Number);
      matchPreco = preco >= min && preco <= max;
    }

    card.style.display = (matchNome && matchFit && matchPreco) ? '' : 'none';
  });
}

function resetarFiltros(gridId, searchId, fitId, precoId) {
  const searchEl = document.getElementById(searchId);
  const fitEl = document.getElementById(fitId);
  const precoEl = document.getElementById(precoId);
  if (searchEl) searchEl.value = '';
  if (fitEl) fitEl.value = '';
  if (precoEl) precoEl.value = '';
  aplicarFiltros(gridId, searchId, fitId, precoId);
}

// ---------- MODAIS ----------
function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('show');
}
function fecharModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('show');
}
function fecharTodosModais() {
  document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
}

// --- Busca Global ---
function atualizarBuscaGlobal() {
  const termo = (document.getElementById('globalSearch')?.value || '').trim().toLowerCase();
  const resEl = document.getElementById('searchResults');
  if (!resEl) return;
  resEl.innerHTML = '';

  const resultados = termo
    ? todosProdutos.filter(p => p.nome.toLowerCase().includes(termo))
    : todosProdutos;

  if (resultados.length === 0) {
    resEl.innerHTML = '<p style="grid-column:1/-1;color:#7a7a7a">Nenhum resultado encontrado.</p>';
    return;
  }

  resultados.forEach(prod => {
    const card = criarCard(prod);
    // Remove botões de ação redundantes no modal de busca
    card.querySelector('.small-actions')?.remove();
    card.querySelector('.card-actions')?.remove();
    const btnAdd = document.createElement('button');
    btnAdd.className = 'btn btn-solid';
    btnAdd.textContent = 'Adicionar ao carrinho';
    btnAdd.style.marginTop = '8px';
    btnAdd.addEventListener('click', () => {
      cartManager.addItem(prod.nome);
      renderizarCarrinho();
      showToast(`"${prod.nome}" adicionado ao carrinho!`, 'success');
    });
    card.appendChild(btnAdd);
    resEl.appendChild(card);
  });
}

// --- Quick View ---
function abrirQuickView(nomeProduto) {
  const produto = todosProdutos.find(p => p.nome === nomeProduto);
  if (!produto) return;

  document.getElementById('qvTitle').textContent = produto.nome;
  document.getElementById('qvBody').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
      <div>
        <div style="height:220px;border:1px solid #ead59a;border-radius:14px;display:flex;align-items:center;justify-content:center;background:#fffef9;color:#4a3b10;font-weight:600">${produto.img || 'Prévia'}</div>
      </div>
      <div>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
        <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
        <p><strong>Fit:</strong> ${produto.fit}</p>
        <p><strong>Guia de medidas:</strong> ombro, comprimento, amplitude de quadril</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
          <button class="btn btn-solid btn-add-cart" data-name="${produto.nome}">Adicionar ao carrinho</button>
          <button class="btn btn-outline btn-wishlist" data-name="${produto.nome}">♡ Wishlist</button>
        </div>
      </div>
    </div>
  `;
  abrirModal('quickViewModal');
}

// --- Modal Genérico ---
function abrirModalInfo(tipo) {
  const titleEl = document.getElementById('genericTitle');
  const bodyEl = document.getElementById('genericBody');
  if (tipo === 'loja-virtual') {
    titleEl.textContent = 'Loja virtual MR-Livre';
    bodyEl.innerHTML = '<p>A loja foi planejada para navegar por estilos e tipos de peça, com filtros práticos de caimento e ocasião. Checkout simples e suporte humano.</p>';
  } else {
    titleEl.textContent = 'Informações';
    bodyEl.innerHTML = '<p>Conteúdo em breve.</p>';
  }
  abrirModal('genericModal');
}
