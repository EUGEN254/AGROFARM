import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Settings,
  Menu,
  X,
  User,
  Boxes,
  BarChart3,
  Wallet,
  Star,
  Truck,
  Tag,
  Bell,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import FarmerSidebar from "@/components/farmer/FarmerSidebar";
import SidebarContent from "@/components/farmer/SidebarContent";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/farmer" },
      { label: "Analytics", icon: BarChart3, path: "/farmer/analytics" },
    ],
  },
  {
    section: "Products",
    items: [
      { label: "Listings", icon: Package, path: "/farmer/listings" },
      { label: "Inventory", icon: Boxes, path: "/farmer/inventory" },
      { label: "Promotions", icon: Tag, path: "/farmer/promotions" },
    ],
  },
  {
    section: "Orders",
    items: [
      { label: "Orders", icon: ShoppingCart, path: "/farmer/orders" },
      { label: "Deliveries", icon: Truck, path: "/farmer/deliveries" },
    ],
  },
  {
    section: "Communication",
    items: [
      { label: "Messages", icon: MessageSquare, path: "/farmer/messages" },
      { label: "Reviews", icon: Star, path: "/farmer/reviews" },
    ],
  },
  {
    section: "Finance",
    items: [{ label: "Earnings", icon: Wallet, path: "/farmer/earnings" }],
  },
];

export default function FarmerLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  // Redirect if no user is found (protected route logic)
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    // Navigation is handled in the logout function or here
    navigate("/");
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render anything if no user (will redirect via useEffect)
  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background overflow-hidden">
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>

        <h1 className="font-bold">Farmer</h1>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md hover:bg-muted">
                <User size={18} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email || ""}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => navigate("/farmer/profile")}>
                <User className="mr-2" size={16} />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/farmer/settings")}>
                <Settings className="mr-2" size={16} />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/farmer/support")}>
                <MessageSquare className="mr-2" size={16} />
                Support
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <FarmerSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        links={links}
        user={user}
      />

      {/* ================= MOBILE SIDEBAR DRAWER ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* drawer */}
          <div className="relative w-64 bg-card h-full p-4 flex flex-col z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <SidebarContent
                links={links}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>

            <div className="border-t pt-4 text-sm flex items-center gap-2">
              <User size={18} />
              {user?.name || "User"}
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TOP BAR (DESKTOP) */}
        <header className="hidden md:flex items-center justify-between px-6 py-3 border-b bg-card">
          <h2 className="text-sm text-muted-foreground font-semibold">
            Farmer Dashboard
          </h2>

          <div className="flex items-center gap-4 ">
            <div
              onClick={() => navigate("/farmer/notifications")}
              className="relative hover:cursor-pointer"
            >
              <Bell size={26} className="text-muted-foreground" />
              <span className="absolute -top-2  left-3  bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ThemeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted">
                  <User size={18} />
                  {user?.name || "User"}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user?.name || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/farmer/profile")}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/farmer/settings")}>
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/farmer/support")}>
                  Support
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}