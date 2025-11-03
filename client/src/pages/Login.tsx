import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { Sparkles } from "lucide-react";

export default function Login() {
  const handleGoogleSignIn = () => {
    console.log("Google sign-in initiated");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="glassmorphic rounded-2xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <Sparkles className="w-16 h-16 text-primary mx-auto" />
            </motion.div>
            
            <div>
              <h1 className="text-5xl font-bold text-gradient-primary mb-2">
                NEXAR
              </h1>
              <p className="text-lg text-muted-foreground">
                Your AI Manager
              </p>
            </div>

            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Experience the future of AI assistance with specialized assistants for thinking, writing, coding, research, and design.
            </p>
          </div>

          <GoogleAuthButton onClick={handleGoogleSignIn} />

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
