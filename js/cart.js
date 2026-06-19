// ============================================================
// MR-LIVRE | cart.js
// Gerenciamento de carrinho, wishlist e comparador
// ============================================================

class CartManager {
  constructor() {
    this.items = [];
    this.wishlist = new Set();
    this.compareList = new Set();
    this.listeners = [];
    this._loadFromStorage();
  }

  // --- Observers ---
  onChange(fn) { this.listeners.push(fn); }
  _notify() { this.listeners.forEach(fn => fn(this)); }

  // --- Carrinho ---
  addItem(productName) {
    const found = this.items.find(p => p.name === productName);
    if (found) { found.qty++; }
    else { this.items.push({ name: productName, qty: 1 }); }
    this._saveCart();
    this._notify();
  }

  inc(index) { 
    if (this.items[index]) { this.items[index].qty++; this._saveCart(); this._notify(); }
  }
  dec(index) {
    if (this.items[index]) {
      this.items[index].qty = Math.max(1, this.items[index].qty - 1);
      this._saveCart(); this._notify();
    }
  }
  removeItem(index) {
    this.items.splice(index, 1);
    this._saveCart(); this._notify();
  }
  clearCart() {
    this.items = [];
    this._saveCart(); this._notify();
  }
  get totalItems() { return this.items.reduce((sum, p) => sum + p.qty, 0); }
  get isEmpty() { return this.items.length === 0; }

  // --- Wishlist ---
  toggleWishlist(productName) {
    if (this.wishlist.has(productName)) {
      this.wishlist.delete(productName);
      return false; // removido
    } else {
      this.wishlist.add(productName);
      return true; // adicionado
    }
  }
  isWishlisted(productName) { return this.wishlist.has(productName); }

  // --- Comparador ---
  toggleCompare(productName) {
    if (this.compareList.has(productName)) {
      this.compareList.delete(productName);
      return false;
    } else {
      this.compareList.add(productName);
      return true;
    }
  }
  isComparing(productName) { return this.compareList.has(productName); }

  // --- Persistência ---
  _saveCart() {
    try { localStorage.setItem('mr_cart', JSON.stringify(this.items)); } catch(e) {}
  }
  _loadFromStorage() {
    try {
      const data = JSON.parse(localStorage.getItem('mr_cart') || '[]');
      if (Array.isArray(data)) this.items = data;
    } catch(e) { this.items = []; }
  }
  saveCartToStorage() {
    this._saveCart();
  }
  loadCartFromStorage() {
    this._loadFromStorage();
    this._notify();
  }
}

// Instância global
const cartManager = new CartManager();
