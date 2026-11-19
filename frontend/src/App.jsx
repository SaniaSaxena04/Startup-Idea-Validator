import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FlashcardSection from './components/FlashcardSection';
import IdeaForm from './components/IdeaForm';
import AnalysisResults from './components/AnalysisResults';
import { extractStartupIdea } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const scrollToSubmission = () => {
    setActiveTab('submit');
    const el = document.getElementById('submission-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyzeIdea = async (payload) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const data = await extractStartupIdea(payload);
      setAnalysisResult(data);
      setSavedIdeas((prev) => [
        { ...data, id: Date.now(), analyzedAt: new Date().toLocaleTimeString() },
        ...prev,
      ]);
      setSuccessMessage(`Successfully extracted structured insights for "${data.startup_name}".`);
      setActiveTab('my-ideas');

      setTimeout(() => {
        const resEl = document.getElementById('results-section');
        if (resEl) resEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    } catch (err) {
      setError(err.message || 'Failed to analyze startup idea.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIdeas.length}
      />

      <main>
        <HeroSection onAnalyzeClick={scrollToSubmission} />

        {/* Interactive 3D Flashcards */}
        <FlashcardSection />

        {/* Submission Form & AI Analysis Results Workspace */}
        <section
          id="submission-section"
          className="border-t border-slate-200/70 bg-gradient-to-b from-white to-slate-100/70 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-violet-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
                AI Startup Analyzer
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Validate & Structure Your Venture
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Enter your idea on the left and review the AI-extracted startup blueprint on the
                right.
              </p>
            </div>

            <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <IdeaForm onSubmitIdea={handleAnalyzeIdea} isLoading={isLoading} />
              </div>

              <div className="lg:col-span-7">
                <AnalysisResults
                  result={analysisResult}
                  isLoading={isLoading}
                  error={error}
                  successMessage={successMessage}
                />
              </div>
            </div>

            {/* Session History Bar (when multiple ideas have been analyzed) */}
            {savedIdeas.length > 1 && (
              <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Recent Ideas Analyzed This Session ({savedIdeas.length})
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {savedIdeas.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAnalysisResult(item);
                        setError(null);
                      }}
                      className={`rounded-xl border px-4 py-2 text-left text-xs transition ${
                        analysisResult?.startup_name === item.startup_name
                          ? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-700'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block font-bold">{item.startup_name}</span>
                      <span className="text-[11px] text-slate-400">
                        {item.industry} • {item.analyzedAt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          Team Draco – AI-Powered Startup Validation System
        </p>
        <p className="mt-1">Milestone 1 • Idea Submission & LLM Structured Extraction</p>
      </footer>
    </div>
  );
}