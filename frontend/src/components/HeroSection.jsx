import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Cpu, Layers } from 'lucide-react';

export default function HeroSection({ onAnalyzeClick }) {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/40 pt-14 pb-20 sm:pt-20 sm:pb-24"
    >
      {/* Subtle Ambient Background Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl" />
      <div className="pointer-events-none absolute top-28 right-10 -z-10 h-72 w-72 rounded-full bg-violet-400/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              Powered by Google Gemini Structured Extraction
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.12]">
              Turn Your Startup Idea{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Into Reality
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed mx-auto lg:mx-0">
              Transform raw venture concepts into structured investor-ready blueprints. Our AI engine
              deconstructs your pitch into core problem statements, solution architecture, target
              segments, and revenue models in seconds.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onAnalyzeClick}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-violet-700 hover:shadow-indigo-500/40"
              >
                Analyze Your Idea
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#flashcards-section"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Explore Framework
              </a>
            </div>

            {/* Trust / Feature Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-indigo-600" /> Zero-Hallucination Extraction
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-violet-600" /> 7-Dimension Breakdown
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Pydantic Schema Validated
              </span>
            </div>
          </div>

          {/* Right Visual SaaS Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600">
                  Live Extraction Preview
                </span>
              </div>

              <div className="mt-5 space-y-3.5">
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Startup Concept
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">FarmConnect AI</p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Direct-to-consumer agricultural supply chain powered by demand forecasting.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                    <p className="text-[11px] font-semibold text-indigo-600">Industry</p>
                    <p className="mt-1 text-xs font-semibold text-slate-800">AgriTech & AI</p>
                  </div>
                  <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-3">
                    <p className="text-[11px] font-semibold text-violet-600">Revenue Model</p>
                    <p className="mt-1 text-xs font-semibold text-slate-800">Commission SaaS</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Agriculture', 'AI', 'Marketplace', 'Supply Chain'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}