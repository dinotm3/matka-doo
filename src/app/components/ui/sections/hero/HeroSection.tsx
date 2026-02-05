import { STRINGS } from "../../../../constants/constants";
import FeatureCard from "../../FeatureCard";
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
    <div className="relative">
      {/* Main content - centered */}
      <div className="relative z-10 py-8">
        <HeroBanner />
      </div>

      <section aria-labelledby="features-heading" className="mt-16">
        <h2 id="features-heading" className="sr-only">Zašto odabrati nas</h2>
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
          {Object.values(STRINGS.features).map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={FEATURE_ICONS[feature.title]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
