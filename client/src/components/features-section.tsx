import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Shield,
  Palette,
  Zap,
  Package,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "One-Command Setup",
    description:
      "Run a single script and transform your Ubuntu system. Automated, safe, and easy. Takes just a few minutes.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Shield,
    title: "Snap & Bloat Removal",
    description:
      "Automatically removes Snap packages, Ubuntu modifications, and unwanted services for a cleaner system.",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: Palette,
    title: "Pure GNOME Experience",
    description:
      "Gets you vanilla GNOME without Yaru themes or Canonical customizations. Clean, minimalist, beautiful.",
    gradient: "from-orange-500 to-red-400",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    description:
      "Removes bloatware and unnecessary services so your system runs faster and uses less resources.",
    gradient: "from-yellow-500 to-orange-400",
  },
  {
    icon: Package,
    title: "Full APT & Flatpak Support",
    description:
      "Keep Ubuntu's vast package ecosystem. Install anything from APT repos, PPAs, or Flatpak without issues.",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: RefreshCw,
    title: "Fully Reversible",
    description:
      "The script is non-destructive. Your data stays safe, and changes can be managed as needed.",
    gradient: "from-indigo-500 to-blue-400",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)" });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      data-testid={`card-feature-${index}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...tiltStyle, transition: "transform 0.2s ease-out" }}
    >
      <div className="relative h-full glass-strong rounded-3xl p-6 md:p-8 overflow-hidden border border-white/10" style={{ ...tiltStyle, transition: "transform 0.2s ease-out" }}>
        {/* Animated border gradient on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className={`absolute inset-[-2px] rounded-3xl bg-gradient-to-br ${feature.gradient} blur-sm opacity-30`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <feature.icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-xl font-bold mb-3"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {feature.description}
          </motion.p>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
          initial={{ x: "-150%" }}
          whileHover={{ x: "150%" }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6"
          >
            Why Gnomix?
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">Gnomix</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            All the power of Ubuntu. All the beauty of pure GNOME. In one simple script.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
