import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Download, Users, Star, GitBranch, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Stats } from "@shared/schema";

const statConfig = [
  {
    key: "downloads" as const,
    icon: Download,
    label: "Downloads",
    suffix: "+",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    key: "communityMembers" as const,
    icon: Users,
    label: "Community Members",
    suffix: "+",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    key: "githubStars" as const,
    icon: Star,
    label: "GitHub Stars",
    suffix: "",
    gradient: "from-yellow-500 to-orange-400",
  },
  {
    key: "contributors" as const,
    icon: GitBranch,
    label: "Contributors",
    suffix: "",
    gradient: "from-green-500 to-emerald-400",
  },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && value > 0) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setDisplayValue(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatCard({
  stat,
  value,
  index,
  isInView,
  isLoading,
}: {
  stat: (typeof statConfig)[0];
  value: number;
  index: number;
  isInView: boolean;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      data-testid={`stat-card-${index}`}
    >
      <motion.div
        className="relative glass rounded-3xl p-6 md:p-8 text-center overflow-hidden"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Icon */}
        <motion.div
          className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <stat.icon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Value */}
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {isLoading ? (
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-muted-foreground" />
          ) : (
            <AnimatedCounter
              value={value}
              suffix={stat.suffix}
              isInView={isInView}
            />
          )}
        </div>

        {/* Label */}
        <div className="text-muted-foreground font-medium">{stat.label}</div>

        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const defaultStats: Stats = {
    downloads: 0,
    communityMembers: 0,
    githubStars: 0,
    contributors: 0,
  };

  const currentStats = stats || defaultStats;

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Growing <span className="gradient-text">Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who have chosen Gnomix for a pure GNOME
            experience.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statConfig.map((stat, index) => (
            <StatCard
              key={stat.key}
              stat={stat}
              value={currentStats[stat.key]}
              index={index}
              isInView={isInView}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
