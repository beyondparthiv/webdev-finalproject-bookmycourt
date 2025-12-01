import type { ChatMessage } from "../Chatbot";
import React, { useEffect, useState, useRef } from 'react';

class GeminiService {
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta/models';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getChatResponse(userMessage: string, conversationHistory: ChatMessage[]){
    const url = `${this.baseURL}/gemini-2.0-flash-lite:generateContent?key=${this.apiKey}`;

    // Get last 5 messages for context
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
- Help Page: Contact information, Message Support and location

When users ask about:
- Booking → Tell them to go to the homepage and click "Book My Court"
- Payment → List the payment methods we accept (Visa, Mastercard, Apple Pay, PayPal)
- Rules → Tell them to visit the Rules page
- Hours/Location → Tell them to check the Contact page
- General info → Tell them to check the About page

Be conversational, friendly, and helpful. Keep responses concise (2-3 sentences max).

${recentHistory ? `Previous conversation:\n${recentHistory}\n` : ''}

User: ${userMessage}`}}
