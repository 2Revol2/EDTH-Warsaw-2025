import { LiveStream } from "@/components/LiveStream.tsx";
import { CameraControls } from "@/components/CameraControls.tsx";

export const DashboardPage = () => {
  return (
    <div className="h-screen grid grid-rows-2 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="h-full p-3">
        <div className="h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
          <LiveStream />
        </div>
      </div>

      <div className="h-full  gap-3 p-3 pt-0">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
          <CameraControls />
        </div>
      </div>
    </div>
  );
};
