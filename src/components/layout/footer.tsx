
import { Link } from "react-router-dom";
import { TrendingUp, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-container py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and socials */}
          <div className="md:col-span-1 flex flex-col">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CryptoVision</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced cryptocurrency price predictions powered by AI. Track, analyze and forecast with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Product Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                  Product
                </h3>
                <ul role="list" className="space-y-2">
                  {['Market', 'Predictions', 'Portfolio', 'Dashboard'].map((item) => (
                    <li key={item}>
                      <Link 
                        to={`/${item.toLowerCase()}`} 
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Resources Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                  Resources
                </h3>
                <ul role="list" className="space-y-2">
                  {['News', 'Blog', 'API', 'Help Center'].map((item) => (
                    <li key={item}>
                      <Link 
                        to={item === 'API' || item === 'Help Center' ? '#' : `/${item.toLowerCase()}`} 
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Company Links */}
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                  Company
                </h3>
                <ul role="list" className="space-y-2">
                  {['About', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                    <li key={item}>
                      <Link 
                        to="#" 
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} CryptoVision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
