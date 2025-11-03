import { motion } from "framer-motion";
import { Brain, Pencil, Code, Search, Palette, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

export type AssistantType = "thinker" | "writer" | "coder" | "researcher" | "designer";

interface AssistantCardProps {
  type: AssistantType;
  status: "idle" | "active" | "complete";
  progress?: number;
}

const assistantConfig = {
  thinker: {
    name: "Thinker",
    icon: Brain,
    color: "hsl(var(--chart-1))",
  },
  writer: {
    name: "Writer",
    icon: Pencil,
    color: "hsl(var(--chart-2))",
  },
  coder: {
    name: "Coder",
    icon: Code,
    color: "hsl(var(--chart-3))",
  },
  researcher: {
    name: "Researcher",
    icon: Search,
    color: "hsl(var(--chart-4))",
  },
  designer: {
    name: "Designer",
    icon: Palette,
    color: "hsl(var(--chart-5))",
  },
};

export function AssistantCard({ type, status, progress = 0 }: AssistantCardProps) {
  const config = assistantConfig[type];
  const Icon = config.icon;

  return (
    <Card className="relative p-4 overflow-visible">
      <motion.div
        animate={{
          boxShadow: status === "active" 
            ? `0 0 20px ${config.color}80, 0 0 40px ${config.color}40`
            : "none",
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {status === "active" && (
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke={config.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    pathLength: progress / 100,
                  }}
                />
              </svg>
            )}
            
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
              status === "active" ? "bg-card" : "bg-muted/50"
            }`}>
              {status === "complete" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Check className="w-6 h-6 text-primary" />
                </motion.div>
              ) : (
                <Icon 
                  className="w-6 h-6" 
                  style={{ color: status === "active" ? config.color : "hsl(var(--muted-foreground))" }}
                />
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-wide" style={{ 
              color: status === "active" ? config.color : "hsl(var(--foreground))"
            }}>
              {config.name}
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <div 
                className={`w-1.5 h-1.5 rounded-full ${
                  status === "idle" ? "bg-muted-foreground" :
                  status === "active" ? "bg-primary" :
                  "bg-green-500"
                }`}
                style={status === "active" ? { backgroundColor: config.color } : undefined}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {status === "complete" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 rounded-lg border-2"
          style={{ borderColor: config.color }}
        />
      )}
    </Card>
  );
}
