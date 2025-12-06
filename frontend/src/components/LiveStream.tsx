import ReactPlayer from "react-player";

export const LiveStream = () => {
  return (
    <div className="h-full w-full relative bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-slate-900/80 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg border border-red-500/30">
        <div className="text-red-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-1 sm:gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" />
          Live Stream
        </div>
      </div>
      <ReactPlayer
        className="absolute top-0 left-0"
        src="https://www.youtube.com/live/V-ERTb6JXrc?si=H8NI8km6lX0WKC7w"
        controls
        playing
        width="100%"
        height="100%"
      />
    </div>
  );
};
