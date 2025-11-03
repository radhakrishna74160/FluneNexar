import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import blueAvatar from '@assets/generated_images/Blue_holographic_AI_avatar_a57d94a6.png';
import purpleAvatar from '@assets/generated_images/Purple_holographic_AI_avatar_28d4ff56.png';
import cyanAvatar from '@assets/generated_images/Cyan_holographic_AI_avatar_d39783c9.png';
import pinkAvatar from '@assets/generated_images/Pink_holographic_AI_avatar_a157a3b8.png';
import greenAvatar from '@assets/generated_images/Green_holographic_AI_avatar_5ec00bc2.png';
import orangeAvatar from '@assets/generated_images/Orange_holographic_AI_avatar_12b715f2.png';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  managerName: string;
  onManagerNameChange: (name: string) => void;
  selectedAvatar: string;
  onAvatarChange: (url: string) => void;
  personality: {
    formality: number;
    verbosity: number;
  };
  onPersonalityChange: (key: string, value: number) => void;
}

const avatars = [
  { url: blueAvatar, name: "Blue Crystal" },
  { url: purpleAvatar, name: "Purple Quantum" },
  { url: cyanAvatar, name: "Cyan Neural" },
  { url: pinkAvatar, name: "Pink Hologram" },
  { url: greenAvatar, name: "Green Matrix" },
  { url: orangeAvatar, name: "Orange Pulse" },
];

export function SettingsPanel({
  isOpen,
  onClose,
  managerName,
  onManagerNameChange,
  selectedAvatar,
  onAvatarChange,
  personality,
  onPersonalityChange,
}: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            data-testid="settings-overlay"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 glassmorphic border-l border-border z-50 overflow-y-auto"
            data-testid="settings-panel"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gradient-primary">Settings</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onClose}
                  className="rounded-full"
                  data-testid="button-close-settings"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="manager-name">Manager Name</Label>
                  <Input
                    id="manager-name"
                    value={managerName}
                    onChange={(e) => onManagerNameChange(e.target.value)}
                    placeholder="Enter manager name"
                    className="mt-2 bg-card/50"
                    data-testid="input-manager-name"
                  />
                </div>

                <div>
                  <Label>Avatar</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {avatars.map((avatar) => (
                      <button
                        key={avatar.url}
                        onClick={() => onAvatarChange(avatar.url)}
                        className={`p-2 rounded-xl border-2 transition-all hover-elevate ${
                          selectedAvatar === avatar.url
                            ? "border-primary glow-primary"
                            : "border-border"
                        }`}
                        data-testid={`avatar-${avatar.name.toLowerCase().replace(' ', '-')}`}
                      >
                        <img
                          src={avatar.url}
                          alt={avatar.name}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Formality</Label>
                    <span className="text-xs text-muted-foreground">
                      {personality.formality < 33 ? "Casual" : personality.formality < 66 ? "Balanced" : "Formal"}
                    </span>
                  </div>
                  <Slider
                    value={[personality.formality]}
                    onValueChange={(value) => onPersonalityChange("formality", value[0])}
                    max={100}
                    step={1}
                    className="mt-2"
                    data-testid="slider-formality"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Verbosity</Label>
                    <span className="text-xs text-muted-foreground">
                      {personality.verbosity < 33 ? "Brief" : personality.verbosity < 66 ? "Moderate" : "Detailed"}
                    </span>
                  </div>
                  <Slider
                    value={[personality.verbosity]}
                    onValueChange={(value) => onPersonalityChange("verbosity", value[0])}
                    max={100}
                    step={1}
                    className="mt-2"
                    data-testid="slider-verbosity"
                  />
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-primary"
                onClick={onClose}
                data-testid="button-save-settings"
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
