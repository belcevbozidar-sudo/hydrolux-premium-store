import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  appState: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  // Append-only archive of products. Whenever a product is deleted from the
  // admin panel it is snapshotted here BEFORE it disappears from the live site.
  // There is intentionally NO delete mutation for this table anywhere in the
  // codebase, so neither the admin panel nor the site can ever wipe it — the
  // only way to remove rows is manually from the Convex dashboard by the owner.
  productArchive: defineTable({
    productId: v.string(),
    data: v.any(),            // full product object snapshot
    archivedAt: v.number(),
    reason: v.optional(v.string()),
    restoredAt: v.optional(v.number()), // set when the product is recovered
  }).index("by_product_id", ["productId"])
    .index("by_archived_at", ["archivedAt"]),

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

  visitors: defineTable({
    sessionId: v.string(),
    lastActive: v.number(),
  }).index("by_session_id", ["sessionId"])
    .index("by_last_active", ["lastActive"]),
});
