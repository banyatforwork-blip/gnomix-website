import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    id: "1",
    title: "Clean Desktop",
    description: "Pure GNOME desktop with Activities overview",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "2",
    title: "File Manager",
    description: "Nautilus file manager with clean interface",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "3",
    title: "System Settings",
    description: "GNOME Settings without Ubuntu modifications",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "4",
    title: "App Grid",
    description: "Application launcher with stock GNOME style",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "5",
    title: "Terminal",
    description: "GNOME Terminal with dark theme",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    id: "6",
    title: "Workspaces",
    description: "Dynamic workspaces for better productivity",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
];

function GalleryCard({
  image,
  index,
  onClick,
  isInView,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  onClick: () => void;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onClick={onClick}
      data-testid={`gallery-card-${index}`}
    >
      <motion.div
        className="relative aspect-video glass rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Placeholder image with gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${image.gradient}`}
        />

        {/* Placeholder content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/10 flex items-center justify-center">
              <Images className="w-8 h-8 text-white/60" />
            </div>
            <p className="text-sm font-medium text-white/80">{image.title}</p>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Maximize2 className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Caption */}
      <div className="mt-3 px-1">
        <h4 className="font-medium text-sm">{image.title}</h4>
        <p className="text-xs text-muted-foreground">{image.description}</p>
      </div>
    </motion.div>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 glass-button rounded-xl"
        onClick={onClose}
        data-testid="button-close-lightbox"
      >
        <X className="w-5 h-5" />
      </Button>

      {/* Navigation */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-10 glass-button rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        data-testid="button-lightbox-prev"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-10 glass-button rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        data-testid="button-lightbox-next"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Image container */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl w-full glass-strong rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Placeholder image */}
        <div
          className={`aspect-video bg-gradient-to-br ${image.gradient}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-white/10 flex items-center justify-center">
                <Images className="w-12 h-12 text-white/60" />
              </div>
              <p className="text-xl font-medium text-white/80">{image.title}</p>
              <p className="text-sm text-white/60 mt-2">{image.description}</p>
            </div>
          </div>
        </div>

        {/* Image info */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{image.title}</h3>
              <p className="text-sm text-muted-foreground">
                {image.description}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-white/30 hover:bg-white/50"
            }`}
            data-testid={`button-lightbox-dot-${index}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 md:py-32 lg:py-40"
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
            <Images className="w-4 h-4" />
            Gallery
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Beautiful by <span className="gradient-text">Default</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pure GNOME aesthetics without the clutter
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              index={index}
              onClick={() => openLightbox(index)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
