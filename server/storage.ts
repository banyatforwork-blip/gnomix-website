import { randomUUID } from "crypto";
import type {
  Download,
  DownloadStat,
  FAQ,
  Feature,
  Testimonial,
  SystemRequirement,
  Stats,
} from "@shared/schema";

export interface IStorage {
  // Stats
  getStats(): Promise<Stats>;
  incrementDownloads(): Promise<Stats>;
  
  // Downloads
  getDownloads(): Promise<Download[]>;
  getLatestDownload(): Promise<Download | undefined>;
  
  // FAQs
  getFAQs(): Promise<FAQ[]>;
  
  // Features
  getFeatures(): Promise<Feature[]>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  
  // System Requirements
  getSystemRequirements(): Promise<SystemRequirement[]>;
}

export class MemStorage implements IStorage {
  private stats: Stats;
  private downloads: Download[];
  private faqs: FAQ[];
  private features: Feature[];
  private testimonials: Testimonial[];
  private systemRequirements: SystemRequirement[];

  constructor() {
    // Initialize with default data
    this.stats = {
      downloads: 8547,
      communityMembers: 50,
      githubStars: 463,
      contributors: 2,
    };

    this.downloads = [
      {
        id: "1",
        version: "v1.0.0",
        filename: "gnomix.sh",
        size: "~2 MB",
        releaseDate: "November 5, 2025",
        downloadUrl: "https://github.com/gnomixperson/gnomix_script/releases",
        sourceforgeUrl: "https://github.com/gnomixperson/gnomix_script/",
        githubUrl: "https://github.com/gnomixperson/gnomix_script/",
        checksum: "sha256:8f3d2c1b4a5e9f6c7d8e9a0b1c2d3e4f5a6b7c8d9e0a1b2c3d4e5f6a7b8c9d",
        isBeta: true,
      },
    ];

    this.faqs = [
      {
        id: "1",
        question: "What is Gnomix?",
        answer: "Gnomix is an Ubuntu-based Linux distribution that provides a pure, stock GNOME desktop experience. It removes Canonical's modifications, custom themes, and the Snap ecosystem to give you vanilla GNOME exactly as upstream intended.",
        category: "General",
      },
      {
        id: "2",
        question: "Why choose Gnomix over Ubuntu?",
        answer: "If you prefer the stock GNOME experience without Ubuntu's Yaru theme, Snap packages, and other Canonical modifications, Gnomix is for you. It offers a cleaner, more upstream-aligned GNOME while maintaining Ubuntu's stability and package ecosystem.",
        category: "General",
      },
      {
        id: "3",
        question: "Is Gnomix stable for daily use?",
        answer: "Gnomix is currently in beta and is actively developed. While many users run it as their daily driver, we recommend backing up important data and being prepared for potential issues. Stability improves with each release.",
        category: "Usage",
      },
      {
        id: "4",
        question: "How do I install Gnomix?",
        answer: "Download the ISO, create a bootable USB drive using Balena Etcher or Ventoy, boot from the USB, and follow the graphical installer. The process is similar to installing Ubuntu.",
        category: "Installation",
      },
      {
        id: "5",
        question: "Can I still use Ubuntu packages and PPAs?",
        answer: "Yes! Gnomix is fully compatible with Ubuntu's APT repositories and PPAs. You can install any software that works on Ubuntu. Additionally, Flatpak is available for sandboxed application installation.",
        category: "Usage",
      },
      {
        id: "6",
        question: "How often are updates released?",
        answer: "We release updates regularly, typically following major GNOME releases and important security patches. Beta releases may be more frequent as we work toward a stable release.",
        category: "Updates",
      },
    ];

    this.features = [
      {
        id: "1",
        title: "Stock GNOME",
        description: "Pure GNOME desktop environment, exactly as upstream intended. No modifications, no compromises.",
        icon: "Sparkles",
      },
      {
        id: "2",
        title: "Snap-Free",
        description: "Built on Ubuntu's solid foundation, minus the Snap ecosystem. No snap store, no telemetry.",
        icon: "Shield",
      },
      {
        id: "3",
        title: "No Ubuntu Themes",
        description: "Clean, vanilla GNOME aesthetics. Experience GNOME the way it was designed to look and feel.",
        icon: "Palette",
      },
      {
        id: "4",
        title: "Active Development",
        description: "Currently in beta and actively maintained. Regular updates bringing the latest GNOME improvements.",
        icon: "RefreshCw",
      },
    ];

    this.testimonials = [
      {
        id: "1",
        name: "Alex Chen",
        role: "Software Developer",
        content: "Finally, a distro that gives me stock GNOME without having to build it myself. Gnomix is exactly what I've been looking for.",
        avatar: undefined,
      },
      {
        id: "2",
        name: "Sarah Miller",
        role: "UX Designer",
        content: "As a designer, I appreciate the attention to detail in keeping GNOME pure. No unnecessary theme modifications.",
        avatar: undefined,
      },
      {
        id: "3",
        name: "Marcus Johnson",
        role: "System Administrator",
        content: "Switched from Ubuntu after years of removing Snaps manually. Gnomix saves me hours of configuration time.",
        avatar: undefined,
      },
    ];

    this.systemRequirements = [
      {
        id: "1",
        category: "Processor",
        requirement: "2 GHz dual-core",
        recommended: "2 GHz quad-core or better",
      },
      {
        id: "2",
        category: "Memory",
        requirement: "4 GB RAM",
        recommended: "8 GB RAM or more",
      },
      {
        id: "3",
        category: "Storage",
        requirement: "25 GB",
        recommended: "50 GB or more",
      },
      {
        id: "4",
        category: "Display",
        requirement: "1024×768",
        recommended: "1920×1080 or higher",
      },
    ];
  }

  async getStats(): Promise<Stats> {
    return this.stats;
  }

  async incrementDownloads(): Promise<Stats> {
    this.stats.downloads++;
    return this.stats;
  }

  async getDownloads(): Promise<Download[]> {
    return this.downloads;
  }

  async getLatestDownload(): Promise<Download | undefined> {
    return this.downloads[0];
  }

  async getFAQs(): Promise<FAQ[]> {
    return this.faqs;
  }

  async getFeatures(): Promise<Feature[]> {
    return this.features;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  async getSystemRequirements(): Promise<SystemRequirement[]> {
    return this.systemRequirements;
  }
}

export const storage = new MemStorage();
