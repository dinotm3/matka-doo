type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl p-8 bg-white text-center shadow-sm min-h-[220px]">
      <div className="mb-4 flex justify-center">
        <div className="h-14 w-14 rounded-2xl bg-brand-50 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-900">
        {description}
      </p>
    </div>
  );
}
