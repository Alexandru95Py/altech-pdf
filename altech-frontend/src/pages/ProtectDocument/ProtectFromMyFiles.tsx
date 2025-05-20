import React, { useState } from 'react';

const ProtectFromMyFiles: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleProtect = async () => {
    if (!selectedFileId || !password) {
      alert('Completează toate câmpurile.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/protect/myfiles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          file_id: selectedFileId,
          password: password,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'protected_document.pdf';
        a.click();
      } else {
        alert('Eroare la criptarea fișierului. Verifică dacă ID-ul este valid.');
      }
    } catch (error) {
      console.error('Eroare la conectare cu serverul:', error);
      alert('A apărut o eroare de rețea sau server.');
    }
  };

  return (
    <div className="tool-page">
      <h2>Protejează un fișier din „Fișierele Mele”</h2>

      <input
        type="text"
        placeholder="ID-ul fișierului (temporar)"
        value={selectedFileId}
        onChange={(e) => setSelectedFileId(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
        required
      />

      <input
        type="password"
        placeholder="Parola dorită"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
        required
      />

      <button onClick={handleProtect}>Protejează fișierul</button>
    </div>
  );
};

export default ProtectFromMyFiles;