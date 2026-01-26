import AccountingStory from "../animations/accounting-story/AccountingStory";
import { STRINGS, HERO } from "../../constants/constants";
import FeatureCard from "./FeatureCard";
import { JSX } from "react";
import {
  BarChart3,
  FileCheck2,
  FolderSync,
  Lock,
  Users,
  Headset,
} from "lucide-react";
import HeroBanner from "./HeroBanner";
import AutoImageCarousel from "./AutoImageCarousel";
export default function () {
  const FEATURE_ICONS: Record<string, JSX.Element> = {
    [STRINGS.features.experience.title]: (
      <BarChart3 className="h-8 w-8 text-brand-300" />
    ),
    [STRINGS.features.precision.title]: (
      <FileCheck2 className="h-8 w-8 text-brand-300" />
    ),
    [STRINGS.features.digital.title]: (
      <FolderSync className="h-8 w-8 text-brand-300" />
    ),
    [STRINGS.features.trust.title]: <Lock className="h-8 w-8 text-brand-300" />,
    [STRINGS.features.individual.title]: (
      <Users className="h-8 w-8 text-brand-300" />
    ),
    [STRINGS.features.support.title]: (
      <Headset className="h-8 w-8 text-brand-300" />
    ),
  };
  const STORY_IMAGES = [
    { src: "/images/accounting/1.jpg", alt: "Knjigovodstvo – dokumenti" },
    { src: "/images/accounting/2.jpg", alt: "Knjigovodstvo – obračun" },
    { src: "/images/accounting/3.jpg", alt: "Knjigovodstvo – sastanak" },
    { src: "/images/accounting/4.jpg", alt: "Knjigovodstvo – ured" },
  ];
  return (
    <main className="relative z-10 mx-auto max-w-7xl px-8 text-gray-900 pb-16">
      <div className="inline-block rounded-xl bg-white/80 px-6 py-4">
        <h2 className="mt-1 text-4xl font-bold tracking-tight text-brand-200 text-center">
          {HERO.title}
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <HeroBanner />

          <div className="rounded-2xl border border-brand-50 bg-white p-6 shadow-sm">
            <AutoImageCarousel
              images={STORY_IMAGES}
              height={280}
              interval={3200}
            />
          </div>
        </div>

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
      </div>
    </main>
  );
}
