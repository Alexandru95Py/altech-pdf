import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectDocumentMain: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tool-page">
      <h1>Protejează un Document</h1>
      <p>Selectează metoda prin care vrei să adaugi fișierul:</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={() => navigate('/protect/upload')}>
          Încarcă din calculator
        </button>
        <button onClick={() => navigate('/protect/myfiles')}>
          Alege din Fișierele Mele
        </button>
      </div>
    </div>
  );
};

export default ProtectDocumentMain;