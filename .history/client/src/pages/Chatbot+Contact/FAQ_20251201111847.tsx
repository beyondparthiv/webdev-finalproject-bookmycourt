import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I book a court?",
      answer: "Go to the homepage and click the 'Book My Court' button. You'll be able to see available time slots and make a reservation."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, Apple Pay, and PayPal."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes! You can cancel up to 24 hours before your booking time for a full refund."
    },
    {
      question: "Do you offer group bookings?",
      answer: "Absolutely! Contact us for group rates and special event bookings."
    },
    {
      question: "What are your operating hours?",
      answer: "We're open 7 days a week from 6am to 10pm."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px' }}>
          <div 
            onClick={() => toggleFAQ(index)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {faq.question} {openIndex === index ? '▲' : '▼'}
          </div>
          
          {openIndex === index && (
            <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};