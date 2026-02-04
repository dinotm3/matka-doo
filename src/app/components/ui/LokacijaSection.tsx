import React from "react";
import ScrollReveal from "../animations/ui/ScrollReveal";
import { LOKACIJA, SITE_INFO } from "../../constants/constants";
import InteractiveMap from "../maps/InteractiveMap";
import { MapPin, Clock, Mail, Phone } from "lucide-react";

export default function LokacijaSection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50">
      <div className="grid w-full lg:grid-cols-2 lg:min-h-[70vh] items-stretch overflow-x-clip">
        {/* LEFT CONTENT */}
        <div className="relative h-full flex items-center justify-center px-6 py-16 lg:px-16">
          <ScrollReveal
            direction="down"
            distance={450}
            fade
            fadeOutMode="only-up"
            amount={0.1}
            enterDuration={1.2}
            exitDuration={0.6}
            className="w-full"
          >
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {LOKACIJA.title}
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {LOKACIJA.description}
              </p>

              <div className="mt-8 space-y-4">
                <InfoRow
                  icon={<MapPin className="h-5 w-5" />}
                  label={LOKACIJA.strings.adresa}
                  value={LOKACIJA.adresa}
                />
                <InfoRow
                  icon={<Clock className="h-5 w-5" />}
                  label={LOKACIJA.strings.radno_vrijeme_title}
                  value={LOKACIJA.strings.radno_vrijeme}
                />
                <InfoRow
                  icon={<Mail className="h-5 w-5" />}
                  label={LOKACIJA.strings.email}
                  value={SITE_INFO.email}
                />
                <InfoRow
                  icon={<Phone className="h-5 w-5" />}
                  label={LOKACIJA.strings.telefon}
                  value={SITE_INFO.phone}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT MAP */}
        <div className="relative h-full">
          <ScrollReveal
            direction="right"
            distance={450}
            fade
            fadeOutMode="only-up"
            amount={0.1}
            enterDuration={1.2}
            exitDuration={0.6}
            className="h-full"
          >
            <InteractiveMap
              className="w-full h-full"
              minHeight="100%"
              src={LOKACIJA.embedURL}
              enableLabel={LOKACIJA.strings.interakcija_karta}
              closeLabel={LOKACIJA.strings.zatvori_mapu}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900">
        {icon}
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-500">{label}</span>
        <span className="block text-base font-semibold text-gray-900 mt-0.5">
          {value}
        </span>
      </div>
    </div>
  );
}
