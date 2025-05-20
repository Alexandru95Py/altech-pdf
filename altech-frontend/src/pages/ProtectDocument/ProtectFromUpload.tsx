import React, { useState } from 'react';

const ProtectFromUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !password) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    const res = await fetch('http://localhost:8000/api/protect/upload/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'protected_document.pdf';
      a.click();
    } else {
      alert('Eroare la criptare.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Încarcă un fișier de pe calculator</h2>
      <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parola dorită" required />
      <button type="submit">Protejează</button>
    </form>
  );
};

export default ProtectFromUpload;