
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Market from "./pages/Market";
import Predictions from "./pages/Predictions";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginSignup from "./pages/LoginSignup";
import { Layout } from "@/components/layout/layout";

// Optional: Wrapping children to provide auth required routes
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Login/Signup (Public) */}
              <Route path="/login" element={<LoginSignup />} />

              {/* Main app: Require authentication */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                }
              />
              <Route
                path="/market"
                element={
                  <PrivateRoute>
                    <Market />
                  </PrivateRoute>
                }
              />
              <Route
                path="/predictions"
                element={
                  <PrivateRoute>
                    <Predictions />
                  </PrivateRoute>
                }
              />
              {/* Add more pages as needed (portfolio, dashboard, settings, news, profile, etc.) */}

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
