import { Menu, User } from "lucide-react";
import SidebarContent from "./SidebarContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

type LinkItem = {
  label: string;
  icon: any;
  path: string;
};

type LinkGroup = {
  section: string;
  items: LinkItem[];
};

interface Props {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  links: LinkGroup[];
  user: { name: string };
}

export default function FarmerSidebar({
  collapsed,
  setCollapsed,
  links,
  user,
}: Props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return (
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

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-2">
        <SidebarContent links={links} collapsed={collapsed} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted">
            <User size={18} />

            {!collapsed && user.name}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
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

          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
}
