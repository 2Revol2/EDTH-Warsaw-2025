import { AppRouter } from "@/providers/RouteProvider/RouterProvider.tsx";
import { Header } from "@/components/Header.tsx";

export const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <AppRouter />
      </main>
    </div>
  );
};
