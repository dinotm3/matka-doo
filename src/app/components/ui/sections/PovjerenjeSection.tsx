import { Star, Trophy, ArrowUpRight, Quote } from "lucide-react";
import { POVJERENJE } from "@/app/constants/constants";
import { softGreenBackground } from "@/app/constants/uiClasses";
import Reveal from "../../animations/ui/Reveal";

/**
 * Trust section: independent rating, award badge and a few short quotes,
 * all attributed and linked to the public trebam.hr profile.
 *
 * Sits directly under the dark green services section and above the map.
 */
export default function PovjerenjeSection() {
  const stars = Array.from({ length: POVJERENJE.ratingMax });

  return (
    <section
      aria-labelledby="povjerenje-title"
      className="relative overflow-x-clip"
    >
      {/* Same soft green background as the contact section (uiClasses.ts) */}
      <div className="absolute inset-0 -z-10" style={softGreenBackground} />

      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal direction="up" distance={24} amount={0.2}>
          <div className="text-center">
            <h2
              id="povjerenje-title"
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
            >
              {POVJERENJE.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-8 items-stretch">
          {/* Rating card */}
          <Reveal direction="left" distance={24} amount={0.3} className="h-full">
            <div className="h-full rounded-2xl bg-brand-900 text-white p-8 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="text-6xl md:text-7xl font-bold leading-none tracking-tight">
                {POVJERENJE.rating}
              </div>
              <div
                className="mt-3 flex items-center gap-1"
                aria-label={`${POVJERENJE.rating} od ${POVJERENJE.ratingMax}`}
              >
                {stars.map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-white text-white"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 ring-1 ring-white/30 px-4 py-2 text-sm font-semibold">
                <Trophy className="h-4 w-4" aria-hidden="true" />
                {POVJERENJE.award}
              </div>
              <div className="mt-2 text-xs text-white/70">
                {POVJERENJE.awardSource}
              </div>
            </div>
          </Reveal>

          {/* Quotes */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {POVJERENJE.quotes.map((q, i) => (
              <Reveal
                key={q.author}
                direction="up"
                distance={24}
                amount={0.3}
                delay={i * 80}
                className="h-full"
              >
                <figure className="h-full rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col">
                  <Quote
                    className="h-6 w-6 fill-brand-900 text-brand-900"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-3 text-gray-700 leading-relaxed flex-1">
                    {q.text}
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span className="flex items-center gap-0.5" aria-hidden="true">
                      {stars.map((_, s) => (
                        <Star
                          key={s}
                          className="h-3.5 w-3.5 fill-brand-900 text-brand-900"
                        />
                      ))}
                    </span>
                    {q.author}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal direction="up" distance={16} amount={0.5} className="mt-8 flex justify-center">
          <a
            href={POVJERENJE.profileUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 text-brand-900 font-semibold hover:text-brand-800 hover:underline underline-offset-4 transition-colors"
          >
            {POVJERENJE.profileCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
