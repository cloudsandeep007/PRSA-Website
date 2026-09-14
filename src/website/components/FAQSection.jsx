import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full py-space-2xl bg-surface relative" id="faq">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="max-w-3xl mx-auto space-y-space-md">
          <div className="text-center space-y-space-xs mb-space-xl">
            <span className="font-label-uppercase text-label-uppercase tracking-widest text-primary-container font-bold text-[11px]">
              QUESTIONS ANSWERED
            </span>
            <h3 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-primary font-bold">
              FREQUENTLY ASKED QUESTIONS
            </h3>
          </div>

          <div className="space-y-space-xs">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-space-md font-label-md text-label-md text-primary font-bold flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="pr-4 text-sm">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-primary-container shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-space-md pb-space-md pt-0 text-xs text-on-surface-variant leading-relaxed animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
