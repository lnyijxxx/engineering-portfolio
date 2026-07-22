export function Starfield({ count = 70 }: { count?: number }) {
  const stars = Array.from({ length: count }).map((_, i) => {
    const layer = Math.random() < 0.35 ? "near" : "far";
    const size = layer === "near" ? 1.5 + Math.random() * 1.5 : 0.5 + Math.random() * 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const twinkleDuration = 2.5 + Math.random() * 3.5;
    const twinkleDelay = -Math.random() * 5;
    const driftDuration = layer === "near" ? 40 + Math.random() * 30 : 80 + Math.random() * 50;
    const driftDelay = -Math.random() * driftDuration;
    const baseOpacity = layer === "near" ? 0.5 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3;

    return (
      <span
        key={i}
        className="star"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: baseOpacity,
          animationName: "star-twinkle, star-drift",
          animationDuration: `${twinkleDuration}s, ${driftDuration}s`,
          animationDelay: `${twinkleDelay}s, ${driftDelay}s`,
          animationIterationCount: "infinite, infinite",
          animationTimingFunction: "ease-in-out, linear",
          animationDirection: "alternate, alternate",
        }}
      />
    );
  });

  return (
    <div className="starfield" aria-hidden="true">
      {stars}
    </div>
  );
}