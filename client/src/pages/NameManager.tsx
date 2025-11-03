import { useState } from "react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface NameManagerProps {
  onContinue: (name: string) => void;
}

export default function NameManager({ onContinue }: NameManagerProps) {
  const [name, setName] = useState("NEXAR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onContinue(name.trim());
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <form onSubmit={handleSubmit} className="glassmorphic rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gradient-primary">
              Welcome!
            </h2>
            <p className="text-muted-foreground">
              Give your AI manager a name
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="manager-name" className="text-base">
              Manager Name
            </Label>
            <Input
              id="manager-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name..."
              className="text-lg h-14 bg-card/50"
              autoFocus
              data-testid="input-manager-name"
            />
            <p className="text-xs text-muted-foreground">
              You can change this later in settings
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-primary"
            disabled={!name.trim()}
            data-testid="button-continue"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
