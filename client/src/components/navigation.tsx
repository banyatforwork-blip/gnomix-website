import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Github, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import gnomixLogo from "@assets/IMG_0118_1764222140510.webp";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Download", href: "#download" },
  { name: "FAQ", href: "#faq" },
  { name: "Community", href: "#community" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden w-full"
      >
        <div className="glass-strong rounded-2xl shadow-glass-lg mx-2 mt-4 md:mx-8 lg:mx-16">
          <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 md:h-20 gap-1 min-w-0">
              {/* Logo */}
              <motion.a
                href="#"
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="link-logo"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                  <img 
                    src={gnomixLogo} 
                    alt="Gnomix Logo" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm sm:text-lg md:text-xl font-bold tracking-tight">
                  <span className="gradient-text">Gnomix</span>
                </span>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid={`link-nav-${link.name.toLowerCase()}`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100"
                      layoutId="navHover"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-3">
                <ThemeToggle />
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-button rounded-xl"
                  asChild
                  data-testid="button-github"
                >
                  <a
                    href="https://github.com/gnomixperson/gnomix_script/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </Button>

                <Button
                  className="glass-button rounded-xl gap-2 px-4 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                  asChild
                  data-testid="button-nav-download"
                >
                  <a href="#download">
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="glass-button rounded-xl"
                  data-testid="button-mobile-menu"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-20 left-2 right-2 z-50 glass-strong rounded-2xl p-3 max-h-[calc(100vh-100px)] overflow-y-auto w-[calc(100vw-16px)]"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-white/5 transition-colors tap-effect"
                    data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                  >
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                ))}

                <div className="h-px bg-border my-2" />

                <motion.a
                  href="https://github.com/gubuntu-dev-icebear/Gubuntu"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-white/5 transition-colors tap-effect"
                  data-testid="link-mobile-github"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">GitHub</span>
                </motion.a>

                <motion.a
                  href="https://discord.gg/RHS3NptNpc"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-white/5 transition-colors tap-effect"
                  data-testid="link-mobile-discord"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Discord</span>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-2"
                >
                  <Button className="w-full rounded-xl gap-2" asChild data-testid="button-mobile-download">
                    <a href="#download">
                      <Download className="w-4 h-4" />
                      Download Gnomix
                    </a>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
