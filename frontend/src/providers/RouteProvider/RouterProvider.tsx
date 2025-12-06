import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "@/pages/DashboardPage/DashboardPage.tsx";
import { MapPage } from "@/pages/MapPage/MapPage.tsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
};
