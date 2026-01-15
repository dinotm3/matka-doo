type HighlightBadgeProps = {
  label: string;
  icon: string; // can be emoji OR image path
};

const isImagePath = (v: string) => v.startsWith("/") || v.startsWith("http");

export default function HighlightBadge({ label, icon }: HighlightBadgeProps) {
  return (
    <div className="rounded-xl border border-[rgb(var(--brand-50))] bg-[rgb(var(--brand-50))] p-6 text-center transition shadow-sm">
      {isImagePath(icon) ? (
        <img src={icon} alt="" className="mx-auto mb-3 h-16 w-16" />
      ) : (
        <div className="mx-auto mb-3 text-4xl leading-none">{icon}</div>
      )}

      <p className="font-semibold text-white">{label}</p>
    </div>
  );
}
