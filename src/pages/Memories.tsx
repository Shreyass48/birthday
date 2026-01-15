import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import FloatingHearts from "@/components/FloatingHearts";

// ✨ Memory photos with collage-style layout
const PHOTOS = [
  {
    id: 1,
    url: "/images/IMG_6324.JPG",
    caption: "Beautiful moments together 💕",
    size: "large", // large, medium, small
    rotation: -2,
  },
  {
    id: 2,
    url: "/images/IMG_6320.JPG",
    caption: "Cherished memories 🌅",
    size: "medium",
    rotation: 3,
  },
  {
    id: 3,
    url: "/images/IMG_6321.JPG",
    caption: "Laughing together 😄",
    size: "small",
    rotation: -1.5,
  },
  {
    id: 4,
    url: "/images/IMG_6322.JPG",
    caption: "Special moments ✨",
    size: "medium",
    rotation: 2.5,
  },
  {
    id: 5,
    url: "/images/IMG_6323.JPG",
    caption: "Love and happiness 🥰",
    size: "large",
    rotation: -3,
  },
  {
    id: 6,
    url: "/images/IMG_6319.JPG ",
    caption: "Forever grateful 💗",
    size: "small",
    rotation: 1.5,
  },
  {
    id: 7,
    url: "/images/IMG_6325.JPG",
    caption: "Beautiful memories 🌸",
    size: "medium",
    rotation: -2.5,
  },
  {
    id: 8,
    url: "/images/IMG_6326.JPG",
    caption: "Together forever 💖",
    size: "large",
    rotation: 2,
  },
];

const Memories = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof PHOTOS[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // Play audio only once when component mounts
    if (!hasPlayedRef.current && !audioRef.current) {
      const audio = new Audio('/audio/dooron.mp3');
      audio.volume = 0.7; // Set volume to 70%
      
      // Play the audio
      audio.play().catch((error) => {
        // Handle autoplay restrictions (some browsers require user interaction)
        console.log('Audio autoplay prevented:', error);
      });
      
      audioRef.current = audio;
      hasPlayedRef.current = true;

      // Cleanup function to pause audio if component unmounts
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-sunset overflow-hidden pb-safe">
        <FloatingHearts count={5} />

        {/* Header */}
        <div className="pt-safe px-safe">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-8 md:py-12"
          >
            <h2 className="font-script text-3xl xs:text-4xl md:text-5xl text-foreground mb-3">
              Our Beautiful Memories
            </h2>
            <p className="font-elegant text-base text-muted-foreground">
              A collection of moments we've shared 💕
            </p>
          </motion.div>
        </div>

        {/* Collage-style Photo Grid */}
        <div className="px-3 xs:px-4 md:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Mobile: Single column with varied sizes */}
            <div className="block md:hidden space-y-4">
              {PHOTOS.map((photo, index) => {
                const heightClass = 
                  photo.size === 'large' ? 'h-80' :
                  photo.size === 'medium' ? 'h-64' : 'h-56';
                
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 50, rotate: photo.rotation }}
                    animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, rotate: photo.rotation + 2 }}
                      className={`relative ${heightClass} rounded-2xl overflow-hidden shadow-romantic bg-white p-2`}
                      style={{ transform: `rotate(${photo.rotation}deg)` }}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-rose-100 to-rose-200">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          style={{
                            transform: (photo.id === 1 || photo.id === 8) ? 'rotate(90deg) scale(1.3)' : 'none',
                            objectPosition: photo.id === 3 ? 'center 25%' : 'center center'
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-rose-400 text-4xl">📷</div>';
                            }
                          }}
                        />
                      </div>
                      {/* Caption overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 rounded-b-xl">
                        <p className="font-elegant text-sm text-white text-center">
                          {photo.caption}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop: Organic collage layout with varied sizes and rotations */}
            <div className="hidden md:block">
              <div className="relative" style={{ minHeight: '1200px' }}>
                {PHOTOS.map((photo, index) => {
                  // Create organic positioning for collage effect
                  const positions = [
                    { top: '5%', left: '2%', width: '30%' },
                    { top: '8%', left: '35%', width: '25%' },
                    { top: '12%', left: '65%', width: '30%' },
                    { top: '35%', left: '5%', width: '28%' },
                    { top: '40%', left: '38%', width: '32%' },
                    { top: '45%', left: '72%', width: '25%' },
                    { top: '68%', left: '10%', width: '27%' },
                    { top: '70%', left: '42%', width: '30%' },
                  ];
                  
                  const pos = positions[index] || positions[0];
                  const height = photo.size === 'large' ? '380px' : photo.size === 'medium' ? '320px' : '280px';

                  return (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.8, rotate: photo.rotation - 15, y: 50 }}
                      animate={{ opacity: 1, scale: 1, rotate: photo.rotation, y: 0 }}
                      transition={{ 
                        delay: index * 0.12, 
                        duration: 0.7,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.08, 
                        rotate: photo.rotation + 5,
                        zIndex: 50,
                        transition: { duration: 0.3, type: "spring" }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute group cursor-pointer"
                      style={{ 
                        top: pos.top, 
                        left: pos.left, 
                        width: pos.width,
                        height: height
                      }}
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <motion.div
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-romantic bg-white p-2 lg:p-3"
                        style={{ transform: `rotate(${photo.rotation}deg)` }}
                      >
                        <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-rose-100 to-rose-200">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                            style={{
                              transform: (photo.id === 1 || photo.id === 8) ? 'rotate(90deg) scale(1.3)' : 'none',
                              objectPosition: photo.id === 3 ? 'center 25%' : 'center center'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-rose-400 text-4xl">📷</div>';
                              }
                            }}
                          />
                        </div>
                        {/* Caption overlay - appears on hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent rounded-xl flex items-end justify-center p-4 lg:p-6"
                        >
                          <p className="font-elegant text-sm lg:text-base text-white text-center">
                            {photo.caption}
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center py-12 px-6"
        >
          <div className="glass-romantic rounded-3xl p-8 max-w-md mx-auto">
            <p className="font-script text-2xl md:text-3xl text-foreground mb-4">
              Here's to many more memories together
            </p>
            <div className="flex justify-center gap-2 text-2xl">
              <span className="animate-heartbeat">💖</span>
              <span className="animate-heartbeat" style={{ animationDelay: "0.2s" }}>💖</span>
              <span className="animate-heartbeat" style={{ animationDelay: "0.4s" }}>💖</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Photo Modal with smooth transitions */}
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: selectedPhoto.rotation }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-white p-2 lg:p-3"
              >
                <div className="w-full bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl min-h-[400px] flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                    style={{
                      transform: (selectedPhoto.id === 1 || selectedPhoto.id === 8) 
                        ? 'rotate(90deg) scale(1.2)' 
                        : selectedPhoto.id === 3 
                        ? 'translateY(-10%)' 
                        : 'none'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="flex flex-col items-center justify-center text-rose-400"><span class="text-6xl mb-4">📷</span><p class="text-lg font-elegant">Image not found</p></div>';
                      }
                    }}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 lg:p-8 rounded-b-xl lg:rounded-b-2xl">
                  <p className="font-elegant text-base lg:text-lg text-white text-center">
                    {selectedPhoto.caption}
                  </p>
                </div>
              </motion.div>
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl touch-target shadow-lg hover:bg-white/30 transition-colors"
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default Memories;
