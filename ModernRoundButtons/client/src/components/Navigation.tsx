import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Moon, Sun, Menu, X, Star, BookOpen, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "./ThemeProvider";

interface NavigationProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onOpenAI: () => void;
}

export function Navigation({ onSearch, searchQuery, onOpenAI }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/subjects", label: "Matières", icon: BookOpen },
    { path: "/favorites", label: "Favoris", icon: Star },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              data-testid="link-home-logo"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-french-blue via-white to-french-red shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-french-blue font-bold text-lg">C</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-lg leading-tight bg-gradient-to-r from-french-blue to-french-red bg-clip-text text-transparent">
                  CLEM
                </span>
                <span className="text-xs text-muted-foreground leading-none">
                  by Clément Caillot
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path || 
                (item.path !== "/" && location.startsWith(item.path));
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="rounded-full gap-2"
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher dans le programme..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 rounded-full border-input/50 focus:border-primary transition-colors"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hidden md:flex bg-gradient-to-r from-french-blue to-french-red text-white hover:opacity-90"
              onClick={onOpenAI}
              data-testid="button-open-ai"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden relative overflow-hidden group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-french-blue via-white to-french-red opacity-20 group-hover:opacity-40 transition-opacity" />
              {mobileMenuOpen ? (
                <X className="w-5 h-5 relative z-10" />
              ) : (
                <Menu className="w-5 h-5 relative z-10" />
              )}
            </Button>
          </div>
        </div>

        <div className="sm:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 rounded-full border-input/50 focus:border-primary transition-colors"
              data-testid="input-search-mobile"
            />
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top-2 duration-200">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path || 
                (item.path !== "/" && location.startsWith(item.path));
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start rounded-full gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-nav-mobile-${item.label.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <Button
              variant="outline"
              className="w-full justify-start rounded-full gap-3 bg-gradient-to-r from-french-blue/10 to-french-red/10 border-french-blue/30"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              data-testid="button-open-ai-mobile"
            >
              <MessageCircle className="w-5 h-5 text-french-blue" />
              Assistant IA
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
