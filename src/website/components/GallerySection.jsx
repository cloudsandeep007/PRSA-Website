import React, { useState } from 'react';
import { Camera, X, Play, ZoomIn } from 'lucide-react';

export default function GallerySection({ gallery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState(null);

  const categories = ['All', 'Quad Skates', 'Inline Speed', 'Events'];

  const filteredGallery = gallery.filter(g => {
    if (selectedCategory === 'All') return true;
    return g.category === selectedCategory || g.title.includes(selectedCategory);
  });

  return (
    <section className="w-full py-space-2xl bg-surface relative" id="gallery">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-uppercase text-label-uppercase tracking-widest text-primary-container font-bold text-[11px]">
              REAL RINK ACTION
            </span>
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary font-bold mt-1">
              PRSA MEDIA GALLERY
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
              High-resolution action photography and video clips captured at our dedicated floodlit speed rink and championship meets.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-label-uppercase text-[11px] font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/30 group cursor-pointer shadow-md hover:border-primary-container transition-all"
            >
              <img
                src={item.url}
                alt={item.title || "PRSA Gallery Photo"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x450?text=PRSA+Action+Photo';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-xs text-primary font-bold truncate">{item.title}</span>
                <span className="text-[10px] text-on-surface-variant">{item.caption}</span>
              </div>
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-surface-container-lowest/80 text-primary-container opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-4xl w-full p-2 space-y-2">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-surface-container-high text-white hover:text-primary"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={activeLightbox.url}
              alt={activeLightbox.title}
              className="max-h-[80vh] w-auto mx-auto object-contain rounded-xl border border-outline-variant/30 shadow-2xl"
            />

            <div className="text-center space-y-1 pt-2">
              <h4 className="text-lg font-bold text-primary">{activeLightbox.title}</h4>
              <p className="text-xs text-on-surface-variant">{activeLightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
