import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import gnomixLogo from "@assets/IMG_0118_1764222140510.webp";

const desktopEnvironments = [
  {
    name: "GNOME Desktop Experience",
    title: "Pure GNOME",
    description: "Gets you vanilla GNOME without Yaru themes or Canonical customizations. Clean, minimalist, beautiful.",
  },
  {
    name: "KDE Plasma",
    title: "Pure KDE Plasma",
    description: "Gets you vanilla KDE Plasma without Ubuntu modifications. Powerful, customizable, incredibly sleek.",
  },
  {
    name: "XFCE Desktop",
    title: "Pure XFCE",
    description: "Gets you vanilla XFCE without Ubuntu bloat. Lightweight, lightning-fast, efficient.",
  },
  {
    name: "Cinnamon Desktop",
    title: "Pure Cinnamon",
    description: "Gets you vanilla Cinnamon without Ubuntu customizations. Smooth, intuitive, polished.",
  },
  {
    name: "MATE Desktop",
    title: "Pure MATE",
    description: "Gets you vanilla MATE without Ubuntu modifications. Stable, traditional, reliable.",
  },
];

export function HeroSection() {
  const [currentDEIndex, setCurrentDEIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDEIndex((prev) => (prev + 1) % desktopEnvironments.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToFeatures = () => {
    const target = document.querySelector("#features");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating glass shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 glass rounded-full opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 glass rounded-3xl opacity-15"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 glass rounded-2xl opacity-10"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-8 text-center overflow-x-hidden">
        {/* Beta badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 md:mb-8"
        >
          <motion.div
            className="glass px-4 py-2 rounded-full inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-muted-foreground">
              Beta - Active Development
            </span>
          </motion.div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 md:mb-6"
        >
          <span className="block">Transform Ubuntu</span>
          <span className="block mt-2">
            Into <span className="relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentDEIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="gradient-text inline-block"
                >
                  {desktopEnvironments[currentDEIndex].title}
                </motion.span>
              </AnimatePresence>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.path
                  d="M 0 6 Q 50 0, 100 6 T 200 6"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                    <stop offset="50%" stopColor="hsl(271, 70%, 55%)" />
                    <stop offset="100%" stopColor="hsl(320, 80%, 55%)" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </span>
        </motion.h1>

        {/* You Choose tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-primary font-semibold mb-6 tracking-wide"
        >
          You Choose Your Desktop
        </motion.p>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 text-balance">
          {desktopEnvironments[currentDEIndex].description}
        </p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { icon: Sparkles, text: "Pure & Clean" },
            { icon: Shield, text: "One Command" },
            { icon: Zap, text: "Lightning Fast" },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="glass px-4 py-2 rounded-full flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="rounded-2xl px-8 py-6 text-lg font-semibold gap-3 glow hover:shadow-glow-lg transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
              asChild
              data-testid="button-hero-download"
            >
              <a href="#download">
                <Download className="w-5 h-5" />
                Get Started
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="lg"
              className="glass rounded-2xl px-8 py-6 text-lg font-semibold border-white/10 hover:bg-white/5 dark:border-white/10 dark:hover:bg-white/5 light:border-black/10 light:hover:bg-black/5"
              onClick={handleScrollToFeatures}
              data-testid="button-hero-learn-more"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Desktop preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative mt-16 md:mt-24 overflow-hidden"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Glow effect behind the mockup */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 blur-3xl opacity-50 rounded-3xl" />
            
            {/* Desktop mockup frame */}
            <motion.div
              className="relative glass-strong rounded-3xl p-2 md:p-3 shadow-glass-lg"
              transition={{ duration: 0.3 }}
            >
              {/* Browser top bar */}
              <div className="relative flex items-center justify-center px-4 py-3 border-b border-white/10">
                <div className="absolute left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="glass px-4 py-1 rounded-lg text-xs text-muted-foreground font-mono">
                  gnomix.linkpc.net
                </div>
              </div>

              {/* Screenshot area */}
              <div className="relative aspect-video bg-gradient-to-br from-background via-card to-background rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden">
                      <img 
                        src={gnomixLogo} 
                        alt="Gnomix Logo" 
                        className="w-full object-cover"
                      />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={currentDEIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-muted-foreground"
                      >
                        {desktopEnvironments[currentDEIndex].name}
                      </motion.p>
                    </AnimatePresence>
                    <div className="flex justify-center gap-4">
                      <div className="glass px-3 py-1 rounded-lg text-xs">Files</div>
                      <div className="glass px-3 py-1 rounded-lg text-xs">Terminal</div>
                      <div className="glass px-3 py-1 rounded-lg text-xs">Settings</div>
                    </div>
                  </div>
                </div>

                {/* Animated overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={handleScrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-scroll-down"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
