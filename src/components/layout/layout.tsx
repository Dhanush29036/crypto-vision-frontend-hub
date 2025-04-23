import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Optional: Better logout redirect experience
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Top Bar: Search + Theme Toggle */}
          <div className="sticky top-0 bg-background/90 z-40 flex items-center justify-between px-6 py-2 border-b border-border shadow-sm">
            <form
              className="flex items-center gap-2 w-full max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <span className="sr-only">Search coins</span>
              <div className="relative w-full">
                <input
                  type="search"
                  className="pl-8 pr-4 py-2 rounded-lg border border-input w-full bg-muted focus:bg-background focus:ring-2 focus:ring-primary transition"
                  placeholder="Search coins..."
                  aria-label="Search coins"
                />
                <Search className="absolute left-2 top-2.5 text-muted-foreground" size={16} />
              </div>
            </form>
            <ThemeToggle />
          </div>
          <div className="flex-1 w-full overflow-y-auto bg-background p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
