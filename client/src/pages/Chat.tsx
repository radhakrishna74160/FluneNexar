import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ManagerAvatar } from "@/components/ManagerAvatar";
import { AssistantCard, type AssistantType } from "@/components/AssistantCard";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { SettingsPanel } from "@/components/SettingsPanel";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
import blueAvatar from '@assets/generated_images/Blue_holographic_AI_avatar_a57d94a6.png';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const assistants: AssistantType[] = ["thinker", "writer", "coder", "researcher", "designer"];

export default function Chat() {
  const [managerName, setManagerName] = useState("NEXAR");
  const [selectedAvatar, setSelectedAvatar] = useState(blueAvatar);
  const [personality, setPersonality] = useState({ formality: 50, verbosity: 50 });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [assistantStatuses, setAssistantStatuses] = useState<Record<AssistantType, { status: "idle" | "active" | "complete", progress: number }>>({
    thinker: { status: "idle", progress: 0 },
    writer: { status: "idle", progress: 0 },
    coder: { status: "idle", progress: 0 },
    researcher: { status: "idle", progress: 0 },
    designer: { status: "idle", progress: 0 },
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setAssistantStatuses({
      thinker: { status: "active", progress: 0 },
      writer: { status: "active", progress: 0 },
      coder: { status: "active", progress: 0 },
      researcher: { status: "active", progress: 0 },
      designer: { status: "active", progress: 0 },
    });

    assistants.forEach((assistant, index) => {
      setTimeout(() => {
        const progressInterval = setInterval(() => {
          setAssistantStatuses(prev => {
            const current = prev[assistant].progress;
            if (current >= 100) {
              clearInterval(progressInterval);
              return {
                ...prev,
                [assistant]: { status: "complete", progress: 100 },
              };
            }
            return {
              ...prev,
              [assistant]: { status: "active", progress: current + 20 },
            };
          });
        }, 300);
      }, index * 200);
    });

    setTimeout(() => {
      setIsTyping(false);
      setIsSpeaking(true);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I've analyzed your request with my specialized assistants. Here's what we found:\n\nThe Thinker has considered the strategic approach, the Writer has crafted clear explanations, the Coder has outlined technical implementation, the Researcher has gathered relevant data, and the Designer has suggested visual improvements.\n\nHow would you like to proceed?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      setTimeout(() => {
        setIsSpeaking(false);
        setAssistantStatuses({
          thinker: { status: "idle", progress: 0 },
          writer: { status: "idle", progress: 0 },
          coder: { status: "idle", progress: 0 },
          researcher: { status: "idle", progress: 0 },
          designer: { status: "idle", progress: 0 },
        });
      }, 2000);
    }, 3000);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <ParticleBackground />
      
      <header className="relative z-10 glassmorphic border-b border-border/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-gradient-primary">{managerName}</div>
            <div className="text-sm text-muted-foreground">AI Manager</div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSettingsOpen(true)}
              className="rounded-full"
              data-testid="button-settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleLogout}
              className="rounded-full"
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <div className="container mx-auto max-w-5xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <ManagerAvatar
                name={managerName}
                avatarUrl={selectedAvatar}
                isActive={isTyping || isSpeaking}
                isSpeaking={isSpeaking}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
            >
              {assistants.map((assistant) => (
                <AssistantCard
                  key={assistant}
                  type={assistant}
                  status={assistantStatuses[assistant].status}
                  progress={assistantStatuses[assistant].progress}
                />
              ))}
            </motion.div>

            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-12"
              >
                <h2 className="text-2xl font-semibold mb-3">How can I help you today?</h2>
                <p className="text-muted-foreground">
                  Ask me anything, and I'll coordinate my team of assistants to provide the best answer.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                    avatarUrl={selectedAvatar}
                  />
                ))}
                {isTyping && (
                  <ChatMessage
                    role="assistant"
                    content=""
                    isTyping={true}
                    avatarUrl={selectedAvatar}
                  />
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="container mx-auto max-w-3xl">
            <ChatInput
              onSend={handleSendMessage}
              disabled={isTyping}
              placeholder="Ask NEXAR anything..."
            />
          </div>
        </div>
      </div>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        managerName={managerName}
        onManagerNameChange={setManagerName}
        selectedAvatar={selectedAvatar}
        onAvatarChange={setSelectedAvatar}
        personality={personality}
        onPersonalityChange={(key, value) => setPersonality(prev => ({ ...prev, [key]: value }))}
      />
    </div>
  );
}
