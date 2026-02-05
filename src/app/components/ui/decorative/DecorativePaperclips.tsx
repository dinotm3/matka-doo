export default function DecorativePaperclips() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* Top left */}
      <Paperclip
        className="absolute top-8 left-[5%] w-12 h-20 rotate-[-20deg] opacity-[0.15]"
      />

      {/* Top right */}
      <Paperclip
        className="absolute top-16 right-[8%] w-10 h-18 rotate-[25deg] opacity-[0.12]"
      />

      {/* Left side near feature cards */}
      <Paperclip
        className="absolute top-[55%] left-[3%] w-11 h-18 rotate-[-35deg] opacity-[0.13]"
      />

      {/* Right side near feature cards */}
      <Paperclip
        className="absolute top-[65%] right-[4%] w-9 h-16 rotate-[40deg] opacity-[0.1]"
      />

      {/* Bottom area */}
      <Paperclip
        className="absolute bottom-[8%] left-[15%] w-10 h-17 rotate-[15deg] opacity-[0.11]"
      />
    </div>
  );
}

function Paperclip({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C7.58 2 4 5.58 4 10v20c0 2.21 1.79 4 4 4s4-1.79 4-4V12c0-1.1-.9-2-2-2s-2 .9-2 2v16h2V12h2v18c0 2.21-1.79 4-4 4s-4-1.79-4-4V10c0-5.52 4.48-10 10-10s10 4.48 10 10v18h-2V10c0-4.42-3.58-8-8-8z"
        fill="currentColor"
        className="text-gray-400"
      />
    </svg>
  );
}
