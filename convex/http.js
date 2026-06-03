import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function jsonResponse(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...corsHeaders,
      ...(init.headers || {}),
    },
  });
}

const optionsHandler = httpAction(async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
});

http.route({
  path: "/api/state",
  method: "OPTIONS",
  handler: optionsHandler,
});

http.route({
  path: "/api/state",
  method: "GET",
  handler: httpAction(async ctx => {
    const state = await ctx.runQuery(api.store.getState, {});
    return jsonResponse({ ok: true, state });
  }),
});

http.route({
  path: "/api/state",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.store.setState, {
      products: body.products,
      categories: body.categories,
      tableTemplates: body.tableTemplates,
    });
    return jsonResponse(result);
  }),
});

http.route({
  path: "/api/state-value",
  method: "OPTIONS",
  handler: optionsHandler,
});

http.route({
  path: "/api/state-value",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.store.setStateValue, {
      key: body.key,
      value: body.value,
    });
    return jsonResponse(result);
  }),
});

http.route({
  path: "/api/cart",
  method: "OPTIONS",
  handler: optionsHandler,
});

http.route({
  path: "/api/cart",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.store.saveCart, {
      cartId: body.cartId,
      items: body.items || [],
    });
    return jsonResponse(result);
  }),
});

http.route({
  path: "/api/order",
  method: "OPTIONS",
  handler: optionsHandler,
});

http.route({
  path: "/api/order",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.store.saveOrder, {
      order: body.order,
    });
    return jsonResponse(result);
  }),
});

// OPTIONS routes for Auth Endpoints
http.route({ path: "/api/auth/register", method: "OPTIONS", handler: optionsHandler });
http.route({ path: "/api/auth/login", method: "OPTIONS", handler: optionsHandler });
http.route({ path: "/api/auth/google", method: "OPTIONS", handler: optionsHandler });
http.route({ path: "/api/auth/orders", method: "OPTIONS", handler: optionsHandler });

// POST /api/auth/register
http.route({
  path: "/api/auth/register",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const result = await ctx.runMutation(api.store.registerUser, {
        name: body.name,
        email: body.email,
        passwordHash: body.passwordHash,
      });
      return jsonResponse(result);
    } catch (e) {
      return jsonResponse({ ok: false, error: e.message }, { status: 400 });
    }
  }),
});

// POST /api/auth/login
http.route({
  path: "/api/auth/login",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const user = await ctx.runQuery(api.store.getUserByEmail, {
        email: body.email,
      });
      if (!user) {
        return jsonResponse({ ok: false, error: "Потребител с този имейл не съществува." }, { status: 400 });
      }
      if (!user.passwordHash) {
        return jsonResponse({ ok: false, error: "Този профил е регистриран чрез Google. Моля, влезте с Google." }, { status: 400 });
      }
      if (user.passwordHash !== body.passwordHash) {
        return jsonResponse({ ok: false, error: "Грешна парола." }, { status: 400 });
      }
      return jsonResponse({
        ok: true,
        userId: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      });
    } catch (e) {
      return jsonResponse({ ok: false, error: e.message }, { status: 400 });
    }
  }),
});

// POST /api/auth/google
http.route({
  path: "/api/auth/google",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const result = await ctx.runMutation(api.store.googleLogin, {
        name: body.name,
        email: body.email,
        googleId: body.googleId,
        avatarUrl: body.avatarUrl,
      });
      return jsonResponse(result);
    } catch (e) {
      return jsonResponse({ ok: false, error: e.message }, { status: 400 });
    }
  }),
});

// GET /api/auth/orders?email=...
http.route({
  path: "/api/auth/orders",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const email = url.searchParams.get("email");
      if (!email) {
        return jsonResponse({ ok: false, error: "Липсва параметър email" }, { status: 400 });
      }
      const orders = await ctx.runQuery(api.store.getUserOrders, { email });
      return jsonResponse({ ok: true, orders });
    } catch (e) {
      return jsonResponse({ ok: false, error: e.message }, { status: 500 });
    }
  }),
});

export default http;
