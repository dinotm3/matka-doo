import { STRINGS, HERO } from "../../constants/constants";
import FeatureCard from "./FeatureCard";
import { JSX } from "react";
import {
  BarChart4,
  FileCheck2,
  FolderSync,
  Lock,
  Users,
  Headset,
} from "lucide-react";
import HeroBanner from "./HeroBanner";
import Image from "next/image";

function SideHeroImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <div className="relative mx-auto h-[120px] w-[320px] md:mx-0">
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-black/5 bg-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 320px, 80vw"
          className="object-cover"
          priority
        />
        {/* subtle tint so photos match the palette */}
        <div className="absolute inset-0 bg-slate-900/5" />
      </div>
    </div>
  );
}
export default function () {
  const iconProps = "h-8 w-8 text-brand-900";
  const FEATURE_ICONS: Record<string, JSX.Element> = {
    [STRINGS.features.experience.title]: <BarChart4 className={iconProps} />,
    [STRINGS.features.precision.title]: <FileCheck2 className={iconProps} />,
    [STRINGS.features.digital.title]: <FolderSync className={iconProps} />,
    [STRINGS.features.trust.title]: <Lock className={iconProps} />,
    [STRINGS.features.individual.title]: <Users className={iconProps} />,
    [STRINGS.features.support.title]: <Headset className={iconProps} />,
  };

  return (
    <main className="relative z-10 mx-auto px-4 pb-16">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        {/* LEFT IMAGE (same sizing + order) */}
        <div className="order-2 md:order-1 md:justify-self-end">
          <SideHeroImage src="/hero.jpg" alt="" />
        </div>

        <div className="order-1 text-center md:order-2">
          <HeroBanner />
        </div>

        {/* RIGHT IMAGE (same sizing + order) */}
        <div className="order-3 md:justify-self-start">
          <SideHeroImage src="/registratori.png" alt="" />
        </div>
      </div>

      {/* Feature grid (UNCHANGED spacing) */}
      <div className="mt-12 grid gap-x-4 gap-y-8 md:grid-cols-3">
        {Object.values(STRINGS.features).map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={FEATURE_ICONS[feature.title]}
          />
        ))}
      </div>
    </main>
  );
}
