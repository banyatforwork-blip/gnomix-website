import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Minus, Scale } from "lucide-react";
import gnomixLogo from "@assets/IMG_0118_1764222140510.webp";

const comparisonData = [
  {
    feature: "Desktop Environment",
    gnomix: "Stock GNOME",
    ubuntu: "Modified GNOME",
    stockGnome: "Stock GNOME",
  },
  {
    feature: "Theme",
    gnomix: "Adwaita (Default)",
    ubuntu: "Yaru Theme",
    stockGnome: "Adwaita (Default)",
  },
  {
    feature: "Snap Packages",
    gnomix: false,
    ubuntu: true,
    stockGnome: false,
  },
  {
    feature: "Flatpak Support",
    gnomix: true,
    ubuntu: "Manual Install",
    stockGnome: true,
  },
  {
    feature: "APT Packages",
    gnomix: true,
    ubuntu: true,
    stockGnome: "Varies",
  },
  {
    feature: "Telemetry",
    gnomix: false,
    ubuntu: "Optional",
    stockGnome: false,
  },
  {
    feature: "Ubuntu PPAs",
    gnomix: true,
    ubuntu: true,
    stockGnome: false,
  },
  {
    feature: "Canonical Modifications",
    gnomix: false,
    ubuntu: true,
    stockGnome: false,
  },
  {
    feature: "Release Cycle",
    gnomix: "Following Ubuntu",
    ubuntu: "6 Months / LTS",
    stockGnome: "6 Months",
  },
  {
    feature: "Community Support",
    gnomix: "Discord / GitHub",
    ubuntu: "Large Community",
    stockGnome: "GNOME Community",
  },
];

function ValueCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
      >
        <Check className="w-4 h-4 text-green-400" />
      </motion.div>
    ) : (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center"
      >
        <X className="w-4 h-4 text-red-400" />
      </motion.div>
    );
  }

  return (
    <span className="text-sm text-muted-foreground">{value}</span>
  );
}

export function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6"
          >
            <Scale className="w-4 h-4" />
            Comparison
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            How Gnomix <span className="gradient-text">Compares</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how Gnomix stacks up against Ubuntu and stock GNOME
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-3xl overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-4 gap-4 p-4 md:p-6 border-b border-white/10 bg-white/5">
            <div className="font-semibold text-muted-foreground">Feature</div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full">
                <div className="w-5 h-5 rounded-md overflow-hidden">
                  <img src={gnomixLogo} alt="Gnomix" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-sm">Gnomix</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full">
                <div className="w-5 h-5 rounded-full bg-orange-500" />
                <span className="font-semibold text-sm">Ubuntu</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full">
                <div className="w-5 h-5 rounded-full bg-blue-400" />
                <span className="font-semibold text-sm hidden sm:inline">Stock GNOME</span>
                <span className="font-semibold text-sm sm:hidden">GNOME</span>
              </div>
            </div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-white/5">
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="grid grid-cols-4 gap-4 p-4 md:p-6 items-center hover:bg-white/5 transition-colors"
                data-testid={`comparison-row-${index}`}
              >
                <div className="font-medium text-sm md:text-base">
                  {row.feature}
                </div>
                <div className="flex justify-center">
                  <ValueCell value={row.gnomix} />
                </div>
                <div className="flex justify-center">
                  <ValueCell value={row.ubuntu} />
                </div>
                <div className="flex justify-center">
                  <ValueCell value={row.stockGnome} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground">
            Gnomix gives you the best of both worlds:{" "}
            <span className="text-foreground font-medium">
              Ubuntu's stability
            </span>{" "}
            with{" "}
            <span className="text-foreground font-medium">
              pure GNOME experience
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
