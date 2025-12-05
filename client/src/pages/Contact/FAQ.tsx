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
      question: "Can I cancel my booking?",
      answer: "Yes! You can cancel up to 24 hours before your booking time for a full refund."
    },
    {
      question: "Do you offer group bookings?",
      answer: "Yes, please contact us for group rates and special event bookings."
    },
    {
      question: "How do I register my own court for rentals?",
      answer: "We offer a service for court owners to list their courts. Please reach out to us via the contact form for more information."
    },
    {
      question: "Do you provide equipment rentals?",
      answer: "No, you are required to bring your own equipment."
    },
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
            {faq.question}
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