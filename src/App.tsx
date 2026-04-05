import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import BlogNGS from "./pages/BlogNGS.tsx";
import BlogVariants from "./pages/BlogVariants.tsx";
import BlogDocking from "./pages/BlogDocking.tsx";
import BlogP24 from "./pages/BlogP24.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog/pretraitement-donnees-ngs" element={<BlogNGS />} />
          <Route path="/blog/detection-variants-snp-indel-cnv" element={<BlogVariants />} />
          <Route path="/blog/docking-moleculaire-criblage-virtuel" element={<BlogDocking />} />
          <Route path="/blog/criblage-virtuel-p24-vih1" element={<BlogP24 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
