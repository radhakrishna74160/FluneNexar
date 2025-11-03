import { SettingsPanel } from '../SettingsPanel';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import blueAvatar from '@assets/generated_images/Blue_holographic_AI_avatar_a57d94a6.png';

export default function SettingsPanelExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [managerName, setManagerName] = useState("NEXAR");
  const [selectedAvatar, setSelectedAvatar] = useState(blueAvatar);
  const [personality, setPersonality] = useState({
    formality: 50,
    verbosity: 50,
  });

  const handlePersonalityChange = (key: string, value: number) => {
    setPersonality(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-settings">
        Open Settings
      </Button>
      
      <SettingsPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        managerName={managerName}
        onManagerNameChange={setManagerName}
        selectedAvatar={selectedAvatar}
        onAvatarChange={setSelectedAvatar}
        personality={personality}
        onPersonalityChange={handlePersonalityChange}
      />
    </div>
  );
}
