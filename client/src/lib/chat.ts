// Client-side chat API integration
import { useQuery, useMutation } from '@tanstack/react-query';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  role: 'assistant';
  content: string;
}

// Hook to send messages to Gemini API through our secure backend proxy
export const useChatMessages = () => {
  const sendMessage = async (messages: Message[]): Promise<ChatResponse> => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || 'Failed to send message');
    }

    return response.json();
  };

  return useMutation({
    mutationFn: (messages: Message[]) => sendMessage(messages),
  });
};
