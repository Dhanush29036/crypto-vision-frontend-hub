
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, TrendingUp, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CryptoVision</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          <NavLinks />
        </div>

        {/* Auth and Theme Buttons */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login" className="flex items-center space-x-1">
              <LogIn className="h-4 w-4 mr-1" />
              <span>Login</span>
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/signup" className="flex items-center space-x-1">
              <User className="h-4 w-4 mr-1" />
              <span>Sign Up</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in md:hidden">
          <div className="space-y-1 px-4 py-3">
            <MobileNavLinks closeMenu={() => setIsMenuOpen(false)} />
            <div className="flex flex-col space-y-2 pt-4 border-t border-border/60">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login" className="flex items-center justify-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link to="/signup" className="flex items-center justify-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* Navigation Links Component */
const NavLinks = () => {
  return (
    <>
      <Link
        to="/"
        className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        Home
      </Link>
      <Link
        to="/market"
        className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        Market
      </Link>
      <Link
        to="/predictions"
        className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        Predictions
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
          Tools <ChevronDown className="ml-1 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link to="/portfolio" className="w-full">
              Portfolio
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="w-full">
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link
        to="/news"
        className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        News
      </Link>
    </>
  );
};

/* Mobile Navigation Links Component */
const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <>
      <Link
        to="/"
        className="block py-2 text-base font-medium"
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        to="/market"
        className="block py-2 text-base font-medium"
        onClick={closeMenu}
      >
        Market
      </Link>
      <Link
        to="/predictions"
        className="block py-2 text-base font-medium"
        onClick={closeMenu}
      >
        Predictions
      </Link>
      <div>
        <button
          className="flex w-full items-center justify-between py-2 text-base font-medium"
          onClick={() => setIsToolsOpen(!isToolsOpen)}
        >
          Tools
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isToolsOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isToolsOpen && (
          <div className="ml-4 space-y-2 border-l border-border/60 pl-4">
            <Link
              to="/portfolio"
              className="block py-1.5 text-sm"
              onClick={closeMenu}
            >
              Portfolio
            </Link>
            <Link
              to="/dashboard"
              className="block py-1.5 text-sm"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
      <Link
        to="/news"
        className="block py-2 text-base font-medium"
        onClick={closeMenu}
      >
        News
      </Link>
    </>
  );
};
