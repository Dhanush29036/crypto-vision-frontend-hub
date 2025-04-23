
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function LoginSignup() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
    }, 800); // Simulate async
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/25 to-background">
      <div className="max-w-md w-full bg-card shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-2 text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          {isLogin
            ? "Access your CryptoVision account"
            : "Create a new CryptoVision account"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full px-3 py-2 rounded border border-input bg-background focus:outline-none focus:ring focus:ring-primary"
            autoComplete="email"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full px-3 py-2 rounded border border-input bg-background focus:outline-none focus:ring focus:ring-primary"
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
