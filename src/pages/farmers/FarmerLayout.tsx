import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/farmer" },
  { label: "My Listings", icon: Package, path: "/farmer/listings" },
  { label: "Orders", icon: ShoppingCart, path: "/farmer/orders" },
  { label: "Messages", icon: MessageSquare, path: "/farmer/messages" },
  { label: "Settings", icon: Settings, path: "/farmer/settings" },
];

export default function FarmerLayout() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = {
    name: "John Farmer",
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background overflow-hidden">
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
        <button onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>

        <h1 className="font-bold">Farmer</h1>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ThemeToggle />
            </div>
          </TooltipTrigger>
          <TooltipContent>Toggle theme</TooltipContent>
        </Tooltip>
      </div>

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside
        className={`hidden md:flex flex-col border-r bg-card h-full transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h1 className="font-bold">Farmer Panel</h1>}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-muted rounded-md"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-2 px-2">
          {links.map((link) => {
            const active = location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <link.icon size={18} />
                {!collapsed && link.label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t text-sm flex items-center gap-2">
          <User size={18} />
          {!collapsed && user.name}
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR DRAWER ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-64 bg-card h-full p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="space-y-2 flex-1">
              {links.map((link) => {
                const active = location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t pt-4 text-sm flex items-center gap-2">
              <User size={18} />
              {user.name}
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TOP NAVBAR (DESKTOP + TABLET) */}
        <header className="hidden md:flex items-center justify-between px-6 py-3 border-b bg-card">
          {/* left: page title */}
          <h2 className="font-semibold text-sm text-muted-foreground">
            Farmer Dashboard
          </h2>

          {/* right: user + actions */}
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ThemeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-2 text-sm">
              <User size={18} />
              {user.name}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT (ONLY SCROLL AREA) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
