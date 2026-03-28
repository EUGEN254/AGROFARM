import { Link, useLocation } from "react-router-dom";

type LinkItem = {
  label: string;
  icon: any;
  path: string;
};

type LinkGroup = {
  section: string;
  items: LinkItem[];
};

export default function SidebarContent({
  links,
  collapsed = false,
  onNavigate,
}: {
  links: LinkGroup[];
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const location = useLocation();

  return (
    <nav className="space-y-4">
      {links.map((group) => (
        <div key={group.section}>
          {!collapsed && (
            <p className="text-xs font-medium text-muted-foreground px-3 mb-1">
              {group.section}
            </p>
          )}

          <div className="space-y-1">
            {group.items.map((link) => {
              const active = location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onNavigate}
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
          </div>
        </div>
      ))}
    </nav>
  );
}