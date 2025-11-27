import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const faqs = [
  {
    question: "What is Gnomix?",
    answer:
      "Gnomix is a powerful customization script that transforms your Ubuntu system into a pure, vanilla desktop environment. It strips away Canonical modifications, Snap packages, and bloatware—giving you your choice of GNOME, KDE Plasma, XFCE, Cinnamon, MATE, or any desktop environment exactly as intended. No compromises, just beautiful Linux.",
    category: "General",
  },
  {
    question: "Which desktop environments does Gnomix support?",
    answer:
      "Gnomix currently supports GNOME, KDE Plasma, XFCE, Cinnamon, and MATE. You choose which desktop environment you want during installation. More environments may be added in the future.",
    category: "General",
  },
  {
    question: "Why use Gnomix instead of stock Ubuntu?",
    answer:
      "Gnomix gives you the performance and clean design of stock desktop environments without Ubuntu's Yaru theme, Snap ecosystem, and unwanted services. You get a faster, leaner system while keeping full access to Ubuntu's extensive software ecosystem.",
    category: "General",
  },
  {
    question: "Do I need to reinstall my system to use Gnomix?",
    answer:
      "No! Gnomix works on an existing Ubuntu installation. Just run the script and your system is transformed. All your files, settings, and installed applications remain intact.",
    category: "Installation",
  },
  {
    question: "How do I install and run Gnomix?",
    answer:
      "Download the script from GitHub and run it with: `bash gnomix.sh`. The script handles everything automatically—removes Snap, installs your chosen desktop environment, removes Ubuntu customizations, and optimizes your system. Takes 5-10 minutes.",
    category: "Installation",
  },
  {
    question: "Is Gnomix safe to use?",
    answer:
      "Yes! The Gnomix script is non-destructive and only removes packages and services. It never touches your personal files or data. We recommend backing up your system first as a precaution with any significant changes.",
    category: "Safety",
  },
  {
    question: "Can I still use Ubuntu packages and PPAs?",
    answer:
      "Yes! 100% compatible. Gnomix keeps Ubuntu's full APT repository and PPAs intact. Install anything you want normally. Flatpak and Snap (if desired) are also available for sandboxed applications.",
    category: "Usage",
  },
  {
    question: "Can I undo the changes or switch desktop environments?",
    answer:
      "The script doesn't delete system files, just removes and installs packages. You can reinstall any removed packages anytime with `apt install`, or run the script again to switch to a different desktop environment.",
    category: "Safety",
  },
  {
    question: "Does Gnomix collect any data?",
    answer:
      "No telemetry, no tracking, no data collection—ever. The script is fully open-source on GitHub. Your privacy and system control are paramount.",
    category: "Privacy",
  },
  {
    question: "How can I contribute or get support?",
    answer:
      "Visit our GitHub repository to report bugs, suggest features, or contribute code. Join our Discord community to connect with other users, share feedback, and get support.",
    category: "Community",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
      data-testid={`faq-item-${index}`}
    >
      <motion.button
        onClick={onToggle}
        className="w-full glass rounded-2xl p-5 md:p-6 text-left transition-all duration-300 hover:bg-white/5"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        data-testid={`button-faq-${index}`}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            FAQ
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Gnomix
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass rounded-xl pl-12 h-14 text-lg border-white/10 focus:border-primary/50"
            data-testid="input-faq-search"
          />
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No questions found matching "{searchQuery}"
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
