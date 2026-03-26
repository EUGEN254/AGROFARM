import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import FarmerDashboard from "./pages/farmers/FarmerDashboard.tsx";
import FarmerLayout from "./pages/farmers/FarmerLayout.tsx";
import FarmerListings from "./pages/farmers/FarmerListings.tsx";
import FarmerOrders from "./pages/farmers/FarmerOrders.tsx";
import FarmerMessages from "./pages/farmers/FarmerMessages.tsx";
import FarmerSettings from "./pages/farmers/FarmerSettings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/:mode/:role?" element={<Auth />} />
          <Route path="/farmer" element={<FarmerLayout />}>
            <Route index element={<FarmerDashboard />} />
            <Route path="listings" element={<FarmerListings />} />
            <Route path="orders" element={<FarmerOrders />} />
            <Route path="messages" element={<FarmerMessages />} />
            <Route path="settings" element={<FarmerSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
