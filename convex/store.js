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
      city: order.city,
      postcode: order.postcode,
      address: order.address,
      paymentMethod: order.paymentMethod,
      invoiceDetails: order.invoiceDetails,
      notes: order.notes,
      clientType: order.clientType,
      b2bDetails: order.b2bDetails,
      status: order.status || "new",
      createdAt,
    });

    return { ok: true, orderNumber, createdAt };
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", q => q.eq("email", args.email.toLowerCase().trim()))
      .unique();
  },
});

export const registerUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    passwordHash: v.string(),
  },
  handler: async (ctx, args) => {
    const emailNormalized = args.email.toLowerCase().trim();
    const nameClean = args.name.trim();

    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", q => q.eq("email", emailNormalized))
      .unique();

    if (existing) {
      throw new Error("User already exists");
    }

    const userId = await ctx.db.insert("users", {
      name: nameClean,
      email: emailNormalized,
      passwordHash: args.passwordHash,
      createdAt: Date.now(),
    });

    return { ok: true, userId, name: nameClean, email: emailNormalized };
  },
});

export const googleLogin = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    googleId: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const emailNormalized = args.email.toLowerCase().trim();
    const nameClean = args.name.trim();

    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", q => q.eq("email", emailNormalized))
      .unique();

    if (existing) {
      const patch = {};
      if (!existing.googleId) patch.googleId = args.googleId;
      if (args.avatarUrl && !existing.avatarUrl) patch.avatarUrl = args.avatarUrl;
      
      if (Object.keys(patch).length > 0) {
        await ctx.db.patch(existing._id, patch);
      }

      return {
        ok: true,
        userId: existing._id,
        name: existing.name,
        email: existing.email,
        avatarUrl: existing.avatarUrl || args.avatarUrl,
      };
    } else {
      const userId = await ctx.db.insert("users", {
        name: nameClean,
        email: emailNormalized,
        googleId: args.googleId,
        avatarUrl: args.avatarUrl,
        createdAt: Date.now(),
      });

      return {
        ok: true,
        userId,
        name: nameClean,
        email: emailNormalized,
        avatarUrl: args.avatarUrl,
      };
    }
  },
});

export const getUserOrders = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const emailNormalized = args.email.toLowerCase().trim();
    const all = await ctx.db.query("orders").collect();
    return all
      .filter(o => o.customer && o.customer.email && o.customer.email.toLowerCase().trim() === emailNormalized)
      .sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getAllOrders = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("orders").collect();
    return all.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderNumber: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_order_number", q => q.eq("orderNumber", args.orderNumber))
      .unique();
    if (!existing) {
      throw new Error("Order not found");
    }
    await ctx.db.patch(existing._id, { status: args.status });
    return { ok: true };
  },
});
