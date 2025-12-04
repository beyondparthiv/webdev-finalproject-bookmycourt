import React, { useEffect, useState } from 'react';
import { Chatbot } from './Chatbot';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { Rules } from './Rules';
import { GeminiService } from './services/GeminiClient';

export const Contact: React.FC = () => {
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);

  useEffect(() => {
    // Initialize Gemini service with API key from .env to access AI Bot
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
 
    setGeminiService(new GeminiService(apiKey));
  }, []);

  if (!geminiService) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Get Help</h1>
   
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '30px' }}>
        
       {/*Chatbot*/}
        <div style={{ border: '1px solid', overflowY: 'scroll', padding: '20px' }}>
          <Chatbot geminiService={geminiService} />
        </div>

        {/* Contact Form */}
        <div style={{ border: '1px solid', padding: '20px' }}>
          <ContactForm />
        </div>

        {/* FAQ */}
        <div style={{ border: '1px solid', padding: '20px' }}>
          <FAQ />
        </div>

      </div>
       {/* Rules of pickleball */}
        <div style={{ border: '1px solid', padding: '20px' }}>
          <Rules />
        </div>
    </div>
  );
};
