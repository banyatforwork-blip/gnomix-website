import { motion } from "framer-motion";
import { Github, Heart } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import gnomixLogo from "@assets/IMG_0118_1764222140510.webp";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Download", href: "#download" },
    { name: "FAQ", href: "#faq" },
  ],
  community: [
    { name: "Discord", href: "https://discord.gg/RHS3NptNpc", external: true },
    {
      name: "GitHub",
      href: "https://github.com/gnomixperson/gnomix_script/",
      external: true,
    },
    { name: "Contribute", href: "#community" },
  ],
  resources: [
    { name: "Release Notes", href: "#download" },
    { name: "System Requirements", href: "#download" },
    { name: "Open Source", href: "https://github.com/gnomixperson/gnomix_script/", external: true },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/gnomixperson/gnomix_script/",
  },
  {
    name: "Discord",
    icon: SiDiscord,
    href: "https://discord.gg/RHS3NptNpc",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-12 md:py-16 overflow-x-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <motion.a
              href="#"
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
              data-testid="link-footer-logo"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img 
                  src={gnomixLogo} 
                  alt="Gnomix Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold gradient-text">Gnomix</span>
            </motion.a>
            <p className="text-sm text-muted-foreground mb-4">
              Transform Ubuntu into pure GNOME with one command. Clean, fast, minimal.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`link-footer-social-${link.name.toLowerCase()}`}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => !link.external && handleNavClick(e, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => !link.external && handleNavClick(e, link.href)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Credits</h4>
            <p className="text-sm text-muted-foreground">
              Website designed & built by{" "}
              <motion.a
                href="https://github.com/chichbo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
              >
                @chichbo
              </motion.a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Gnomix. Released under MIT License.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>{" "}
              by the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
