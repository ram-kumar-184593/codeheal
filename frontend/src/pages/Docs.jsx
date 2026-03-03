/**
 * CodeHeal Docs Page – Production Ready
 * Matches landing page + dashboard UI
 */

import { Link } from "react-router-dom";
import {
  Zap,
  ArrowLeft,
  BookOpen,
  Code2,
  Bug,
  Shield,
  Globe,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* ─────────────────────────────────────────────
   SECTIONS DATA (REQUIRED)
───────────────────────────────────────────── */

const sections = [
  {
    id: "getting-started",
    icon: BookOpen,
    title: "Getting Started",
    content: (
      <div className="space-y-4 text-sm text-white/80 leading-relaxed">
        <p>
          CodeHeal is an AI-powered debugging assistant that analyzes broken
          code, error messages, and stack traces.
        </p>

        <ol className="list-decimal list-inside space-y-2 ml-1">
          <li>
            Go to{" "}
            <Link to="/app" className="text-indigo-400 hover:underline">
              /app
            </Link>
          </li>

          <li>Paste your code or error</li>

          <li>Click Analyze</li>

          <li>Copy corrected code</li>
        </ol>
      </div>
    ),
  },

  {
    id: "analysis",
    icon: Bug,
    title: "How Analysis Works",
    content: (
      <p className="text-sm text-white/80">
        CodeHeal uses advanced AI models to detect bugs, explain issues, and
        generate corrected code instantly.
      </p>
    ),
  },

  {
    id: "diff-view",
    icon: Code2,
    title: "Diff View",
    content: (
      <p className="text-sm text-white/80">
        Modified lines are highlighted so you can easily identify fixes.
      </p>
    ),
  },

  {
    id: "auth",
    icon: Shield,
    title: "Authentication",
    content: (
      <p className="text-sm text-white/80">
        Secure login using email and password authentication.
      </p>
    ),
  },

  {
    id: "languages",
    icon: Globe,
    title: "Supported Languages",
    content: (
      <div className="flex flex-wrap gap-2">
        {[
          "JavaScript",
          "TypeScript",
          "Python",
          "Rust",
          "Go",
          "Java",
          "C++",
          "PHP",
          "SQL",
        ].map((lang) => (
          <span
            key={lang}
            className="text-xs bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded"
          >
            {lang}
          </span>
        ))}
      </div>
    ),
  },

  {
    id: "faq",
    icon: HelpCircle,
    title: "FAQ",
    content: (
      <div className="space-y-3">
        <div>
          <p className="font-semibold flex items-center gap-2">
            <ChevronRight size={14} /> Is my code secure?
          </p>

          <p className="text-white/70 text-sm">
            Yes. Code is processed securely and never stored permanently.
          </p>
        </div>

        <div>
          <p className="font-semibold flex items-center gap-2">
            <ChevronRight size={14} /> Do I need an account?
          </p>

          <p className="text-white/70 text-sm">
            No. You can analyze code without logging in.
          </p>
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────
   DOCS COMPONENT
───────────────────────────────────────────── */

export default function Docs() {
  return (
    <div
      className="
      min-h-screen
      text-white
      bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]
    "
    >
      {/* NAVBAR */}

      <nav
        className="
        sticky top-0 z-50
        border-b border-white/10
        bg-white/5 backdrop-blur-xl
        px-6 py-4
      "
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-2">
            <div
              className="
              h-8 w-8 rounded-lg
              bg-gradient-to-tr from-indigo-500 to-purple-500
              flex items-center justify-center
            "
            >
              <Zap size={16} />
            </div>

            <span className="font-bold text-lg">CodeHeal</span>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-white/70 hover:text-white"
          >
            <Link to="/">
              <ArrowLeft size={16} />
              Back
            </Link>
          </Button>
        </div>
      </nav>

      {/* CONTENT */}

      <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">
        {/* SIDEBAR */}

        <aside className="hidden lg:block w-56">
          <div
            className="
            sticky top-24
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-xl p-4
          "
          >
            <p className="text-xs text-white/40 mb-3">ON THIS PAGE</p>

            {sections.map(({ id, icon: Icon, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="
                  flex items-center gap-2
                  text-sm text-white/60
                  hover:text-white
                  px-2 py-1 rounded
                "
              >
                <Icon size={14} />

                {title}
              </a>
            ))}
          </div>
        </aside>

        {/* MAIN */}

        <main className="flex-1 space-y-10">
          {/* Header */}

          <div>
            <h1 className="text-3xl font-bold mb-2">Documentation</h1>

            <p className="text-white/60">
              Learn how to use CodeHeal effectively.
            </p>
          </div>

          {/* Sections */}

          {sections.map(({ id, icon: Icon, title, content }) => (
            <section key={id} id={id}>
              <div
                className="
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-xl p-6
              "
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={18} className="text-indigo-400" />

                  <h2 className="font-semibold">{title}</h2>
                </div>

                {content}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
