type HighlightBadgeProps = {
  label: string;
  icon: string; // emoji OR image path
};

const isImagePath = (v: string) => v.startsWith("/") || v.startsWith("http");

export default function HighlightBadge({ label, icon }: HighlightBadgeProps) {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[220px]
        rounded-lg
        border border-brand-50
        bg-brand-300
        p-4
        text-center
        shadow-sm
      "
    >
      {isImagePath(icon) ? (
        <img src={icon} alt="" className="mx-auto mb-2 h-10 w-10" />
      ) : (
        <div className="mx-auto mb-2 text-3xl leading-none">{icon}</div>
      )}

      <p className="text-sm font-semibold text-white">{label}</p>
    </div>
  );
}
