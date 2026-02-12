import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegistroPage from "./pages/RegistroPage";
import GanadoListPage from "./pages/GanadoListPage";
import CowProfilePage from "./pages/CowProfilePage";
import PropietariosPage from "./pages/PropietariosPage";
import DocumentosPage from "./pages/DocumentosPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/ganado" element={<GanadoListPage />} />
          <Route path="/ganado/:id" element={<CowProfilePage />} />
          <Route path="/propietarios" element={<PropietariosPage />} />
          <Route path="/documentos" element={<DocumentosPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
