// ============================================================
// MR-LIVRE | main.js
// Inicialização, event listeners e orchestration
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ========== RENDERIZAÇÃO INICIAL ==========
  renderizarDestaques();
  renderizarGrid('gridEssencial', produtosEssencial);
  renderizarGrid('gridConceito', produtosConceito);
  renderizarCarrinho();

  // ========== DELEGAÇÃO DE EVENTOS (document) ==========
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button');

    // --- Carrinho: adicionar ---
    if (target?.classList.contains('btn-add-cart')) {
      const nome = target.dataset.name;
      if (nome) {
        cartManager.addItem(nome);
        renderizarCarrinho();
        showToast(`"${nome}" adicionado ao carrinho!`, 'success');
      }
    }

    // --- Quick View ---
    if (target?.classList.contains('btn-quick-view')) {
      const nome = target.dataset.name;
      if (nome) abrirQuickView(nome);
    }

    // --- Wishlist ---
    if (target?.classList.contains('btn-wishlist')) {
      const nome = target.dataset.name;
      if (nome) {
        const added = cartManager.toggleWishlist(nome);
        showToast(added ? `"${nome}" salvo na wishlist!` : `"${nome}" removido da wishlist.`, 'info');
      }
    }

    // --- Comparador ---
    if (target?.classList.contains('btn-compare')) {
      const nome = target.dataset.name;
      if (nome) {
        const added = cartManager.toggleCompare(nome);
        showToast(added ? `"${nome}" adicionado ao comparador.` : `"${nome}" removido do comparador.`, 'info');
      }
    }

    // --- Carrinho: incrementar ---
    if (target?.classList.contains('btn-cart-inc')) {
      const idx = parseInt(target.dataset.index);
      cartManager.inc(idx);
      renderizarCarrinho();
    }

    // --- Carrinho: decrementar ---
    if (target?.classList.contains('btn-cart-dec')) {
      const idx = parseInt(target.dataset.index);
      cartManager.dec(idx);
      renderizarCarrinho();
    }

    // --- Carrinho: remover ---
    if (target?.classList.contains('btn-cart-rem')) {
      const idx = parseInt(target.dataset.index);
      cartManager.removeItem(idx);
      renderizarCarrinho();
      showToast('Item removido do carrinho.', 'warning');
    }

    // --- Blog ---
    if (target?.classList.contains('btn-blog')) {
      const slug = target.dataset.slug;
      showToast(`Post "${slug}" em breve!`, 'info');
    }

    // --- Modal info ---
    if (target?.classList.contains('btn-modal-info')) {
      const modalType = target.dataset.modal;
      if (modalType) abrirModalInfo(modalType);
    }
  });

  // ========== BOTÕES FIXOS (ID) ==========
  document.getElementById('btnCart')?.addEventListener('click', () => {
    const cartEl = document.getElementById('cart');
    cartEl.classList.toggle('show');
    renderizarCarrinho();
  });

  document.getElementById('btnCloseCart')?.addEventListener('click', () => {
    document.getElementById('cart').classList.remove('show');
  });

  document.getElementById('btnClearCart')?.addEventListener('click', () => {
    cartManager.clearCart();
    renderizarCarrinho();
    showToast('Carrinho limpo.', 'warning');
  });

  document.getElementById('btnCheckout')?.addEventListener('click', () => {
    showToast('Checkout de demonstração — em breve integração real. Obrigado!', 'success');
  });

  document.getElementById('btnSaveCart')?.addEventListener('click', () => {
    cartManager.saveCartToStorage();
    showToast('Carrinho salvo!', 'success');
  });

  document.getElementById('btnLoadCart')?.addEventListener('click', () => {
    cartManager.loadCartFromStorage();
    renderizarCarrinho();
    document.getElementById('cart').classList.add('show');
    showToast('Carrinho recuperado!', 'info');
  });

  // --- Busca ---
  document.getElementById('btnSearch')?.addEventListener('click', () => {
    abrirModal('searchModal');
    document.getElementById('globalSearch')?.focus();
    atualizarBuscaGlobal();
  });
  document.getElementById('btnCloseSearch')?.addEventListener('click', () => fecharModal('searchModal'));
  document.getElementById('globalSearch')?.addEventListener('input', atualizarBuscaGlobal);

  // --- Quick View ---
  document.getElementById('btnCloseQV')?.addEventListener('click', () => fecharModal('quickViewModal'));

  // --- Modal Genérico ---
  document.getElementById('btnCloseModal')?.addEventListener('click', () => fecharModal('genericModal'));

  // --- Filtros Essencial ---
  document.getElementById('searchEssencial')?.addEventListener('input', () => {
    aplicarFiltros('gridEssencial', 'searchEssencial', 'fitEssencial', 'precoEssencial');
  });
  document.getElementById('fitEssencial')?.addEventListener('change', () => {
    aplicarFiltros('gridEssencial', 'searchEssencial', 'fitEssencial', 'precoEssencial');
  });
  document.getElementById('precoEssencial')?.addEventListener('change', () => {
    aplicarFiltros('gridEssencial', 'searchEssencial', 'fitEssencial', 'precoEssencial');
  });
  document.getElementById('resetEssencial')?.addEventListener('click', () => {
    resetarFiltros('gridEssencial', 'searchEssencial', 'fitEssencial', 'precoEssencial');
  });

  // --- Filtros Conceito ---
  document.getElementById('searchConceito')?.addEventListener('input', () => {
    aplicarFiltros('gridConceito', 'searchConceito', 'fitConceito', 'precoConceito');
  });
  document.getElementById('fitConceito')?.addEventListener('change', () => {
    aplicarFiltros('gridConceito', 'searchConceito', 'fitConceito', 'precoConceito');
  });
  document.getElementById('precoConceito')?.addEventListener('change', () => {
    aplicarFiltros('gridConceito', 'searchConceito', 'fitConceito', 'precoConceito');
  });
  document.getElementById('resetConceito')?.addEventListener('click', () => {
    resetarFiltros('gridConceito', 'searchConceito', 'fitConceito', 'precoConceito');
  });

  // --- Download App ---
  document.getElementById('btnDownloadApp')?.addEventListener('click', () => {
    showToast('Download em breve na loja oficial!', 'info');
  });

  // --- Newsletter ---
  document.getElementById('formNewsletter')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsEmail').value.trim();
    if (email) {
      showToast(`Obrigado! Enviaremos novidades para ${email}`, 'success');
      e.target.reset();
    }
  });

  // --- Contato ---
  document.getElementById('formContato')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeContato').value.trim();
    if (nome) {
      showToast(`Mensagem enviada, ${nome}! Responderemos em até 24h.`, 'success');
      e.target.reset();
    }
  });

  // --- Menu Hamburguer ---
  document.getElementById('btnMenu')?.addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // --- Fechar modais com ESC ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fecharTodosModais();
      document.getElementById('cart').classList.remove('show');
    }
  });

  // --- Fechar modais ao clicar no overlay ---
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) fecharModal(modal.id);
    });
  });

  // --- Atualizar UI quando carrinho mudar ---
  cartManager.onChange(() => renderizarCarrinho());

  // ========== JSON-LD (SEO) ==========
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MR-Livre",
    "url": "https://www.lojamrlivre.com.br/",
    "logo": "https://www.lojamrlivre.com.br/logo-mr-livre.png",
    "sameAs": ["https://instagram.com/mr_livre", "https://tiktok.com/@mr_livre"],
    "brand": { "@type": "Brand", "name": "MR-Livre" }
  };
  const scriptLd = document.createElement('script');
  scriptLd.type = 'application/ld+json';
  scriptLd.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(scriptLd);

  console.log('🚀 MR-Livre inicializado com sucesso!');
});
