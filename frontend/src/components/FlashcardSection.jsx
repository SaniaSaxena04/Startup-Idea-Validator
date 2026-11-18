import React, { useState } from 'react';
import {
  AlertCircle,
  Lightbulb,
  Users,
  TrendingUp,
  Sparkles,
  BadgeDollarSign,
  RotateCw,
} from 'lucide-react';

const FLASHCARDS = [
  {
    id: 1,
    category: 'Problem',
    front: 'What problem are you solving?',
    back: 'Explain the real-world problem your startup aims to solve.',
    icon: AlertCircle,
    gradient: 'from-rose-500 to-orange-500',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 2,
    category: 'Solution',
    front: 'What is your solution?',
    back: 'Describe how your product or service solves the problem.',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-yellow-500',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 3,
    category: 'Target Audience',
    front: 'Who are your customers?',
    back: 'Identify the people or businesses who will use your product.',
    icon: Users,
    gradient: 'from-sky-500 to-blue-600',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 4,
    category: 'Market Opportunity',
    front: 'Is there a market opportunity?',
    back: 'Describe the market demand and potential customers.',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 5,
    category: 'Innovation',
    front: 'What makes your idea unique?',
    back: 'Explain your competitive advantage and differentiation.',
    icon: Sparkles,
    gradient: 'from-indigo-500 to-violet-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    id: 6,
    category: 'Business Model',
    front: 'How will you earn revenue?',
    back: 'Describe how your startup will generate income.',
    icon: BadgeDollarSign,
    gradient: 'from-fuchsia-500 to-purple-600',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  },
];

export default function FlashcardSection() {
  const [flippedIds, setFlippedIds] = useState({});

  const toggleCard = (id) => {
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="flashcards-section" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Interactive Founder Guide
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore Your Startup Idea
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Click any flashcard below to flip it and uncover the key questions investors and our AI
            analyst look for in your pitch.
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FLASHCARDS.map((card) => {
            const IconComponent = card.icon;
            const isFlipped = !!flippedIds[card.id];

            return (
              <div
                key={card.id}
                onClick={() => toggleCard(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard(card.id);
                  }
                }}
                aria-label={`${card.category} flashcard. Click to flip.`}
                className="group h-60 cursor-pointer select-none [perspective:1000px]"
              >
                <div
                  className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:-translate-y-1 ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 flex h-full w-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow group-hover:shadow-lg [backface-visibility:hidden]">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${card.badgeBg}`}
                      >
                        {card.category}
                      </span>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-sm`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-snug">
                        {card.front}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-medium text-slate-400">
                      <span>Card 0{card.id}</span>
                      <span className="inline-flex items-center gap-1 text-indigo-600 group-hover:underline">
                        <RotateCw className="h-3.5 w-3.5" /> Click to flip
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className={`absolute inset-0 flex h-full w-full flex-col justify-between rounded-2xl bg-gradient-to-br ${card.gradient} p-6 text-white shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                        {card.category} Guidance
                      </span>
                      <IconComponent className="h-5 w-5 text-white/90" />
                    </div>

                    <p className="text-base font-medium leading-relaxed text-white">
                      {card.back}
                    </p>

                    <div className="flex items-center justify-between border-t border-white/20 pt-3 text-xs font-medium text-white/85">
                      <span>Tip for your description</span>
                      <span className="inline-flex items-center gap-1">
                        <RotateCw className="h-3.5 w-3.5" /> Flip back
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}