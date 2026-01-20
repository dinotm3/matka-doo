"use client";

export default function AccountingStory() {
  return (
    <div className="story relative h-56 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* soft tint so it fits your palette */}
      <div className="absolute inset-0 bg-[rgb(var(--brand-50))/0.22]" />

      {/* CALCULATOR (center -> shrinks right -> fades out) */}
      <div className="calcWrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="calcInner">
          <div className="calcBody relative w-36 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="px-3 pt-3">
              <div className="display h-8 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-[12px] text-gray-800">
                <span className="typed">12,345.67</span>
                <span className="cursor">▍</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 p-3 pt-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-7 rounded-lg border border-gray-200 bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DOCUMENT (fade in, stay, fade out) */}
      <div className="docStage absolute inset-0 grid place-items-center pointer-events-none">
        <div className="doc">
          <div className="docCard relative w-72 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* approval glow */}
            <div className="approvalGlow absolute inset-0 pointer-events-none" />

            <div className="p-4 relative">
              <div className="h-3 w-28 rounded bg-gray-200" />
              <div className="mt-3 space-y-2">
                <div className="h-2 w-full rounded bg-gray-100" />
                <div className="h-2 w-[92%] rounded bg-gray-100" />
                <div className="h-2 w-[80%] rounded bg-gray-100" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-7 rounded bg-gray-100" />
                <div className="h-7 rounded bg-gray-100" />
                <div className="h-7 rounded bg-gray-100" />
                <div className="h-7 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAGNIFIER (fade in, glide left->right, fade out) */}
      <div className="magWrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="magInner relative h-20 w-80">
          {/* lens */}
          <div className="absolute left-0 top-3 h-14 w-14 rounded-full border border-gray-200 bg-white/95 shadow-sm" />
          {/* handle */}
          <div className="absolute left-[46px] top-[56px] h-[22px] w-[8px] rotate-45 rounded bg-gray-300" />

          {/* scan beam (over document area) */}
          <div className="absolute left-14 top-6 h-12 w-[260px] overflow-hidden rounded-xl">
            <div className="beamInner h-full w-full rounded-xl" />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ===== CALCULATOR ===== */
        .calcWrap {
          opacity: 1;
          animation: calcFade 12s ease-in-out infinite;
          will-change: opacity;
        }

        .calcInner {
          animation: calcMove 12s ease-in-out infinite;
          will-change: transform;
        }

        .typed {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          animation: typing 12s steps(9, end) infinite;
        }

        .cursor {
          display: inline-block;
          margin-left: 2px;
          opacity: 0;
          animation: cursorBlink 12s steps(1, end) infinite;
        }

        /* ===== DOCUMENT ===== */
        .doc {
          opacity: 0;
          transform: scale(0.98);
          animation: docInOut 12s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes docInOut {
          0% {
            opacity: 0;
            transform: scale(0.98);
          }
          34% {
            opacity: 0;
            transform: scale(0.98);
          }
          44% {
            opacity: 1;
            transform: scale(1);
          }
          74% {
            opacity: 1;
            transform: scale(1);
          }
          86% {
            opacity: 0;
            transform: scale(0.99);
          }
          100% {
            opacity: 0;
            transform: scale(0.99);
          }
        }

        /* ===== MAGNIFIER ===== */
        .magWrap {
          opacity: 0;
          animation: magInOut 12s ease-in-out infinite;
          will-change: opacity;
        }

        .magInner {
          transform: translateX(-90px);
          animation: magTravel 12s ease-in-out infinite;
          will-change: transform;
        }

        .beamInner {
          background: linear-gradient(
            to right,
            rgba(29, 78, 216, 0),
            rgba(29, 78, 216, 0.08),
            rgba(29, 78, 216, 0.16),
            rgba(29, 78, 216, 0.08),
            rgba(29, 78, 216, 0)
          );
          transform: translateX(-120%);
          animation: beamSweep 12s ease-in-out infinite;
          will-change: transform, opacity;
        }
        /* subtle approval wash */
        .approvalGlow {
          background: radial-gradient(
            circle at center,
            rgba(34, 197, 94, 0.18),
            rgba(34, 197, 94, 0.08),
            rgba(34, 197, 94, 0)
          );
          opacity: 0;
          animation: approvalPulse 12s ease-in-out infinite;
        }

        /* sync with document visibility */
        @keyframes approvalPulse {
          0% {
            opacity: 0;
          }
          60% {
            opacity: 0;
          }

          /* approval moment */
          68% {
            opacity: 1;
          }
          74% {
            opacity: 0.9;
          }

          /* fade before document disappears */
          80% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        /* ===== KEYFRAMES ===== */

        @keyframes calcMove {
          0% {
            transform: translate(0, 0) scale(1);
          }
          22% {
            transform: translate(0, 0) scale(1);
          }
          38% {
            transform: translate(120px, 0) scale(0.62);
          }
          48% {
            transform: translate(120px, 0) scale(0.62);
          }
          100% {
            transform: translate(120px, 0) scale(0.62);
          }
        }

        @keyframes calcFade {
          0% {
            opacity: 1;
          }
          48% {
            opacity: 1;
          }
          58% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes typing {
          0% {
            width: 0;
          }
          10% {
            width: 0;
          }
          22% {
            width: 9.2ch;
          }
          100% {
            width: 9.2ch;
          }
        }

        @keyframes cursorBlink {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          22% {
            opacity: 1;
          }
          28% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes docInOut {
          0% {
            opacity: 0;
            transform: scale(0.98);
          }
          34% {
            opacity: 0;
            transform: scale(0.98);
          }
          44% {
            opacity: 1;
            transform: scale(1);
          }
          74% {
            opacity: 1;
            transform: scale(1);
          }
          86% {
            opacity: 0;
            transform: scale(0.99);
          }
          100% {
            opacity: 0;
            transform: scale(0.99);
          }
        }

        @keyframes magInOut {
          0% {
            opacity: 0;
          }
          46% {
            opacity: 0;
          }
          52% {
            opacity: 1;
          }
          74% {
            opacity: 1;
          }
          86% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes magTravel {
          0% {
            transform: translateX(-90px);
          }
          52% {
            transform: translateX(-90px);
          }
          64% {
            transform: translateX(90px);
          }
          74% {
            transform: translateX(90px);
          }
          100% {
            transform: translateX(-90px);
          }
        }

        @keyframes beamSweep {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }
          52% {
            transform: translateX(-120%);
            opacity: 0;
          }
          58% {
            transform: translateX(0%);
            opacity: 1;
          }
          70% {
            transform: translateX(120%);
            opacity: 1;
          }
          74% {
            transform: translateX(120%);
            opacity: 0;
          }
          100% {
            transform: translateX(-120%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
