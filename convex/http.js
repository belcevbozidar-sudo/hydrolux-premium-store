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

export default http;
