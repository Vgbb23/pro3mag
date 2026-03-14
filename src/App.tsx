import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Checkout from "./pages/Checkout.tsx";
import Obrigado from "./pages/Obrigado.tsx";
import NotFound from "./pages/NotFound.tsx";

const QUERY_PARAMS_STORAGE_KEY = "url_params";

const SaveUrlParams = () => {
  const { search } = useLocation();
  useEffect(() => {
    if (!search) return;
    const params = Object.fromEntries(new URLSearchParams(search).entries());
    if (Object.keys(params).length > 0) {
      localStorage.setItem(QUERY_PARAMS_STORAGE_KEY, JSON.stringify(params));
    }
  }, [search]);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SaveUrlParams />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/obrigado" element={<Obrigado />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
