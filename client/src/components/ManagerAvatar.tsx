import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ManagerAvatarProps {
  name: string;
  avatarUrl: string;
  isActive?: boolean;
  isSpeaking?: boolean;
}

export function ManagerAvatar({ name, avatarUrl, isActive = false, isSpeaking = false }: ManagerAvatarProps) {
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setPulseKey(prev => prev + 1);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isSpeaking]);

  return (
    <div className="relative flex flex-col items-center gap-4">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-30 blur-2xl" />
        
        <div className="relative w-32 h-32 rounded-full overflow-hidden glassmorphic p-1">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(135deg, transparent 40%, hsl(var(--primary)) 50%, transparent 60%)",
            }}
          />
          
          <div className="relative w-full h-full rounded-full overflow-hidden bg-card flex items-center justify-center">
            <img 
              src={avatarUrl} 
              alt={name}
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        {isSpeaking && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`${pulseKey}-${i}`}
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gradient-primary">{name}</h2>
        <p className="text-sm text-muted-foreground mt-1">Your AI Manager</p>
      </div>

      {isActive && (
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
