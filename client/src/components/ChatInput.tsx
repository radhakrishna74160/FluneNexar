import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = "Type your message..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glassmorphic p-4 rounded-2xl">
      <div className="flex gap-3 items-end">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="resize-none min-h-[60px] max-h-[200px] bg-card/50 border-border/50 focus-visible:ring-primary"
          data-testid="input-message"
        />
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            data-testid="button-voice"
            onClick={() => console.log('Voice input clicked')}
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="rounded-full bg-gradient-primary hover:opacity-90"
            data-testid="button-send"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {message.length > 0 && (
        <div className="text-xs text-muted-foreground mt-2 px-1">
          {message.length} characters
        </div>
      )}
    </div>
  );
}
