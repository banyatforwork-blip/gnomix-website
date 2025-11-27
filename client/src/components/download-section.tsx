import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Download,
  ExternalLink,
  HardDrive,
  Cpu,
  MemoryStick,
  Monitor,
  Check,
  Copy,
  FileDown,
  Github,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Download as DownloadType, Stats } from "@shared/schema";

const requirements = [
  { icon: Cpu, label: "Processor", value: "2 GHz dual-core or better" },
  { icon: MemoryStick, label: "Memory", value: "4 GB RAM (8 GB recommended)" },
  { icon: HardDrive, label: "Storage", value: "25 GB available disk space" },
  { icon: Monitor, label: "Display", value: "1024x768 resolution or higher" },
];

export function DownloadSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const { data: latestDownload, isLoading } = useQuery<DownloadType>({
    queryKey: ["/api/downloads/latest"],
  });

  const trackDownload = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/stats/download");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const handleDownload = () => {
    trackDownload.mutate();
  };

  const copyChecksum = () => {
    if (latestDownload?.checksum) {
      navigator.clipboard.writeText(latestDownload.checksum);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentRelease = latestDownload || {
    version: "v1.0.0",
    size: "~2 MB",
    arch: "All Systems",
    checksum: "sha256:8f3d2c1b4a5e9f6c7d8e9a0b1c2d3e4f5a6b7c8d9e0a1b2c3d4e5f6a7b8c9d",
    releaseDate: "November 5, 2025",
    downloadUrl: "https://github.com/gnomixperson/gnomix_script/releases",
    githubUrl: "https://github.com/gnomixperson/gnomix_script/",
  };

  return (
    <section
      ref={sectionRef}
      id="download"
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 overflow-x-hidden">
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
            className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6"
          >
            Get Started
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Get <span className="gradient-text">Gnomix</span> Running
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Run the Gnomix customizer script to instantly transform your Ubuntu system into pure GNOME.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
          {/* Download card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full min-w-0"
          >
            <motion.div
              className="relative glass-strong rounded-2xl p-2 sm:p-4 md:p-8 w-full border border-white/10"
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

              {/* Header */}
              <div className="relative flex items-center justify-between gap-1 mb-3 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <motion.div
                    className="w-8 sm:w-12 h-8 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileDown className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-lg truncate">Gnomix Beta</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      Latest Release
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                  Beta
                </Badge>
              </div>

              {/* Version info */}
              <div className="relative space-y-2 sm:space-y-4 mb-3 sm:mb-8">
                {isLoading ? (
                  <div className="glass rounded-xl p-4 flex items-center justify-center h-32">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    <div className="glass rounded-lg sm:rounded-xl p-2 sm:p-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          Version
                        </span>
                        <span className="font-mono text-xs sm:text-sm truncate">
                          {currentRelease.version}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          Size
                        </span>
                        <span className="font-mono text-xs sm:text-sm">
                          {currentRelease.size}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          Architecture
                        </span>
                        <span className="font-mono text-xs sm:text-sm">
                          AMD64
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          Release Date
                        </span>
                        <span className="font-mono text-xs sm:text-sm truncate">
                          {currentRelease.releaseDate}
                        </span>
                      </div>
                    </div>

                    {/* Checksum */}
                    <div className="glass rounded-lg sm:rounded-xl p-2 sm:p-4">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs sm:text-sm text-muted-foreground truncate">
                          SHA256
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyChecksum}
                          className="h-6 sm:h-8 px-1 sm:px-2"
                          data-testid="button-copy-checksum"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Check className="w-4 h-4 text-green-400" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Copy className="w-4 h-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </div>
                      <p className="font-mono text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
                        {currentRelease.checksum}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Download buttons */}
              <div className="relative space-y-3">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <Button
                    size="sm"
                    className="w-full rounded-lg sm:rounded-xl gap-1 sm:gap-2 md:gap-3 py-2 sm:py-4 md:py-6 text-xs sm:text-sm md:text-lg font-semibold glow bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                    onClick={handleDownload}
                    asChild
                    data-testid="button-download-github"
                  >
                    <a
                      href={currentRelease.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-2 md:gap-3 w-full"
                    >
                      <Download className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
                      <span className="hidden sm:inline truncate">Download from GitHub</span>
                      <span className="sm:hidden">Download</span>
                      <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 ml-auto opacity-60 flex-shrink-0" />
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-lg sm:rounded-xl gap-1 sm:gap-2 md:gap-3 py-2 sm:py-4 md:py-6 text-xs sm:text-sm md:text-lg border-white/10 hover:bg-white/5 dark:border-white/10 dark:hover:bg-white/5 light:border-black/10 light:hover:bg-black/5"
                    asChild
                    data-testid="button-view-github"
                  >
                    <a
                      href={currentRelease.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-2 md:gap-3 w-full"
                    >
                      <Github className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
                      <span className="hidden sm:inline truncate">View on GitHub</span>
                      <span className="sm:hidden">GitHub</span>
                      <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 ml-auto opacity-60 flex-shrink-0" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* System requirements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full min-w-0"
          >
            <div className="glass-strong rounded-2xl p-2 sm:p-4 md:p-8 w-full border border-white/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                System Requirements
              </h3>

              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <motion.div
                    key={req.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="glass rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <req.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-muted-foreground">
                        {req.label}
                      </div>
                      <div className="font-medium truncate">{req.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Installation tip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">Tip:</span> Run the script with <span className="font-mono">bash gnomix.sh</span> to transform your Ubuntu system into pure GNOME.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
