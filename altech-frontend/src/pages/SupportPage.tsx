import React, { useState } from 'react';

const SupportPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cerere suport:', { email, message });
    // Aici vei face un POST către backend (ex: axios.post('/api/support', { ... }))
    alert('Cererea a fost trimisă! Vei primi un răspuns pe email.');
    setEmail('');
    setMessage('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Suport</h1>
      <p>Dacă întâmpini probleme, trimite-ne un mesaj:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Emailul tău"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <textarea
          placeholder="Mesajul tău"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Trimite
        </button>
      </form>
    </div>
  );
};

export default SupportPage;