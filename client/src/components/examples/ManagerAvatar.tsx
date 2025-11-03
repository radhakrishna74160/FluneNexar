import { ManagerAvatar } from '../ManagerAvatar';
import blueAvatar from '@assets/generated_images/Blue_holographic_AI_avatar_a57d94a6.png';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ManagerAvatarExample() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8 gap-6">
      <ManagerAvatar 
        name="NEXAR"
        avatarUrl={blueAvatar}
        isActive={true}
        isSpeaking={isSpeaking}
      />
      <Button onClick={() => setIsSpeaking(!isSpeaking)} data-testid="button-toggle-speaking">
        {isSpeaking ? 'Stop Speaking' : 'Start Speaking'}
      </Button>
    </div>
  );
}
