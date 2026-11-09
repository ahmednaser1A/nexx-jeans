import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

// ---------------- Products ----------------
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  price: real("price").notNull(),
  oldPrice: real("old_price"),
  image: text("image").notNull(),
  description: text("description").default(""),
  sizes: text("sizes").array().default([]),
  colors: text("colors").array().default([]),
  stock: integer("stock").default(10).notNull(),
  featured: boolean("featured").default(false).notNull(),
  rating: real("rating").default(4.5).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------------- Orders ----------------
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).default(""),
  notes: text("notes").default(""),
  total: real("total").notNull(),
  status: varchar("status", { length: 50 }).default("جديد").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------------- Order Items ----------------
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id"),
  productName: varchar("product_name", { length: 255 }).notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  size: varchar("size", { length: 50 }).default(""),
  color: varchar("color", { length: 100 }).default(""),
});

// ---------------- Admins ----------------
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------------- Settings (key/value) ----------------
export const settings = pgTable("settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
});
