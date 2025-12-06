import { AppRouter } from "@/providers/RouteProvider/RouterProvider.tsx";
import { Header } from "@/components/Header.tsx";

export const App = () => {
  return (
    <div>
      <Header />
      <main className={"h-[100vh]"}>
        <AppRouter />
      </main>
    </div>
  );
};
