import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import AppRouter from "@/AppRouter";
import { GlobalLoading } from "@/components/ui/global-loading";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster richColors position="top-right" />
      <GlobalLoading />
    </BrowserRouter>
  );
}

export default App;
