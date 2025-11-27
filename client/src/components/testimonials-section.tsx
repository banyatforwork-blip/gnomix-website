import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Software Developer",
    content:
      "Finally! I can run pure KDE Plasma on Ubuntu with zero bloat. The Gnomix script transformed my workflow completely. One command and I have exactly the desktop I wanted.",
    rating: 5,
    initials: "AC",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "2",
    name: "Sarah Miller",
    role: "UX Designer",
    content:
      "What impressed me most is the choice. I can pick any desktop environment I want—from GNOME's minimalism to KDE's power. Gnomix respects what I actually need, not what Canonical thinks I should use.",
    rating: 5,
    initials: "SM",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    role: "System Administrator",
    content:
      "Perfect for enterprise deployments. I can customize Ubuntu for different teams—XFCE for lightweight machines, KDE for power users, GNOME for everyone else. Gnomix handles it all seamlessly.",
    rating: 5,
    initials: "MJ",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    role: "Open Source Contributor",
    content:
      "The fact that Gnomix supports multiple desktop environments while staying completely open-source and telemetry-free is incredible. This is what Linux should be—user choice, respect for privacy.",
    rating: 5,
    initials: "ER",
    gradient: "from-orange-500 to-red-400",
  },
  {
    id: "5",
    name: "David Park",
    role: "Full Stack Developer",
    content:
      "Switched from stock Ubuntu to Gnomix with XFCE for my old laptop. It's lightning-fast now. My newer machine runs Gnomix with KDE Plasma. One tool, infinite possibilities.",
    rating: 5,
    initials: "DP",
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    id: "6",
    name: "chichbo",
    role: "Website Designer",
    content:
      "My mom is kinda homeless 🙏, but at least she has a Linux laptop that runs fast with Gnomix 💀. Love supporting open-source projects that just work.",
    rating: 5,
    initials: "CB",
    gradient: "from-rose-500 to-fuchsia-400",
  },
];

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`glass-strong rounded-3xl p-6 md:p-8 transition-all duration-500 ${
        isActive ? "shadow-glass-lg" : ""
      }`}
      data-testid={`testimonial-card-${testimonial.id}`}
    >
      {/* Quote icon */}
      <div className="mb-6">
        <motion.div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Quote className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <p className="text-lg leading-relaxed mb-6">{testimonial.content}</p>

      {/* Author */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <Avatar className="w-12 h-12">
            <AvatarFallback
              className={`bg-gradient-to-br ${testimonial.gradient} text-white font-semibold`}
            >
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        <div>
          <div className="font-semibold">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToPrev = () => {
    setAutoPlay(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
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
            <Star className="w-4 h-4" />
            Testimonials
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Loved by <span className="gradient-text">Users</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our community has to say about Gnomix
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrev}
              className="glass-button rounded-xl -translate-x-4"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="glass-button rounded-xl translate-x-4"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Cards container */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={testimonials[currentIndex].id}
                testimonial={testimonials[currentIndex]}
                isActive={true}
              />
            </AnimatePresence>
          </div>

          {/* Mobile navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrev}
              className="glass-button rounded-xl"
              data-testid="button-testimonial-prev-mobile"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="glass-button rounded-xl"
              data-testid="button-testimonial-next-mobile"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-white/20 w-2 hover:bg-white/40"
                }`}
                data-testid={`button-testimonial-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
