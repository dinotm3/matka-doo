type FeatureCardProps = {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  variant?: "default" | "compact-green";
};

export default function FeatureCard({
  title,
  description,
  icon,
  variant = "default",
}: FeatureCardProps) {
  const isCompact = variant === "compact-green";

  return (
    <article
      className={
        isCompact
          ? "rounded-xl border border-white/20 bg-white/15 p-4 hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] transition-[background-color,border-color,transform] duration-300 group text-center"
          : "rounded-2xl p-8 text-center bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[220px] group"
      }
    >
      <div className={isCompact ? "mb-2 flex justify-center" : "mb-4 flex justify-center"}>
        <div
          className={
            isCompact
              ? "h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center animate-pulse-subtle"
              : "h-14 w-14 rounded-2xl bg-brand-900/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          }
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      <h3
        className={
          isCompact ? "text-sm font-semibold text-white" : "text-lg font-semibold text-brand-900"
        }
      >
        {title}
      </h3>
      <p
        className={
          isCompact
            ? "mt-1 text-xs leading-relaxed text-white/80"
            : "mt-3 text-sm leading-relaxed text-gray-600"
        }
      >
        {description}
      </p>
    </article>
  );
}
