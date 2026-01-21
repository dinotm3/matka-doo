import AccountingStory from "../animations/accounting-story/AccountingStory";
import { STRINGS } from "../../constants/constants";
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
  return (
    <main className="relative z-10 mx-auto max-w-7xl px-8 text-gray-900 pb-16">
      <div className="inline-block rounded-xl bg-white/80 px-6 py-4">
        <h2 className="mt-1 text-4xl font-bold tracking-tight text-brand-200 text-center">
          Knjigovodstvene usluge - osnovani 1994. godine
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-brand-50 bg-white text-center p-6 shadow-sm flex flex-col justify-center">
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-brand-200 -translate-y-3">
              Vi vodite posao
              <br />
              Mi pazimo na brojke
            </h1>
          </div>

          <div className="rounded-2xl border border-brand-50 bg-white p-6 shadow-sm">
            <AccountingStory />
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
