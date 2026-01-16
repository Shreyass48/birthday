import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import RomanticButton from "@/components/RomanticButton";
import PageTransition from "@/components/PageTransition";
import Sparkles from "@/components/Sparkles";

// ✨ CUSTOMIZE: Write your heartfelt message here
const BIRTHDAY_MESSAGE = `Happy Birthday, Hrutuja! 🎂✨

Yaar, aaj tera birthday hai aur main soch raha tha ki kaise sab kuch shuru hua...

Maine tujhe woh 2 vajun 22 min play ke liye message kiya tha, aur phir bas... we started talking. Honestly, it all feels like God's plan ❤️

Phir shuru hui hamari normal conversations, Instagram posts share karna, aur phir aya first call tera Goa trip planning ke liye. Maine pehli baar teri awaaz suni thi... aur yaar fan ho gaya, aur uss din tune wo voice note bheja tha "bade ache lagte hai" wala aye haye, kya awaaz hai yaar apki! ❤️ Abhi bhi kaano mein goonjti hai.
Then we finally met for the first time... our bawling session jisme aapne muze hara diyaa, woh coffee date, maja aaya tha yaar, ekdum! ☕

Aur phir aapne mujhe Goa trip mein invite kiya... yaar, kya moments banaye humne! Woh Vagator wala sunset, South Goa ki bike ride tere saath, it was the best! ❤️ Hamari dinner date, raat mein beach pe ki hui bakchodi, aur haa... woh palak paneer toh kabhi nahi bhul sakta yaar! 😄 Aur woh swimming session bhi... honestly, it was my best Goa trip ever, because of you. Thank you so much for inviting me. 💕

Phir aya hamara first kand Raju ke room pe sorry yaar, us time thoda nervous tha, but maja aaya tha! 😅

Aur ab toh apni roz ki baatein, VCs... aadat lag gayi hai yaar teri. Without talking to you, din adhoora sa lagta hai. 💭

Aur woh din jab aap sidha Thane aayi... yaar, woh 2 din kabhi nahi bhulunga! Cooking together, reels dekhna, Zakir ka standup, aur Chef Madam ki best khichdi ever... thank you yaar, thank you so much! 🥰
End mein yahi kahunga Aap bahut achi ho aur bahut zyada pyari ho!❤️✨

Thank you for coming into my life and making it the best. Thank you for filling it with so much happiness, laughter, and beautiful memories.

Happy Birthday, dear! 🎉🎂

Enjoy your day to the fullest, keep smiling that beautiful smile of yours, and may God bless you with everything you deserve.
Here's to many more memories together! 🥂💕`;

// ✨ CUSTOMIZE: Change the signature
const SIGNATURE = "With all my love";

const Message = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // Play audio only once when component mounts
    if (!hasPlayedRef.current && !audioRef.current) {
      const audio = new Audio("/audio/dekha-hi-nahi.mp3");
      audio.volume = 0.7; // Set volume to 70%

      // Play the audio
      audio.play().catch((error) => {
        // Handle autoplay restrictions (some browsers require user interaction)
        console.log("Audio autoplay prevented:", error);
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

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-dreamy overflow-hidden flex flex-col items-center justify-center px-safe pb-safe pt-safe">
        <Sparkles count={20} />

        <div className="relative z-10 w-full max-w-[90vw] md:max-w-xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              // Envelope (closed state)
              <motion.div
                key="envelope"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer"
                onClick={handleEnvelopeClick}
              >
                <div className="text-center mb-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-elegant text-lg text-muted-foreground"
                  >
                    Tap to open your letter
                  </motion.p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative mx-auto w-64 h-44 xs:w-72 xs:h-48 md:w-80 md:h-52"
                >
                  {/* Envelope body */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-rose-300 rounded-lg shadow-romantic">
                    {/* Envelope flap */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rose-100 to-rose-200 rounded-t-lg"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      }}
                    />
                    {/* Heart seal */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl"
                    >
                      💌
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              // Letter (open state)
              <motion.div
                key="letter"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
              >
                <motion.div
                  initial={{ rotateX: -90 }}
                  animate={{ rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass bg-white/90 rounded-2xl p-6 md:p-10 shadow-soft"
                >
                  {/* Header decoration */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center gap-2 mb-6"
                  >
                    <span className="text-xl">💕</span>
                    <span className="text-xl">✨</span>
                    <span className="text-xl">💕</span>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <p className="font-elegant text-sm md:text-base text-foreground leading-relaxed whitespace-pre-line">
                      {BIRTHDAY_MESSAGE}
                    </p>
                  </motion.div>

                  {/* Signature */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="mt-8 text-right"
                  >
                    <p className="font-script text-xl md:text-2xl text-accent">
                      {SIGNATURE}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Continue button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.6 }}
                  className="mt-8 text-center"
                >
                  <RomanticButton
                    onClick={() => navigate("/memories")}
                    variant="primary"
                    size="lg"
                    className="w-full xs:w-auto"
                  >
                    📸 View Our Memories
                  </RomanticButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Message;
