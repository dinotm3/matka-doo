type FeatureCardProps = {
  title: string;
  description: string;
  icon: string; // emoji OR image path
};

const isImagePath = (v: string) => v.startsWith("/") || v.startsWith("http");

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div
      className="
        rounded-2xl
        p-8
        bg-white
        text-center
        shadow-sm
        min-h-[220px]
      "
    >
      {isImagePath(icon) ? (
        <img src={icon} alt="" className="mx-auto mb-4 h-16 w-16" />
      ) : (
        <div className="mx-auto mb-4 text-3xl opacity-70">{icon}</div>
      )}

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-900">
        {description}
      </p>
    </div>
  );
}
