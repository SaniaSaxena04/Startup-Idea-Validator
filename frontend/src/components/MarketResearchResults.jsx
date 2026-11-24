import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  TrendingUp,
  Swords,
  Layers,
  Users,
  Compass,
  AlertTriangle,
  Info,
  Search,
  Sparkles,
} from 'lucide-react';

const CATEGORY_CONFIG = [
  {
    key: 'competitors',
    label: 'Competitors',
    icon: Swords,
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    key: 'similar_products',
    label: 'Similar Products',
    icon: Layers,
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    key: 'market_trends',
    label: 'Market Trends',
    icon: TrendingUp,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    key: 'customer_demand',
    label: 'Customer Demand',
    icon: Users,
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    key: 'market_gaps',
    label: 'Market Gaps',
    icon: Compass,
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
];

function normalizeResearchPayload(data) {
  if (!data) return null;
  if (data.research) return data;
  if (data.market_research?.research) return data.market_research;
  if (data.tavily_research?.research) return data.tavily_research;
  return null;
}

export default function MarketResearchResults({
  researchData,
  isResearchLoading,
  researchError,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (isResearchLoading) {
    return (
      <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Gathering Live Market Intelligence...
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Scanning competitors, similar products, market trends, customer demand, and market
              gaps via Tavily Web Research.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((skeleton) => (
            <div
              key={skeleton}
              className="animate-pulse rounded-xl border border-slate-100 bg-slate-50/80 p-4"
            >
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-full rounded bg-slate-200" />
              <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
              <div className="mt-4 h-3 w-1/3 rounded bg-indigo-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const normalized = normalizeResearchPayload(researchData);
  const effectiveError = researchError || researchData?.research_error || null;

  if (!normalized && !effectiveError) return null;

  if (!normalized && effectiveError) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h4 className="text-sm font-bold text-amber-900">
              Live Market Research Unavailable
            </h4>
            <p className="mt-1 text-sm text-amber-800">{effectiveError}</p>
          </div>
        </div>
      </div>
    );
  }

  const researchByCategory = normalized?.research || {};
  const sources = Array.isArray(normalized?.sources) ? normalized.sources : [];
  const errors = Array.isArray(normalized?.errors) ? normalized.errors : [];
  const note = normalized?.note;
  const searchedAt = normalized?.searched_at;
  const queryGenMethod = normalized?.query_generation_method;

  const totalResultsCount = CATEGORY_CONFIG.reduce((sum, cat) => {
    const items = researchByCategory[cat.key];
    return sum + (Array.isArray(items) ? items.length : 0);
  }, 0);

  const visibleCategories =
    selectedCategory === 'all'
      ? CATEGORY_CONFIG
      : CATEGORY_CONFIG.filter((cat) => cat.key === selectedCategory);

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
              Live Web Intelligence
            </span>
            <h4 className="text-lg font-bold text-slate-900">
              Market Research & Competitor Insights
            </h4>
            {(queryGenMethod || searchedAt) && (
              <p className="mt-0.5 text-[11px] text-slate-400">
                {queryGenMethod ? `Queries via ${queryGenMethod}` : ''}
                {queryGenMethod && searchedAt ? ' • ' : ''}
                {searchedAt ? new Date(searchedAt).toLocaleString() : ''}
              </p>
            )}
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <Search className="h-3.5 w-3.5 text-slate-500" />
          {totalResultsCount} {totalResultsCount === 1 ? 'Finding' : 'Findings'}
        </span>
      </div>

      {/* Top-Level Research Error Banner */}
      {effectiveError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-800">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-900">Market Research Notice</p>
              <p className="mt-0.5">{effectiveError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Partial Non-Fatal Warnings from Tavily Agent */}
      {errors.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-800">
          <div className="flex items-center gap-2 font-semibold text-amber-900">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>Some research queries encountered partial issues:</span>
          </div>
          <ul className="mt-1.5 list-disc space-y-1 pl-6">
            {errors.map((errItem, idx) => (
              <li key={idx}>
                {typeof errItem === 'string'
                  ? errItem
                  : errItem?.message || errItem?.error || JSON.stringify(errItem)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Empty State when Tavily returns 0 results */}
      {totalResultsCount === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No live market research results were returned for this idea.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try refining your startup description or keywords for broader web coverage.
          </p>
        </div>
      ) : (
        <>
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === 'all'
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Categories ({totalResultsCount})
            </button>

            {CATEGORY_CONFIG.map((cat) => {
              const items = Array.isArray(researchByCategory[cat.key])
                ? researchByCategory[cat.key]
                : [];
              const IconComponent = cat.icon;
              const isActive = selectedCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <IconComponent className="h-3.5 w-3.5" />
                  {cat.label} ({items.length})
                </button>
              );
            })}
          </div>

          {/* Categorized Research Cards */}
          <div className="space-y-6">
            {visibleCategories.map((cat) => {
              const items = Array.isArray(researchByCategory[cat.key])
                ? researchByCategory[cat.key]
                : [];

              if (items.length === 0) return null;
              const IconComponent = cat.icon;

              return (
                <div key={cat.key} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold ${cat.badgeClass}`}
                    >
                      <IconComponent className="h-3.5 w-3.5" />
                      {cat.label}
                    </span>
                  </div>

                  <div className="grid gap-3.5 md:grid-cols-2">
                    {items.map((item, idx) => {
                      const title = item.title || 'Untitled Source';
                      const snippet =
                        item.content || item.snippet || item.summary || 'No summary available.';
                      const url = item.url || item.source_url || '';
                      const rawScore =
                        typeof item.relevance_score === 'number'
                          ? item.relevance_score
                          : typeof item.score === 'number'
                            ? item.score
                            : null;

                      return (
                        <div
                          key={`${cat.key}-${url || idx}`}
                          className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition hover:border-indigo-200 hover:bg-white hover:shadow-sm"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              {url ? (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-bold leading-snug text-slate-900 transition hover:text-indigo-600"
                                >
                                  {title}
                                </a>
                              ) : (
                                <h5 className="text-sm font-bold leading-snug text-slate-900">
                                  {title}
                                </h5>
                              )}

                              {rawScore !== null && (
                                <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                                  {Math.round(rawScore * 100)}% match
                                </span>
                              )}
                            </div>

                            <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-slate-600">
                              {snippet}
                            </p>
                          </div>

                          {url && (
                            <div className="mt-3.5 border-t border-slate-200/60 pt-2.5">
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex max-w-full items-center gap-1.5 text-xs font-semibold text-indigo-600 transition hover:text-indigo-800"
                              >
                                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">{url}</span>
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Deduplicated Consolidated Sources */}
      {sources.length > 0 && (
        <div className="border-t border-slate-100 pt-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Consolidated Sources ({sources.length})
          </h5>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {sources.map((src, idx) => {
              const sourceUrl = typeof src === 'string' ? src : src?.url || src?.source_url || '';
              const sourceLabel =
                typeof src === 'string'
                  ? src.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
                  : src?.title || sourceUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];

              if (!sourceUrl) return null;

              return (
                <a
                  key={`${sourceUrl}-${idx}`}
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={sourceUrl}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <ExternalLink className="h-3 w-3 text-indigo-500" />
                  <span className="max-w-[200px] truncate">{sourceLabel}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Disclaimer Note from Karen's Agent */}
      {note && (
        <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <p>{note}</p>
        </div>
      )}
    </div>
  );
}