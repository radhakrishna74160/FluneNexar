import { ChatMessage } from '../ChatMessage';
import blueAvatar from '@assets/generated_images/Blue_holographic_AI_avatar_a57d94a6.png';

export default function ChatMessageExample() {
  return (
    <div className="flex flex-col gap-6 p-8 bg-background min-h-screen">
      <ChatMessage 
        role="user"
        content="Hello NEXAR! Can you help me plan a website?"
        timestamp="2:30 PM"
      />
      <ChatMessage 
        role="assistant"
        content="Of course! I'll activate my team of assistants to help you. Let me gather insights from the Thinker, Writer, Coder, Researcher, and Designer."
        timestamp="2:31 PM"
        avatarUrl={blueAvatar}
      />
      <ChatMessage 
        role="assistant"
        isTyping={true}
        avatarUrl={blueAvatar}
      />
    </div>
  );
}
