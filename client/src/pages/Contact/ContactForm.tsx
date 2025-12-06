import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show popup instead of actually sending email
    setShowAlert(true);
    
    // Clear form
    setName('');
    setEmail('');
    setMessage('');

  };

  return (
    <div>
      <h2>Send Us a Message</h2>
      
      {showAlert && (
        <div style={{ 
          background: '#00bae4ff', 
          border: '1px solid #05017cff', 
          padding: '15px', 
          marginBottom: '20px',
          borderRadius: '5px'
        }}>
          <strong>Message sent!</strong> We will respond soon. In the meantime, check out our FAQs or ask Sporty for additional help!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Message:</label><br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Send Message
        </button>
      </form>
    </div>
  );
};