"use client";

import { Star, ArrowRight, BadgeCheck, TrendingUp, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { siteSettings } from "@/db/schema";
import { HeroVisuals } from "@/components/animations/HeroVisuals";
import { SpringCounter } from "@/components/animations/SpringCounter";
import { BrandMarquee } from "@/components/animations/BrandMarquee";
import { GorgeousButton } from "@/components/ui/GorgeousButton";

type Settings = typeof siteSettings.$inferSelect;

export function Hero({ settings }: { settings: Settings }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="top" className="relative overflow-hidden bg-[#E2F1F1] text-[#104042]">
      {/* Anime.js Background Visuals */}
      <HeroVisuals />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-24 md:pt-28 lg:pt-32 pb-16 md:grid-cols-12 md:items-center lg:pb-28">
        {/* Left Column: Headline and CTAs with Framer Motion Stagger */}
        <motion.div
          className="md:col-span-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#006402]/20 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#006402] backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006402] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006402]" />
              </span>
              <BadgeCheck className="h-3.5 w-3.5 text-[#006402]" />
              <span>{settings.tagline}</span>
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-extrabold leading-tight text-[#104042] sm:text-5xl lg:text-6xl font-display"
          >
            Power Your Growth With{" "}
            <span className="text-[#006402] relative inline-block underline decoration-[#AEFF1C] decoration-8 underline-offset-4">
              Smart Ads
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[#5E5E5E]"
          >
            {settings.heroSubtext}
          </motion.p>

          {/* Gorgeous CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
            <GorgeousButton
              href="#contact"
              variant="primary"
              size="lg"
              confettiOnClick
            >
              Get Free Audit
            </GorgeousButton>

            <GorgeousButton
              href="#services"
              variant="secondary"
              size="lg"
              icon={<Zap className="h-4 w-4 text-[#006402]" />}
            >
              Explore Services
            </GorgeousButton>
          </motion.div>

          {/* Social Proof Rating Card */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-[#104042]/10 bg-white/90 p-4 backdrop-blur-lg w-fit shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex -space-x-3">
              {[
                { label: "S", bg: "from-[#AEFF1C] to-[#006402]" },
                { label: "M", bg: "from-sky-400 to-indigo-500" },
                { label: "J", bg: "from-purple-400 to-pink-500" },
                { label: "A", bg: "from-amber-400 to-orange-500" },
              ].map((avatar, idx) => (
                <div
                  key={idx}
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-gradient-to-br ${avatar.bg} text-xs font-extrabold text-white shadow-md`}
                >
                  {avatar.label}
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-base font-extrabold text-[#104042]">
                  <SpringCounter value={settings.ratingValue} />
                </span>
              </div>
              <p className="text-xs text-[#5E5E5E] font-medium">{settings.ratingCount}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Interactive Performance Dashboard */}
        <motion.div
          className="md:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-[2.5rem] border border-white/10 bg-[#104042] p-7 shadow-none">
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#AEFF1C]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#AEFF1C]">
                  Live Client Performance
                </span>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/60">
                Real-time Sync
              </span>
            </div>

            {/* Performance Metric Cards with React Spring Counters */}
            <div className="mt-5 space-y-4">
              {/* Card 1: ROAS Growth - Solid Color */}
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#AEFF1C] flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" /> ROAS Growth
                  </span>
                  <span className="rounded-full bg-[#AEFF1C]/20 px-2 py-0.5 text-[10px] font-bold text-[#AEFF1C]">
                    Industry Leader
                  </span>
                </div>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white font-display">
                  <SpringCounter value="+248%" />
                </p>
                <p className="mt-1 text-xs text-white/40">Verified average across 400+ campaigns</p>
              </motion.div>

              {/* Card 2 & 3: Grid - Solid Color */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#AEFF1C]/80">
                    Leads / mo
                  </p>
                  <p className="mt-2 text-2xl font-extrabold text-white font-display">
                    <SpringCounter value="3.4k" />
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">High-intent buyers</p>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Years Exp.
                  </p>
                  <p className="mt-2 text-2xl font-extrabold text-white font-display">
                    <SpringCounter value={settings.yearsExperience} />
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">Dedicated specialists</p>
                </motion.div>
              </div>

              {/* Card 4: CPA Drop – Solid Emerald Card */}
              <motion.div
                className="rounded-2xl p-5 text-white border border-[#AEFF1C]/30 bg-[#006402]"
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#AEFF1C]">
                    Average CPA Drop
                  </span>
                  <Sparkles className="h-4 w-4 text-[#AEFF1C]" />
                </div>
                <p className="mt-1 text-3xl font-extrabold text-white font-display">
                  <SpringCounter value="-37%" />
                </p>
                <p className="mt-1 text-xs text-white/80 font-medium">
                  Optimized bidding with AI smart algorithms
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* GSAP Infinite Partner Marquee */}
      <BrandMarquee />
    </section>
  );
}
