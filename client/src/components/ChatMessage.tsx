import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  role: "user" | "assistant";
  content?: string;
  timestamp?: string;
  isTyping?: boolean;
  avatarUrl?: string;
}

export function ChatMessage({ role, content, timestamp, isTyping, avatarUrl }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-testid={`message-${role}`}
    >
      <Avatar className="w-10 h-10 shrink-0">
        {!isUser && avatarUrl && <AvatarImage src={avatarUrl} />}
        <AvatarFallback className={isUser ? "bg-primary/20" : "bg-accent/20"}>
          {isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </AvatarFallback>
      </Avatar>

      <div className={`flex flex-col gap-1 max-w-2xl ${isUser ? "items-end" : "items-start"}`}>
        <div 
          className={`rounded-2xl p-4 ${
            isUser 
              ? "bg-primary text-primary-foreground" 
              : "glassmorphic"
          }`}
        >
          {isTyping ? (
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-current opacity-60"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-base whitespace-pre-wrap">{content || ""}</p>
          )}
        </div>
        {timestamp && !isTyping && (
          <span className="text-xs text-muted-foreground px-2">{timestamp}</span>
        )}
      </div>
    </motion.div>
  );
}
