import { AssistantCard } from '../AssistantCard';
import { useState, useEffect } from 'react';

export default function AssistantCardExample() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "active" | "complete">("idle");

  useEffect(() => {
    const timer = setTimeout(() => setStatus("active"), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "active") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setStatus("complete");
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="grid grid-cols-5 gap-4 max-w-4xl">
        <AssistantCard type="thinker" status={status} progress={progress} />
        <AssistantCard type="writer" status="idle" progress={0} />
        <AssistantCard type="coder" status="active" progress={45} />
        <AssistantCard type="researcher" status="complete" progress={100} />
        <AssistantCard type="designer" status="idle" progress={0} />
      </div>
    </div>
  );
}
