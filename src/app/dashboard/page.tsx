import { db } from "@/db";
import { leads, newsletterSubscribers, services, testimonials } from "@/db/schema";
import { count, desc, eq, gte, sql } from "drizzle-orm";
import Link from "next/link";
import { Users, Mail, Briefcase, MessageSquareQuote, TrendingUp, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-sky-100 text-sky-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-violet-100 text-violet-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-rose-100 text-rose-700",
};

export default async function DashboardOverviewPage() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    [{ value: totalLeads }],
    [{ value: newLeadsThisWeek }],
    [{ value: totalSubscribers }],
    [{ value: totalServices }],
    [{ value: totalTestimonials }],
    recentLeads,
  ] = await Promise.all([
    db.select({ value: count() }).from(leads),
    db.select({ value: count() }).from(leads).where(gte(leads.createdAt, sevenDaysAgo)),
    db
      .select({ value: count() })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, "active")),
    db.select({ value: count() }).from(services),
    db.select({ value: count() }).from(testimonials),
    db.select().from(leads).orderBy(desc(leads.createdAt)).limit(6),
  ]);

  const cards = [
    { label: "Total Leads", value: totalLeads, icon: Users, href: "/dashboard/leads", tint: "bg-sky-500" },
    { label: "New This Week", value: newLeadsThisWeek, icon: TrendingUp, href: "/dashboard/leads", tint: "bg-emerald-500" },
    { label: "Newsletter Subscribers", value: totalSubscribers, icon: Mail, href: "/dashboard/newsletter", tint: "bg-amber-500" },
    { label: "Active Services", value: totalServices, icon: Briefcase, href: "/dashboard/services", tint: "bg-violet-500" },
    { label: "Testimonials", value: totalTestimonials, icon: MessageSquareQuote, href: "/dashboard/testimonials", tint: "bg-rose-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor leads, subscribers, and site performance at a glance.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${card.tint}`}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-2xl font-extrabold text-slate-900">{card.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {card.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Leads</h2>
          <Link
            href="/dashboard/leads"
            className="flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Service</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Received</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">{lead.name}</td>
                  <td className="py-3 pr-4 text-slate-600">{lead.email}</td>
                  <td className="py-3 pr-4 text-slate-600">{lead.serviceInterest || "—"}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        STATUS_STYLES[lead.status] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">
                    No leads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
