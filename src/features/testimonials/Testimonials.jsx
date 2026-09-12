import { useEffect, useState } from 'react'

import { testimonials } from '../../data/testimonials'

function TestimonialModal({ testimonial, onClose }) {
  if (!testimonial) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonial from ${testimonial.name}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white p-10 shadow-2xl md:p-14"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-black/40 transition-colors hover:text-black"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <p className="text-5xl font-bold leading-none text-[#f73301]" aria-hidden="true">"</p>
        <blockquote className="mt-4 text-lg font-normal leading-relaxed text-black/80 md:text-xl">
          {testimonial.quote}
        </blockquote>
        <footer className="mt-8 border-t border-black/10 pt-6">
          <p className="text-sm font-semibold text-black">{testimonial.name}</p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-black/40">
            {testimonial.role}{testimonial.role && ' — '}{testimonial.city}
          </p>
          {testimonial.program && (
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f73301]/70">
              {testimonial.program}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <>
      <section id="testimonials" className="motion-section linked-section overflow-hidden border-t border-black/10 bg-[#f4f1eb] py-24 text-[#171717] md:py-32" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-7xl px-6">
          <p className="section-kicker text-[11px] font-medium uppercase tracking-[0.3em] text-black/45">
            From Previous Gatherings
          </p>
          <h2 id="testimonials-heading" className="mt-6 max-w-3xl text-4xl font-bold leading-none tracking-tighter md:text-6xl">
            Stories from<br />other Rooms
          </h2>
        </div>

        <div
          className="testimonial-scroll mt-14 flex gap-3 overflow-x-auto px-6 pb-4 md:mt-20"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="motion-stagger mx-auto flex w-max max-w-none gap-3 md:pl-[max(0px,calc((100vw-80rem)/2))]">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                onClick={() => setSelected(testimonial)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(testimonial); }}
                aria-label={`Read full testimonial from ${testimonial.name}`}
                className="group flex min-h-[330px] w-[min(82vw,480px)] shrink-0 cursor-pointer flex-col justify-between border border-black/10 bg-white p-8 shadow-[0_12px_35px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_16px_45px_rgba(0,0,0,0.1)] md:p-12"
              >
                <div className="min-h-0 flex-1 overflow-hidden">
                  <p className="text-5xl font-bold leading-none text-[#f73301]" aria-hidden="true">"</p>
                  <blockquote
                    className="mt-4 text-xl font-normal leading-snug text-black/80 md:text-2xl"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {testimonial.quote}
                  </blockquote>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#f73301] opacity-0 transition-opacity group-hover:opacity-100">
                    Read more →
                  </p>
                </div>
                <footer className="mt-10 border-t border-black/10 pt-6">
                  <p className="text-sm font-semibold text-black">{testimonial.name}</p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-black/40">
                    {testimonial.role}{testimonial.role && ' — '}{testimonial.city}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
      <TestimonialModal testimonial={selected} onClose={() => setSelected(null)} />
    </>
  );
}


