import React, { useState, useRef, useEffect } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
interface ChatbotProps {
  geminiService: any; //GeminiService from GeminiClient.ts
}

export const Chatbot: React.FC<ChatbotProps> = ({ geminiService }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Sporty! I\'m here to help you with booking courts or anything other questions. How can I assist you?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add message from user
    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await geminiService.getChatResponse(inputValue, messages);

      // Add assistant response
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting chat response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <h2>Chat with Us</h2>
      
      <div style={{ border: '3px solid black', overflowY: 'scroll', height: '400px', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: message.role === 'user' ? 'right' : 'left' }}>
            <div>
              <strong>{message.role === 'user' ? 'You' : 'Sporty'}:</strong>
              <p style={{ margin: '5px 0' }}>{message.content}</p>
              <small>{message.timestamp.toLocaleTimeString()}</small>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ marginBottom: '10px', textAlign: 'left' }}>
            <em>Sporty is warming up...</em>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isLoading}
          onKeyPress={handleKeyPress}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !inputValue.trim()} //trimming ending whitespaces
        
        >
          Send
        </button>
      </div>
    </div>
  );
};
