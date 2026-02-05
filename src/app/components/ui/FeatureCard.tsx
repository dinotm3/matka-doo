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
    <article className="rounded-2xl p-8 text-center bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[220px] group">
      <div className="mb-4 flex justify-center">
        <div className="h-14 w-14 rounded-2xl bg-brand-900/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
          {icon}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </article>
  );
}
