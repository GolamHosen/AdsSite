import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------
export const adminRoleEnum = pgEnum("admin_role", ["owner", "admin", "editor"]);
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
]);
export const subscriberStatusEnum = pgEnum("subscriber_status", [
  "active",
  "unsubscribed",
]);
export const auditActionEnum = pgEnum("audit_action", [
  "login_success",
  "login_failed",
  "logout",
  "password_changed",
  "create",
  "update",
  "delete",
]);

// ---------------------------------------------------------------------------
// Admin / Auth
// ---------------------------------------------------------------------------
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: adminRoleEnum("role").notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  failedLoginCount: integer("failed_login_count").notNull().default(0),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  lastLoginIp: varchar("last_login_ip", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id")
    .notNull()
    .references(() => admins.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 128 }).notNull().unique(),
  userAgent: text("user_agent"),
  ip: varchar("ip", { length: 64 }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => admins.id, { onDelete: "set null" }),
  action: auditActionEnum("action").notNull(),
  entity: varchar("entity", { length: 80 }),
  entityId: varchar("entity_id", { length: 40 }),
  ip: varchar("ip", { length: 64 }),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const rateLimits = pgTable("rate_limits", {
  id: serial("id").primaryKey(),
  bucketKey: varchar("bucket_key", { length: 160 }).notNull(),
  count: integer("count").notNull().default(1),
  windowStart: timestamp("window_start", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Public site content
// ---------------------------------------------------------------------------
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteName: varchar("site_name", { length: 120 }).notNull().default("AdsMonster"),
  tagline: varchar("tagline", { length: 240 }).notNull().default(
    "Power your growth with smart ads",
  ),
  heroHeading: varchar("hero_heading", { length: 240 }).notNull().default(
    "Hi there, Welcome to AdsMonster.",
  ),
  heroSubtext: text("hero_subtext").notNull().default(
    "AdsMonster is a results-driven digital advertising agency specializing in Google, Meta, YouTube, TikTok Ads and LinkedIn Ads to help brands scale faster and smarter.",
  ),
  ratingValue: varchar("rating_value", { length: 10 }).notNull().default("4.8"),
  ratingCount: varchar("rating_count", { length: 40 }).notNull().default("24k rating"),
  yearsExperience: varchar("years_experience", { length: 10 }).notNull().default("8+"),
  aboutTitle: varchar("about_title", { length: 160 }).notNull().default("About Us"),
  aboutText: text("about_text").notNull().default(
    "AdsMonster is your growth partner, focused on smart ads that drive real results, attract the right audience, and help your business grow faster.",
  ),
  whyChooseTitle: varchar("why_choose_title", { length: 160 }).notNull().default(
    "WHY CHOOSE US",
  ),
  whyChooseText: text("why_choose_text").notNull().default(
    "We partner with brands to deliver consistent, scalable growth through smart strategy, data-driven execution, and a results-first mindset. Here's what sets us apart and earns our clients' trust.",
  ),
  ctaTitle: varchar("cta_title", { length: 200 }).notNull().default(
    "Ready to Grow Your Business Online?",
  ),
  ctaSubtext: text("cta_subtext").notNull().default(
    "Let's work together to create marketing that actually works.",
  ),
  newsletterTitle: varchar("newsletter_title", { length: 200 }).notNull().default(
    "Signup Our Newsletter to Get Update Information.",
  ),
  contactEmail: varchar("contact_email", { length: 160 }).notNull().default(
    "hello@adsmonster.com",
  ),
  contactPhone: varchar("contact_phone", { length: 40 }).notNull().default(
    "+1 (555) 010-2030",
  ),
  contactAddress: varchar("contact_address", { length: 240 }).notNull().default(
    "123 Growth Avenue, Suite 400, New York, NY",
  ),
  facebookUrl: varchar("facebook_url", { length: 200 }).notNull().default("#"),
  instagramUrl: varchar("instagram_url", { length: 200 }).notNull().default("#"),
  linkedinUrl: varchar("linkedin_url", { length: 200 }).notNull().default("#"),
  twitterUrl: varchar("twitter_url", { length: 200 }).notNull().default("#"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 60 }).notNull().default("Megaphone"),
  order: integer("order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 120 }).notNull(),
  value: varchar("value", { length: 40 }).notNull(),
  description: varchar("description", { length: 240 }).notNull().default(""),
  icon: varchar("icon", { length: 60 }).notNull().default("TrendingUp"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const howItWorksSteps = pgTable("how_it_works_steps", {
  id: serial("id").primaryKey(),
  stepNumber: integer("step_number").notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  role: varchar("role", { length: 160 }).notNull().default(""),
  company: varchar("company", { length: 160 }).notNull().default(""),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  avatarSeed: varchar("avatar_seed", { length: 60 }).notNull().default("A"),
  published: boolean("published").notNull().default(true),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Leads / Contact + Newsletter
// ---------------------------------------------------------------------------
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  company: varchar("company", { length: 160 }).notNull().default(""),
  serviceInterest: varchar("service_interest", { length: 160 }).notNull().default(""),
  budget: varchar("budget", { length: 80 }).notNull().default(""),
  message: text("message").notNull().default(""),
  status: leadStatusEnum("status").notNull().default("new"),
  source: varchar("source", { length: 80 }).notNull().default("website"),
  ip: varchar("ip", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  status: subscriberStatusEnum("status").notNull().default("active"),
  ip: varchar("ip", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
