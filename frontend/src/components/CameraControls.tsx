import { useEffect, useState } from "react";

export const CameraControls = () => {
  const [pressed, setPressed] = useState<string | null>(null);

  const handleMove = (direction: string) => {
    console.log(`Camera move: ${direction}`);
    setPressed(direction);
    setTimeout(() => setPressed(null), 150);
  };

  const handleShoot = () => {
    console.log("Camera action: Shoot");
    setPressed("fire");
    setTimeout(() => setPressed(null), 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "arrowup" || key === "w") handleMove("up");
      else if (key === "arrowdown" || key === "s") handleMove("down");
      else if (key === "arrowleft" || key === "a") handleMove("left");
      else if (key === "arrowright" || key === "d") handleMove("right");
      else if (key === " ") {
        e.preventDefault();
        handleShoot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const btnClass =
    "bg-gradient-to-br from-slate-800 to-slate-900 hover:from-emerald-600 hover:to-emerald-700 text-emerald-400 hover:text-white font-mono font-bold border-2 border-emerald-500/50 hover:border-emerald-400 transition-all duration-200 uppercase tracking-wider shadow-lg hover:shadow-emerald-500/50 backdrop-blur-sm";

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 h-full flex flex-col items-center justify-center gap-6 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-2 opacity-70">
          Camera Control
        </div>
        <button
          onClick={() => handleMove("up")}
          className={`${btnClass} px-12 py-6 text-2xl rounded-xl ${pressed === "up" ? "scale-95 shadow-inner" : ""}`}
        >
          ▲
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => handleMove("left")}
            className={`${btnClass} px-12 py-6 text-2xl rounded-xl ${pressed === "left" ? "scale-95 shadow-inner" : ""}`}
          >
            ◄
          </button>
          <button
            onClick={() => handleMove("down")}
            className={`${btnClass} px-12 py-6 text-2xl rounded-xl ${pressed === "down" ? "scale-95 shadow-inner" : ""}`}
          >
            ▼
          </button>
          <button
            onClick={() => handleMove("right")}
            className={`${btnClass} px-12 py-6 text-2xl rounded-xl ${pressed === "right" ? "scale-95 shadow-inner" : ""}`}
          >
            ►
          </button>
        </div>
        <button
          onClick={handleShoot}
          className={`bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-yellow-300 hover:text-yellow-200 font-mono font-bold border-2 border-red-500/50 hover:border-red-400 transition-all duration-200 uppercase tracking-wider px-16 py-8 text-3xl mt-4 rounded-xl shadow-lg hover:shadow-red-500/50 ${pressed === "fire" ? "scale-95 shadow-inner" : ""}`}
        >
          FIRE
        </button>
      </div>
    </div>
  );
};
