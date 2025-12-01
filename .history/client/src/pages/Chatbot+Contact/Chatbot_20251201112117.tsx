import React, { useState, useRef, useEffect } from 'react';


interface ChatbotProps {
  geminiService: any; // We'll pass the service from the parent
}

export const Chatbot: React.FC<ChatbotProps> = ({ geminiService }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you with booking courts, payment questions, or anything else. How can I assist you?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
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
      
      <div style={{ border: '1px solid black', height: '400px', overflowY: 'scroll', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: message.role === 'user' ? 'right' : 'left' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '8px', 
              background: message.role === 'user' ? '#e3f2fd' : '#f5f5f5',
              borderRadius: '8px',
              maxWidth: '70%'
            }}>
              <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong>
              <p style={{ margin: '5px 0' }}>{message.content}</p>
              <small>{message.timestamp.toLocaleTimeString()}</small>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: 'left' }}>
            <em>Assistant is typing...</em>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          disabled={isLoading}
          style={{ width: '80%', padding: '8px' }}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !inputValue.trim()}
          style={{ width: '18%', padding: '8px', marginLeft: '2%' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
