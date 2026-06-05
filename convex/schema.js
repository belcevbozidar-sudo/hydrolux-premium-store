import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  appState: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  carts: defineTable({
    cartId: v.string(),
    items: v.any(),
    updatedAt: v.number(),
  }).index("by_cart_id", ["cartId"]),

  orders: defineTable({
    orderNumber: v.string(),
    customer: v.any(),
    items: v.any(),
    totals: v.any(),
    delivery: v.optional(v.string()),
    city: v.optional(v.string()),
    postcode: v.optional(v.string()),
    address: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    invoiceDetails: v.optional(v.any()),
    notes: v.optional(v.string()),
    clientType: v.optional(v.string()),
    b2bDetails: v.optional(v.any()),
    status: v.string(),
    createdAt: v.number(),
  }).index("by_order_number", ["orderNumber"]),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    passwordHash: v.optional(v.string()),
    googleId: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
