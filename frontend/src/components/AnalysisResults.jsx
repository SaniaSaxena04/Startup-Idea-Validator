import React from 'react';
import {
  Rocket,
  AlertCircle,
  Lightbulb,
  Users,
  Building2,
  BadgeDollarSign,
  Tags,
  Sparkles,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function AnalysisResults({ result, isLoading, error, successMessage }) {
  return (
    <div id="results-section" className="space-y-6">
      {/* Success Notification */}
      {successMessage && !isLoading && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-3.5 text-sm font-medium text-emerald-800 shadow-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {error && !isLoading && (
        <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/95 px-4 py-4 text-sm text-rose-800 shadow-sm">
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
          <div>
            <p className="font-semibold">Analysis Failed</p>
            <p className="mt-0.5 text-rose-700">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white p-12 text-center shadow-lg shadow-indigo-500/5">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-25" />
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md">
              <Sparkles className="h-7 w-7 animate-pulse" />
            </div>
          </div>
          <h4 className="mt-5 text-lg font-bold text-slate-900">
            Extracting Startup Blueprint...
          </h4>
          <p className="mt-1.5 max-w-md text-sm text-slate-500">
            Gemini AI is analyzing your pitch to identify the problem, solution, target market,
            and monetization strategy.
          </p>
        </div>
      )}

      {/* Empty State Before Analysis */}
      {!isLoading && !result && !error && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Rocket className="h-7 w-7" />
          </div>
          <h4 className="mt-4 text-lg font-bold text-slate-800">No Idea Analyzed Yet</h4>
          <p className="mt-1.5 max-w-md text-sm text-slate-500">
            Fill out the startup submission form and click{' '}
            <span className="font-semibold text-indigo-600">Analyze My Idea</span> to generate
            structured AI insights here.
          </p>
        </div>
      )}

      {/* Structured AI Result Cards */}
      {!isLoading && result && (
        <div className="space-y-5">
          {/* Primary Banner Card: Startup Name & Industry */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-7 text-white shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                  <Rocket className="h-6 w-6 text-indigo-300" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                    Validated Startup Profile
                  </span>
                  <h3 className="mt-0.5 text-2xl font-extrabold tracking-tight">
                    {result.startup_name}
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3.5 py-1.5 text-xs font-semibold text-indigo-200">
                <Building2 className="h-3.5 w-3.5" />
                {result.industry}
              </span>
            </div>
          </div>

          {/* Core Breakdown Grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Problem Statement */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Problem Statement
                </h4>
              </div>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-800">
                {result.problem}
              </p>
            </div>

            {/* Proposed Solution */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Proposed Solution
                </h4>
              </div>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-800">
                {result.solution}
              </p>
            </div>

            {/* Target Audience */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Target Audience
                </h4>
              </div>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-800">
                {result.target_audience}
              </p>
            </div>

            {/* Business Model */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <BadgeDollarSign className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Business Model
                </h4>
              </div>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-800">
                {result.business_model}
              </p>
            </div>
          </div>

          {/* Keywords Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Tags className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Extracted Keywords & Domain Tags
              </h4>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {result.keywords && result.keywords.length > 0 ? (
                result.keywords.map((keyword, idx) => (
                  <span
                    key={`${keyword}-${idx}`}
                    className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-700"
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">Not specified</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}