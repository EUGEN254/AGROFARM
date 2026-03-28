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
import FarmerProfile from "./pages/farmers/FarmerProfile.tsx";
import FarmerSupport from "./pages/farmers/FarmerSupport.tsx";
import FarmerEarnings from "./pages/farmers/FarmerEarnings.tsx";
import FarmerReviews from "./pages/farmers/FarmerReviews.tsx";
import FarmerPromotions from "./pages/farmers/FarmerPromotions.tsx";
import FarmerDeliveries from "./pages/farmers/FarmerDeliveries.tsx";
import FarmerInventory from "./pages/farmers/FarmerInventory.tsx";
import FarmerNotifications from "./pages/farmers/FarmerNotifications.tsx";
import FarmerAnalytics from "./pages/farmers/FarmerAnalytics.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";

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
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/farmer" element={<FarmerLayout />}>
            <Route index element={<FarmerDashboard />} />

            {/* Products */}
            <Route path="listings" element={<FarmerListings />} />
            <Route path="inventory" element={<FarmerInventory />} />
            <Route path="promotions" element={<FarmerPromotions />} />

            {/* Orders */}
            <Route path="orders" element={<FarmerOrders />} />
            <Route path="deliveries" element={<FarmerDeliveries />} />

            {/* Communication */}
            <Route path="messages" element={<FarmerMessages />} />
            <Route path="reviews" element={<FarmerReviews />} />

            {/* Finance */}
            <Route path="earnings" element={<FarmerEarnings />} />

            {/* Existing */}
            <Route path="settings" element={<FarmerSettings />} />
            <Route path="profile" element={<FarmerProfile />} />
            <Route path="support" element={<FarmerSupport />} />
            <Route path="notifications" element={<FarmerNotifications />} />
            <Route path="analytics" element={<FarmerAnalytics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
