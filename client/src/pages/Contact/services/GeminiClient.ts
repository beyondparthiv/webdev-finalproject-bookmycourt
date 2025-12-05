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

    const prompt = `You are a helpful chatbot named Sporty for a court booking website.

IMPORTANT PAGES AND INFO:
- Homepage: Click "Book My Court" button to book courts
- Map: View a map of all locations with courts
- Help Page: FAQs and rules
- About Page: Information about our facility
- Contact Page: Contact information and location

When users ask about:
- Booking → Tell them to go to the homepage and click "Book My Court"
- Rules → Tell them to view the rules section on the help page
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
export { GeminiService };