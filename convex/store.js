import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const STATE_KEYS = ["products", "categories", "tableTemplates"];

async function getStateDoc(ctx, key) {
  return await ctx.db
    .query("appState")
    .withIndex("by_key", q => q.eq("key", key))
    .unique();
}

export const getState = query({
  args: {},
  handler: async ctx => {
    const result = {};

    for (const key of STATE_KEYS) {
      const doc = await getStateDoc(ctx, key);
      result[key] = doc ? doc.value : null;
      result[`${key}UpdatedAt`] = doc ? doc.updatedAt : null;
    }

    return result;
  },
});

export const setStateValue = mutation({
  args: {
    key: v.string(),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    if (!STATE_KEYS.includes(args.key)) {
      throw new Error(`Unsupported state key: ${args.key}`);
    }

    const updatedAt = Date.now();
    const existing = await getStateDoc(ctx, args.key);

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value, updatedAt });
    } else {
      await ctx.db.insert("appState", {
        key: args.key,
        value: args.value,
        updatedAt,
      });
    }

    return { ok: true, updatedAt };
  },
});

export const setState = mutation({
  args: {
    products: v.optional(v.any()),
    categories: v.optional(v.any()),
    tableTemplates: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const updatedAt = Date.now();

    for (const key of STATE_KEYS) {
      if (args[key] === undefined) continue;

      const existing = await getStateDoc(ctx, key);
      if (existing) {
        await ctx.db.patch(existing._id, { value: args[key], updatedAt });
      } else {
        await ctx.db.insert("appState", {
          key,
          value: args[key],
          updatedAt,
        });
      }
    }

    return { ok: true, updatedAt };
  },
});

export const saveCart = mutation({
  args: {
    cartId: v.string(),
    items: v.any(),
  },
  handler: async (ctx, args) => {
    const updatedAt = Date.now();
    const existing = await ctx.db
      .query("carts")
      .withIndex("by_cart_id", q => q.eq("cartId", args.cartId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { items: args.items, updatedAt });
    } else {
      await ctx.db.insert("carts", {
        cartId: args.cartId,
        items: args.items,
        updatedAt,
      });
    }

    return { ok: true, updatedAt };
  },
});

export const saveOrder = mutation({
  args: {
    order: v.any(),
  },
  handler: async (ctx, args) => {
    const order = args.order;
    const orderNumber = String(order.orderNumber || `HL-${Date.now()}`);
    const createdAt = order.createdAt || Date.now();

    await ctx.db.insert("orders", {
      orderNumber,
      customer: order.customer || {},
      items: order.items || [],
      totals: order.totals || {},
      delivery: order.delivery,
      address: order.address,
      notes: order.notes,
      clientType: order.clientType,
      b2bDetails: order.b2bDetails,
      status: order.status || "new",
      createdAt,
    });

    return { ok: true, orderNumber, createdAt };
  },
});
