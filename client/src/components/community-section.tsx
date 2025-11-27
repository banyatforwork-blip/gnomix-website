import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Github, Heart, Users, ExternalLink } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Button } from "@/components/ui/button";

const communityLinks = [
  {
    title: "Join Discord",
    description: "Chat with the community, get support, and stay updated",
    icon: SiDiscord,
    url: "https://discord.gg/RHS3NptNpc",
    gradient: "from-indigo-500 to-purple-500",
    members: "50~ members",
  },
  {
    title: "GitHub",
    description: "Contribute code, report bugs, and track development",
    icon: Github,
    url: "https://github.com/gnomixperson/gnomix_script/",
    gradient: "from-gray-600 to-gray-800",
    members: "2 contributors",
  },
];

const contributions = [
  { icon: MessageCircle, label: "Report Bugs", description: "Help us improve" },
  { icon: Github, label: "Code", description: "Submit PRs" },
  { icon: Heart, label: "Spread Word", description: "Share Gnomix" },
  { icon: Users, label: "Community", description: "Help others" },
];

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative py-24 md:py-32 lg:py-40"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, hsl(217, 91%, 60%) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
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
            <Users className="w-4 h-4" />
            Community
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Join Our <span className="gradient-text">Community</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with other Gnomix users, get support, and stay updated on
            development
          </p>
        </motion.div>

        {/* Community links */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {communityLinks.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative block"
              data-testid={`link-community-${link.title.toLowerCase().replace(" ", "-")}`}
            >
              <motion.div
                className="relative glass-strong rounded-3xl p-6 md:p-8 overflow-hidden h-full"
                whileHover={{ scale: 1.01, y: -3 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative flex items-start gap-4">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center flex-shrink-0`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <link.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{link.title}</h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {link.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-primary">
                      <Users className="w-4 h-4" />
                      {link.members}
                    </div>
                  </div>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "150%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Ways to contribute */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <h3 className="text-xl font-bold mb-6 text-center">
            Ways to Contribute
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contributions.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass rounded-xl p-4 text-center group hover:bg-white/5 transition-colors"
                whileHover={{ y: -3 }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="rounded-2xl px-8 py-6 text-lg font-semibold gap-3 glow"
              asChild
              data-testid="button-join-discord"
            >
              <a
                href="https://discord.gg/RHS3NptNpc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiDiscord className="w-5 h-5" />
                Join Discord Server
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
