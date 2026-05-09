import { cn } from "@/lib/utils";

interface BackgroundMotionProps {
  className?: string;
}

/**
 * Ambient Background Motion component.
 * Renders a set of animated, blurred blobs that create a mesh gradient effect.
 * Extremely lightweight and hardware-accelerated.
 */
export const BackgroundMotion = ({ className }: BackgroundMotionProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none",
        "bg-background/40 backdrop-blur-[60px]",
        "transition-colors duration-700 ease-in-out", // Smooth theme transition
        className
      )}
    >
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        {/* Animated Blob 1 - Primary Focus */}
        <div
          className={cn(
            "absolute top-[-10%] left-[-10%] w-[65%] h-[65%] rounded-full",
            "bg-primary/20 dark:bg-primary/30 blur-[70px]",
            "animate-blob-slow will-change-transform transition-colors duration-700"
          )}
        />
        {/* Animated Blob 2 - Secondary Ambient */}
        <div
          className={cn(
            "absolute bottom-[0%] right-[-5%] w-[60%] h-[60%] rounded-full",
            "bg-secondary/30 dark:bg-secondary/20 blur-[90px]",
            "animate-blob-slower will-change-transform transition-colors duration-700"
          )}
        />
        {/* Animated Blob 3 - Accent Spark */}
        <div
          className={cn(
            "absolute top-[15%] right-[15%] w-[55%] h-[55%] rounded-full",
            "bg-accent/15 dark:bg-accent/25 blur-[80px]",
            "animate-blob-slowest will-change-transform transition-colors duration-700"
          )}
        />
      </div>

      {/* Self-contained SVG Noise overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.03] pointer-events-none mix-blend-overlay transition-opacity duration-700">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
