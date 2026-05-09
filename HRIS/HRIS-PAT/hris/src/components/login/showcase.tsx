import { useEffect, useState } from "react";

const showcaseSlides = [
  {
    title: "Write accomplishment reports",
    subtitle:
      "Capture wins, milestones, and impact in one place so your contributions stay visible and review-ready.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "File leave and more",
    subtitle:
      "Submit time off and related requests through a single HRIS flow—clear status, fewer back-and-forths.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Manage efficiency",
    subtitle:
      "See how work lines up with priorities so teams spend effort where it matters and waste less time.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
];

const hrQuotes = [
  {
    quote: "Well done is better than well said.",
    author: "Benjamin Franklin",
  },
  {
    quote:
      "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou",
  },
  {
    quote:
      "Efficiency is doing things right; effectiveness is doing the right things.",
    author: "Peter Drucker",
  },
];

export const Showcase = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % showcaseSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden h-full flex-col overflow-hidden border-r p-10 text-white dark:border-r lg:flex">
      {showcaseSlides.map((slide, index) => (
        <img
          key={slide.title}
          src={slide.image}
          alt={slide.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        HRIS
      </div>

      <div className="relative z-20 mt-10 rounded-xl border border-white/30 bg-black/25 p-6 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold leading-tight">
          {showcaseSlides[activeSlide].title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/90">
          {showcaseSlides[activeSlide].subtitle}
        </p>
        <div className="mt-6 flex gap-2">
          {showcaseSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 w-8 rounded-full transition ${
                index === activeSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg leading-relaxed text-white/95">
            &ldquo;{hrQuotes[activeSlide].quote}&rdquo;
          </p>
          <footer className="text-sm text-white/75">
            {hrQuotes[activeSlide].author}
          </footer>
        </blockquote>
      </div>
    </div>
  );
};
