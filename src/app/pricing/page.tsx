import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site-data";
import { Header } from "@/components/site/Header";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/animations/CursorGlow";
import { HeroVisuals } from "@/components/animations/HeroVisuals";
import { Check, Sparkles, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { GorgeousButton } from "@/components/ui/GorgeousButton";

export const metadata: Metadata = {
  title: "Our Pricing – Transparent Performance Packages – AdsMonster",
  description:
    "Explore transparent pricing plans for Google, Meta, TikTok, YouTube, and LinkedIn Ads. No long-term lock-in, results-driven scaling.",
};

const PRICING_TIERS = [
  {
    name: "Growth Starter",
    badge: "Emerging Brands",
    price: "$1,490",
    period: "/month",
    description: "Ideal for brands launching on 1–2 channels looking for profitable early customer acquisition.",
    highlight: false,
    features: [
      "Up to $10k monthly ad spend management",
      "1 Ad Network (Google or Meta)",
      "Weekly bid & keyword optimizations",
      "Bi-weekly creative iteration (4 variations)",
      "Conversion tracking & pixel setup",
      "Standard email & Slack support",
      "Monthly performance review",
    ],
  },
  {
    name: "Scale Accelerator",
    badge: "Most Popular",
    price: "$2,950",
    period: "/month",
    description: "Engineered for scaling businesses needing multi-channel omni-presence and aggressive ROAS growth.",
    highlight: true,
    features: [
      "Up to $40k monthly ad spend management",
      "Up to 3 Ad Networks (Google, Meta, TikTok, etc.)",
      "Advantage+ & Performance Max architecture",
      "Weekly fresh creative production (8 variations)",
      "Server-side Conversions API (CAPI) tracking",
      "Dedicated Senior Ad Strategist",
      "Real-time 24/7 custom dashboard",
      "Weekly strategy sync calls",
    ],
  },
  {
    name: "Enterprise Omnichannel",
    badge: "High Volume",
    price: "$4,900",
    period: "/month",
    description: "Full-funnel agency partnership for high-growth enterprises seeking category dominance.",
    highlight: false,
    features: [
      "$50k+ monthly ad spend management",
      "All Ad Networks (Google, Meta, TikTok, YT, LinkedIn)",
      "Custom landing page CRO & A/B testing",
      "Unlimited creative refresh sprint cycles",
      "Offline CRM conversion & lead value attribution",
      "Lead Strategist + Creative Director team",
      "Custom Slack channel with 1-hr response time",
      "Strict performance SLA guarantees",
    ],
  },
];

export default async function PricingPage() {
  const settings = (await getSiteSettings()) ?? {
    id: 0,
    siteName: "AdsMonster",
    tagline: "Power your growth with smart ads",
    heroHeading: "Hi there, Welcome to AdsMonster.",
    heroSubtext:
      "AdsMonster is a results-driven digital advertising agency specializing in Google, Meta, YouTube, TikTok Ads and LinkedIn Ads to help brands scale faster and smarter.",
    ratingValue: "4.8",
    ratingCount: "24k rating",
    yearsExperience: "8+",
    aboutTitle: "About Us",
    aboutText:
      "AdsMonster is your growth partner, focused on smart ads that drive real results, attract the right audience, and help your business grow faster.",
    whyChooseTitle: "WHY CHOOSE US",
    whyChooseText:
      "We partner with brands to deliver consistent, scalable growth through smart strategy, data-driven execution, and a results-first mindset.",
    ctaTitle: "Ready to Grow Your Business Online?",
    ctaSubtext: "Let's work together to create marketing that actually works.",
    newsletterTitle: "Signup Our Newsletter to Get Update Information.",
    contactEmail: "hello@adsmonster.com",
    contactPhone: "+1 (555) 010-2030",
    contactAddress: "123 Growth Avenue, Suite 400, New York, NY",
    facebookUrl: "#",
    instagramUrl: "#",
    linkedinUrl: "#",
    twitterUrl: "#",
    updatedAt: new Date(),
  };

  return (
    <main className="min-h-screen bg-[#E2F1F1] text-[#5E5E5E]">
      <CursorGlow />
      <Header siteName={settings.siteName} />

      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#E2F1F1] text-[#104042] pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 text-center">
        <HeroVisuals />

        <div className="relative mx-auto max-w-4xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#006402]/20 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#006402] backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#006402]" /> Transparent Pricing
          </span>
          <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl lg:text-6xl font-display leading-tight text-[#104042]">
            Predictable Investment.{" "}
            <span className="text-[#006402] relative inline-block underline decoration-[#AEFF1C] decoration-8 underline-offset-4">
              Measurable Returns.
            </span>
          </h1>
          <p className="mt-4 text-lg text-[#104042]/75 max-w-2xl mx-auto">
            No hidden fees or long-term lock-ins. Pick the tier that matches your current stage and scale up as revenue flows.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col justify-between rounded-3xl p-8 sm:p-10 transition-all ${
                tier.highlight
                  ? "bg-[#104042] text-white shadow-2xl border-2 border-[#AEFF1C]/50 scale-[1.03]"
                  : "bg-white text-[#5E5E5E] border border-[#104042]/10 shadow-sm hover:shadow-lg"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 right-8 rounded-full bg-[#AEFF1C] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#104042] shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                {!tier.highlight && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#006402] bg-[#AEFF1C]/15 px-3 py-1 rounded-full border border-[#AEFF1C]/30">
                    {tier.badge}
                  </span>
                )}
                <h2
                  className={`mt-4 text-2xl font-extrabold font-display ${
                    tier.highlight ? "text-white" : "text-[#104042]"
                  }`}
                >
                  {tier.name}
                </h2>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    tier.highlight ? "text-white/70" : "text-[#5E5E5E]"
                  }`}
                >
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-extrabold font-display ${
                      tier.highlight ? "text-[#AEFF1C]" : "text-[#104042]"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      tier.highlight ? "text-white/60" : "text-[#5E5E5E]"
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3.5 text-sm">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`h-4 w-4 shrink-0 mt-0.5 ${
                          tier.highlight ? "text-[#AEFF1C]" : "text-[#006402]"
                        }`}
                      />
                      <span className={tier.highlight ? "text-white/90" : "text-[#104042]"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <GorgeousButton
                  href="#contact"
                  variant={tier.highlight ? "primary" : "secondary"}
                  size="md"
                  className="w-full justify-center"
                  confettiOnClick
                >
                  Select Plan
                </GorgeousButton>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Box */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3 text-center">
          <div className="rounded-2xl border border-[#104042]/10 bg-white p-6 shadow-sm">
            <Zap className="mx-auto h-7 w-7 text-[#006402]" />
            <h3 className="mt-3 text-base font-bold text-[#104042]">Month-to-Month Flexibility</h3>
            <p className="mt-1 text-xs text-[#5E5E5E]">No long-term locks. Stay because we produce results.</p>
          </div>
          <div className="rounded-2xl border border-[#104042]/10 bg-white p-6 shadow-sm">
            <ShieldCheck className="mx-auto h-7 w-7 text-[#006402]" />
            <h3 className="mt-3 text-base font-bold text-[#104042]">100% Account Ownership</h3>
            <p className="mt-1 text-xs text-[#5E5E5E]">All ad accounts and creative assets belong to you forever.</p>
          </div>
          <div className="rounded-2xl border border-[#104042]/10 bg-white p-6 shadow-sm">
            <Sparkles className="mx-auto h-7 w-7 text-[#006402]" />
            <h3 className="mt-3 text-base font-bold text-[#104042]">Transparent Live Reporting</h3>
            <p className="mt-1 text-xs text-[#5E5E5E]">Direct access to raw platform numbers 24 hours a day.</p>
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
