'use client';

export default function KofiButton() {
  return (
    <a
      href="https://ko-fi.com/mochitools"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#f8a4b8] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm"
      aria-label="Support on Ko-fi"
    >
      ❤️ Support
    </a>
  );
}
