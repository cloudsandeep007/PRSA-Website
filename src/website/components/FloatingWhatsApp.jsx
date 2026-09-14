import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp({ whatsappNumber = "919876543210" }) {
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanNum = (whatsappNumber || "919876543210").replace(/[^0-9]/g, '');
  const message = encodeURIComponent("Hi PRSA Academy! I would like to enquire about roller skating classes & free trial.");
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
      {/* Floating Tooltip Callout */}
      {showTooltip && (
        <div className="mb-2 relative bg-surface-container-high border border-emerald-500/30 text-on-surface text-xs font-semibold px-3 py-2 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce max-w-[220px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>Chat with PRSA Admissions on WhatsApp!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-on-surface-variant hover:text-primary transition-colors ml-1"
            title="Close badge"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-surface-container-high border-r border-b border-emerald-500/30 rotate-45" />
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with PRSA Academy on WhatsApp"
        className="relative bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 rounded-full shadow-[0_0_24px_rgba(37,211,102,0.55)] hover:shadow-[0_0_35px_rgba(37,211,102,0.85)] transition-all transform hover:scale-110 flex items-center justify-center border-2 border-white/20 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping -z-10" />
        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>
  );
}
