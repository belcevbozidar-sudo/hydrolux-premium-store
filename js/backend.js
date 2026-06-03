// Convex-backed persistence for products, categories, table templates, carts and orders.
const HydroluxBackend = {
  httpUrl: "https://hearty-civet-846.eu-west-1.convex.site",
  storagePrefix: "hydrolux_",

  async request(path, options = {}) {
    const response = await fetch(`${this.httpUrl}${path}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Convex request failed: ${response.status}`);
    }

    return await response.json();
  },

  async getState() {
    const result = await this.request("/api/state");
    return result.state || {};
  },

  async saveState(values) {
    return await this.request("/api/state", {
      method: "POST",
      body: values,
    });
  },

  async saveStateValue(key, value) {
    return await this.request("/api/state-value", {
      method: "POST",
      body: { key, value },
    });
  },

  getCartId() {
    const key = `${this.storagePrefix}cart_id`;
    let cartId = localStorage.getItem(key);
    if (!cartId) {
      cartId = `cart_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(key, cartId);
    }
    return cartId;
  },

  async saveCart(items) {
    return await this.request("/api/cart", {
      method: "POST",
      body: {
        cartId: this.getCartId(),
        items,
      },
    });
  },

  async saveOrder(order) {
    return await this.request("/api/order", {
      method: "POST",
      body: { order },
    });
  },

  async hashPassword(password) {
    if (!crypto || !crypto.subtle) {
      // Fallback for environments without crypto support (rare in modern browsers)
      return password;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "hydrolux_salt_123!");
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  async authRegister(name, email, password) {
    const passwordHash = await this.hashPassword(password);
    return await this.request("/api/auth/register", {
      method: "POST",
      body: { name, email, passwordHash },
    });
  },

  async authLogin(email, password) {
    const passwordHash = await this.hashPassword(password);
    return await this.request("/api/auth/login", {
      method: "POST",
      body: { email, passwordHash },
    });
  },

  async authGoogleLogin(userData) {
    return await this.request("/api/auth/google", {
      method: "POST",
      body: userData,
    });
  },

  async getUserOrders(email) {
    return await this.request(`/api/auth/orders?email=${encodeURIComponent(email)}`, {
      method: "GET",
    });
  },
};
