import React, { useState } from 'react';
import { Send, Loader2, Sparkles, AlertTriangle } from 'lucide-react';

export default function IdeaForm({ onSubmitIdea, isLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_audience: '',
    industry: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Startup Idea Title is required.';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters long.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Startup Idea Description is required.';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Please provide at least 15 characters describing your idea.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      target_audience: formData.target_audience.trim() || null,
      industry: formData.industry.trim() || null,
    };

    onSubmitIdea(payload);
  };

  const fillSampleData = () => {
    setFormData({
      title: 'FarmConnect',
      description:
        'An AI-powered platform connecting local farmers directly with urban consumers and restaurants, eliminating middlemen while predicting crop demand and charging a small commission per order.',
      target_audience: 'Small-scale farmers and urban consumers',
      industry: 'Agriculture',
    });
    setErrors({});
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/40">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Submit Your Startup Idea</h3>
          <p className="mt-1 text-sm text-slate-500">
            Provide your venture details below for structured AI extraction.
          </p>
        </div>
        <button
          type="button"
          onClick={fillSampleData}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/70 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Try Sample Pitch
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {/* Startup Idea Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-slate-800">
            Startup Idea Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="e.g., FarmConnect, MedPulse AI, FinGuard"
            className={`mt-1.5 w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-rose-400 focus:ring-rose-500/20'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
              <AlertTriangle className="h-3.5 w-3.5" /> {errors.title}
            </p>
          )}
        </div>

        {/* Startup Idea Description */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="description" className="block text-sm font-semibold text-slate-800">
              Startup Idea Description <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-400">{formData.description.length} / 4000</span>
          </div>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Describe the core problem you're solving, how your product works, who benefits most, and how you plan to monetize..."
            className={`mt-1.5 w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:bg-white focus:outline-none focus:ring-2 ${
              errors.description
                ? 'border-rose-400 focus:ring-rose-500/20'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
          />
          {errors.description && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
              <AlertTriangle className="h-3.5 w-3.5" /> {errors.description}
            </p>
          )}
        </div>

        {/* Optional Fields Row */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="target_audience" className="block text-sm font-semibold text-slate-800">
              Target Audience <span className="text-xs font-normal text-slate-400">(Optional)</span>
            </label>
            <input
              id="target_audience"
              name="target_audience"
              type="text"
              value={formData.target_audience}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="e.g., Small businesses, College students"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-semibold text-slate-800">
              Industry / Domain <span className="text-xs font-normal text-slate-400">(Optional)</span>
            </label>
            <input
              id="industry"
              name="industry"
              type="text"
              value={formData.industry}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="e.g., FinTech, HealthTech, Agriculture"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing Idea with Gemini AI...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analyze My Idea
            </>
          )}
        </button>
      </form>
    </div>
  );
}