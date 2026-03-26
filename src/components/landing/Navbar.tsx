import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ui/ThemeToggle";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src={logoIcon}
            alt="FarmLink logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-display text-xl font-bold text-foreground">
            FarmLink
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Toggle theme
            </TooltipContent>
          </Tooltip>

          <Link to="/auth/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>

          <Link to="/auth/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Toggle theme
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {mobileOpen ? "Close menu" : "Open menu"}
            </TooltipContent>
          </Tooltip>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 mt-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm" className="flex-1">
                Log In
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm" className="flex-1">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;