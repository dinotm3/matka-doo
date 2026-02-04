import { STRINGS } from "../../constants/constants";
import FeatureCard from "./FeatureCard";
import { JSX } from "react";
import {
  Award,
  BadgeCheck,
  Laptop2,
  ShieldCheck,
  Sparkles,
  Headphones,
} from "lucide-react";
import HeroBanner from "./HeroBanner";
import Image from "next/image";

function SideHeroImage({
  src,
  alt = "",
  tilt = "left",
}: {
  src: string;
  alt?: string;
  tilt?: "left" | "right";
}) {
  const rotation = tilt === "left" ? "-6deg" : "6deg";

  return (
    <div className="relative mx-auto h-[160px] w-[260px] md:mx-0">
      {/* offset shadow */}
      <div
        className="absolute inset-0 rounded-2xl bg-brand-900/20"
        style={{ transform: "translate(10px, 10px)" }}
      />

      {/* image frame - tilted */}
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
        style={{ transform: `rotate(${rotation})` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          quality={90}
        />

        {/* subtle palette unifier */}
        <div className="absolute inset-0 bg-brand-900/5" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const iconProps = "h-7 w-7 text-brand-900 stroke-[1.5]";
  const FEATURE_ICONS: Record<string, JSX.Element> = {
    [STRINGS.features.experience.title]: <Award className={iconProps} />,
    [STRINGS.features.precision.title]: <BadgeCheck className={iconProps} />,
    [STRINGS.features.digital.title]: <Laptop2 className={iconProps} />,
    [STRINGS.features.trust.title]: <ShieldCheck className={iconProps} />,
    [STRINGS.features.individual.title]: <Sparkles className={iconProps} />,
    [STRINGS.features.support.title]: <Headphones className={iconProps} />,
  };

  return (
    <main className="relative">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        {/* LEFT IMAGE - Calculator */}
        <div className="order-2 md:order-1 md:justify-self-end">
          <SideHeroImage src="/hero.jpg" alt="Calculator" tilt="left" />
        </div>

        <div className="order-1 text-center md:order-2">
          <HeroBanner />
        </div>

        {/* RIGHT IMAGE - Binders */}
        <div className="order-3 md:justify-self-start">
          <SideHeroImage src="/registratori_green.png" alt="Binders" tilt="right" />
        </div>
      </div>

      <div className="mt-16 grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
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
