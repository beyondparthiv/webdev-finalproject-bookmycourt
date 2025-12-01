import React, { useEffect, useState } from 'react';
import { Chatbot } from './Chatbot';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';

// Import at the top of the file
class GeminiService {
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta/models';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getChatResponse(userMessage: string, conversationHistory: any[]): Promise<string> {
    const url = `${this.baseURL}/gemini-2.0-flash-lite:generateContent?key=${this.apiKey}`;

    const recentHistory = conversationHistory
      .slice(-5)
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    const prompt = `You are a helpful chatbot for a pickleball court booking website.

IMPORTANT PAGES AND INFO:
- Homepage: Click "Book My Court" button to book courts
- Payment: We accept Visa, Mastercard, Apple Pay, and PayPal
- Rules Page: Has pickleball rules and guidelines
- About Page: Information about our facility
- Contact Page: Contact information and location

When users ask about:
- Booking → Tell them to go to the homepage and click "Book My Court"
- Payment → List the payment methods we accept (Visa, Mastercard, Apple Pay, PayPal)
- Rules → Tell them to visit the Rules page
- Hours/Location → Tell them to check the Contact page
- General info → Tell them to check the About page

Be conversational, friendly, and helpful. Keep responses concise (2-3 sentences max).

${recentHistory ? `Previous conversation:\n${recentHistory}\n` : ''}

User: ${userMessage}

Response (be helpful and concise):`;

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      return aiResponse;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}

export const Contact: React.FC = () => {
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);

  useEffect(() => {
    // Initialize Gemini service with API key from .env to access AI Bot
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    console.log('API Key loaded:', apiKey ? 'Yes' : 'No');
 
    setGeminiService(new GeminiService(apiKey));
  }, []);

  if (!geminiService) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Contact Us</h1>
   
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '30px' }}>
        
       {/*Chatbot*/}
        <div style={{ border: '1px solid', padding: '20px' }}>
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
    </div>
  );
};
