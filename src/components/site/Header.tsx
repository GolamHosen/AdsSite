"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, Wind, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { GorgeousButton } from "@/components/ui/GorgeousButton";

export const SERVICES_DROPDOWN = [
  { slug: "google-pay-per-click-ads", label: "GOOGLE PAY PER CLICK ADS" },
  { slug: "google-search-ads", label: "GOOGLE SEARCH ADS" },
  { slug: "meta-ads", label: "META ADS" },
  { slug: "tiktok-ads", label: "TIKTOK ADS" },
  { slug: "youtube-ads", label: "YOUTUBE ADS" },
  { slug: "linkden-ads", label: "LINKDEN ADS" },
  { slug: "search-engine-optimization", label: "SEARCH ENGINE OPTIMIZATION" },
];

export function Header({ siteName = "Adsoxygen" }: { siteName?: string }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  return (
    <>
      {/* Scroll Progress Bar – neon lime accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left shadow-sm"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #006402, #AEFF1C, #006402)",
          boxShadow: "0 0 8px rgba(174, 255, 28, 0.4)",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-[#104042]/10 bg-[#E8F4F4]/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <motion.span
              className="grid h-10 w-10 place-items-center rounded-2xl bg-[#104042] text-[#AEFF1C] shadow-md border border-white/10"
              whileHover={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Wind className="h-5 w-5" />
            </motion.span>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#104042] font-display">
                {siteName}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#006402] -mt-1">
                Performance Ads
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex bg-white/70 p-1.5 rounded-full border border-[#104042]/10 shadow-sm">
            <Link
              href="/"
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#104042]/80 hover:text-[#104042] rounded-full transition"
            >
              Home
            </Link>

            {/* OUR SERVICES Dropdown with Hover Bridge */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className={`flex items-center gap-1 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition ${
                  servicesOpen
                    ? "bg-[#104042] text-[#AEFF1C] shadow-sm"
                    : "text-[#104042]/80 hover:text-[#104042] hover:bg-[#E8F4F4]"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>OUR SERVICES</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-[#AEFF1C]" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu matching adsoxygen.com screenshot */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 pt-2 z-50 w-72"
                  >
                    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-2xl">
                      {SERVICES_DROPDOWN.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/services/${item.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="block border-b border-slate-100 px-5 py-3 text-[12px] font-bold tracking-wider text-[#104042] transition-colors hover:bg-[#E8F4F4] hover:text-[#006402] last:border-b-0 uppercase"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/pricing"
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#104042]/80 hover:text-[#104042] rounded-full transition"
            >
              OUR PRICING
            </Link>

            <Link
              href="/about"
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#104042]/80 hover:text-[#104042] rounded-full transition"
            >
              About us
            </Link>

            <Link
              href="/#testimonials"
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#104042]/80 hover:text-[#104042] rounded-full transition"
            >
              Testimonials
            </Link>

            <Link
              href="/#contact"
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#104042]/80 hover:text-[#104042] rounded-full transition"
            >
              Contact us
            </Link>
          </nav>

          {/* Gorgeous CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <GorgeousButton
              href="/#contact"
              variant="primary"
              size="sm"
              confettiOnClick
            >
              Get Started
            </GorgeousButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#104042]/15 text-[#104042] md:hidden bg-white shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#104042]/10 bg-[#E8F4F4]/98 px-6 py-5 backdrop-blur-lg md:hidden shadow-xl"
            >
              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#104042] hover:bg-[#AEFF1C]/15 transition"
                >
                  Home
                </Link>

                {/* Mobile Services Accordion */}
                <div className="rounded-xl border border-[#104042]/10 bg-white/50 p-2">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between px-2 py-1.5 text-sm font-bold uppercase tracking-wider text-[#104042]"
                  >
                    <span>OUR SERVICES</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-1 pl-2 border-t border-[#104042]/10 pt-2"
                      >
                        {SERVICES_DROPDOWN.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/services/${item.slug}`}
                            onClick={() => {
                              setOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="block rounded-lg px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#104042]/80 hover:bg-[#AEFF1C]/20 hover:text-[#006402] transition"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/pricing"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#104042] hover:bg-[#AEFF1C]/15 transition"
                >
                  OUR PRICING
                </Link>

                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#104042] hover:bg-[#AEFF1C]/15 transition"
                >
                  About us
                </Link>

                <Link
                  href="/#testimonials"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#104042] hover:bg-[#AEFF1C]/15 transition"
                >
                  Testimonials
                </Link>

                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#104042] hover:bg-[#AEFF1C]/15 transition"
                >
                  Contact us
                </Link>

                <div className="mt-2" onClick={() => setOpen(false)}>
                  <GorgeousButton
                    href="/#contact"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    confettiOnClick
                  >
                    Get Started
                  </GorgeousButton>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
