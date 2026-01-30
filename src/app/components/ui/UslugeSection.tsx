import { USLUGE } from "@/app/constants/constants";
import ScrollReveal from "../animations/ui/ScrollReveal";
import Image from "next/image";
import SveUslugeBtn from "../buttons/SveUslugeBtn";

export default function UslugeSection() {
  return (
    <section className="w-full text-brand-50">
      <ScrollReveal
        direction="down"
        distance={45}
        fade
        fadeOutMode="only-up"
        amount={0.1}
        enterDuration={0.6}
        exitDuration={0.6}
        className="w-full"
      >
        <div className="relative mx-auto w-full px-6 py-14 overflow-hidden">
          <div className="absolute inset-0 -z-10 blur-[0.5px]">
            <Image
              src="/header_green.png"
              alt=""
              fill
              priority
              className="object-cover contrast-70 brightness-80"
            />
            {/* Overlay to keep text readable */}
            <div className="absolute inset-0 bg-brand-900/70" />
          </div>
          <div className="flex flex-col gap-10 items-center justify-center ">
            {/* Title */}
            <div className="flex flex-col items-center text-center gap-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Najčešće usluge
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl">
              {USLUGE.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-sm backdrop-blur"
                >
                  <div className="text-lg font-semibold text-white">
                    {s.title}
                  </div>
                  <div className="mt-2 text-sm md:text-[15px] leading-relaxed text-white/80">
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>

            <SveUslugeBtn />
          </div>
        </div>
      </ScrollReveal>

      <div className="h-px w-full bg-white/10" />
    </section>
  );
}
