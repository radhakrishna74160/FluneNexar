import { ChatInput } from '../ChatInput';

export default function ChatInputExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="w-full max-w-3xl">
        <ChatInput 
          onSend={(msg) => console.log('Message sent:', msg)}
          placeholder="Ask NEXAR anything..."
        />
      </div>
    </div>
  );
}
