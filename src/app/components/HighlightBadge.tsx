type HighlightBadgeProps = {
  label: string;
  icon: string;
};

export default function HighlightBadge({ label, icon }: HighlightBadgeProps) {
  return (
    <div
      className="
          group
          rounded-xl border border-gray-200 bg-white p-6 text-center
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:shadow-md
          hover:border-gray-300 hover:bg-gray-200
          cursor-pointer
        "
    >
      <img
        src={icon}
        className="
            mx-auto mb-4 h-14 w-14
            transition-transform duration-300
            group-hover:scale-110
          "
        alt=""
      />

      <p
        className="
    font-semibold tracking-wide text-gray-700
    transition-colors duration-300
    group-hover:text-gray-800
  "
      >
        {label}
      </p>
    </div>
  );
}
