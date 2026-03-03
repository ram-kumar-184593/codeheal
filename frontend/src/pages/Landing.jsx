import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  Clock,
  Code2,
  ArrowRight,
  Terminal,
  Bug,
  Lightbulb,
  Github,
  Twitter,
  Linkedin,
  Mail,
  BookOpen,
  FileText,
  MessageCircle,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// ===============================
// Floating particles component
// ===============================

// const Particles = () => {
//   const particles = Array.from({ length: 40 });

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
//           initial={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//             opacity: 0,
//           }}
//           animate={{
//             y: [null, -100],
//             opacity: [0, 1, 0],
//           }}
//           transition={{
//             duration: 8 + Math.random() * 10,
//             repeat: Infinity,
//             delay: Math.random() * 5,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

const Particles = () => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: `particle-${i}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ y: p.y - 100, opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// ===============================
// Mouse Glow effect
// ===============================

const MouseGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;

      ref.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,0.15), transparent 80%)`;
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 transition duration-300"
    />
  );
};

// ===============================
// Animation variants
// ===============================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay },
  }),
};

// ===============================
// Feature data (UNCHANGED)
// ===============================

const features = [
  {
    icon: Bug,
    title: "Instant Bug Detection",
    description:
      "Paste any code or error — CodeHeal identifies the root cause in seconds.",
  },
  {
    icon: Lightbulb,
    title: "Clear Explanations",
    description:
      "Understand what went wrong and why, with plain-language breakdowns.",
  },
  {
    icon: Code2,
    title: "Corrected Code",
    description:
      "Get working, copy-ready fixes with exact lines highlighted so you see every change.",
  },
  {
    icon: Clock,
    title: "Any Language, Any Error",
    description:
      "Python, JavaScript, Rust, Go — CodeHeal speaks every language.",
  },
  {
    icon: Shield,
    title: "Analysis History",
    description:
      "Every analysis is saved so you can revisit past debugging sessions.",
  },
  {
    icon: Terminal,
    title: "Stack Trace Parsing",
    description:
      "Paste messy stack traces and get a clean, actionable diagnosis.",
  },
];

// ===============================
// Footer links (UNCHANGED)
// ===============================

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#changelog" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "#api" },
    { label: "Community", href: "#community" },
    { label: "Blog", href: "#blog" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Contact", href: "mailto:hello@codeheal.ai" },
  ],
};

const socialLinks = [
  { id: "github", icon: Github, href: "#" },
  { id: "twitter", icon: Twitter, href: "#" },
  { id: "linkedin", icon: Linkedin, href: "#" },
];

// ===============================
// Landing Component
// ===============================
export default function Landing() {
  const words = ["guessing.", "waiting.", "Googling.", "suffering."];

  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Word animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setFade(true);
      }, 300);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]" />

      <MouseGlow />
      <Particles />

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`
    fixed top-0 left-0 right-0 z-50
    px-6 py-4
    transition-all duration-300
    ${
      scrolled
        ? "bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg"
        : "bg-white/5 backdrop-blur-xl border-b border-white/10"
    }
  `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Code
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Heal
              </span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>

            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              asChild
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <Link to="/login">Log in</Link>
            </Button>

            <Button
              asChild
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90"
            >
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}

      <section className="max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
        <motion.h1
          initial="hidden"
          animate="show"
          custom={0.1}
          variants={fadeUp}
          className="text-6xl font-bold mb-6"
        >
          Stop{" "}
          <span
            className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            style={{ opacity: fade ? 1 : 0 }}
          >
            {words[wordIndex]}
          </span>
          <br />
          Start fixing.
        </motion.h1>

        {/* CODE MOCKUP RESTORED */}

        <motion.div
          initial="hidden"
          animate="show"
          custom={0.3}
          variants={scaleIn}
          className="mt-16 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-left font-mono"
        >
          <p className="text-red-400">
            TypeError: Cannot read properties of undefined (reading 'map')
          </p>

          <p className="text-white/60">at UserList (UserList.jsx:12:18)</p>

          <p className="text-white/60">
            at renderWithHooks (react-dom.development.js:14985:18)
          </p>

          <p className="text-green-400 mt-4">
            ✓ Issue detected — fix ready with 3 lines highlighted
          </p>
        </motion.div>
      </section>

      {/* FEATURES SECTION RESTORED */}

      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <motion.h2
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          className="text-4xl font-bold text-center mb-16"
        >
          Everything you need to debug faster
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              custom={i * 0.1}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <f.icon className="mb-3 text-indigo-400" />
              <h3>{f.title}</h3>
              <p className="text-white/60">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-6 py-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Fix bugs in{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              3 steps
            </span>
          </h2>

          <p className="text-white/60">It really is that simple.</p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {[
            {
              step: "01",
              title: "Paste your code or error",
              desc: "Drop in any snippet, error message, or full stack trace — CodeHeal handles it all.",
            },
            {
              step: "02",
              title: "AI analyses it instantly",
              desc: "Our model identifies the root cause, explains what went wrong and why.",
            },
            {
              step: "03",
              title: "Get the corrected code",
              desc: "Receive the fixed code with every changed line highlighted so you know exactly what changed.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div
                className="
          flex gap-6 items-start
          rounded-2xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
          hover:border-indigo-500/40
          transition
        "
              >
                <span
                  className="
            text-3xl font-extrabold
            text-indigo-400/40
            font-mono
            w-12 shrink-0
          "
                >
                  {item.step}
                </span>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="
      rounded-2xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-12
      shadow-xl
    "
          >
            <h2
              className="
        text-3xl sm:text-4xl
        font-bold
        text-white
        tracking-tight
        mb-4
      "
            >
              Ready to debug{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                smarter
              </span>
              ?
            </h2>

            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Join developers who save hours every week with AI-powered
              debugging.
            </p>

            <Button
              size="lg"
              className="
          text-base px-10
          bg-gradient-to-r
          from-indigo-500
          to-purple-500
          hover:opacity-90
          shadow-lg
        "
              asChild
            >
              <Link to="/app">
                Get Started — It's Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          {/* Top row: brand + links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="
            h-8 w-8 rounded-lg
            bg-gradient-to-tr from-indigo-500 to-purple-500
            flex items-center justify-center
            shadow-lg
          "
                >
                  <Zap className="h-4 w-4 text-white" />
                </div>

                <span className="text-lg font-bold text-white tracking-tight">
                  Code
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Heal
                  </span>
                </span>
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-5">
                AI-powered debugging assistant that helps developers find,
                understand, and fix bugs in seconds.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ id, icon: Icon, href }) => (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={id}
                    className="
                h-9 w-9 rounded-lg
                border border-white/10
                bg-white/5
                flex items-center justify-center
                text-white/60
                hover:text-indigo-400
                hover:border-indigo-400/40
                transition-all duration-300
              "
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4
                  className="
            text-xs font-semibold uppercase tracking-widest
            text-white/40 mb-4
          "
                >
                  {section}
                </h4>

                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      {href.startsWith("/") ? (
                        <Link
                          to={href}
                          className="
                      text-sm text-white/60
                      hover:text-white
                      transition-colors
                      inline-flex items-center gap-1.5
                      group
                    "
                        >
                          <span className="group-hover:underline underline-offset-4">
                            {label}
                          </span>
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="
                      text-sm text-white/60
                      hover:text-white
                      transition-colors
                      inline-flex items-center gap-1.5
                      group
                    "
                        >
                          <span className="group-hover:underline underline-offset-4">
                            {label}
                          </span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            className="
      border-t border-white/10
      pt-6
      flex flex-col sm:flex-row
      items-center justify-between
      gap-3
      text-xs text-white/40
    "
          >
            <span>© 2026 CodeHeal. All rights reserved.</span>

            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy
              </a>

              <a href="#terms" className="hover:text-white transition-colors">
                Terms
              </a>

              <div className="flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-indigo-400" />

                <span>Powered by Lovable AI</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
