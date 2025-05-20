import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const MergePDF = () => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFiles(Array.from(e.target.files));
    }
  };

  const handleMerge = async () => {
    if (pdfFiles.length < 2) {
      setMessage('Selectează cel puțin 2 fișiere PDF.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    pdfFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:8000/api/merge/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access') || ''}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Eroare la server');
      }

      const blob = await response.blob();
      saveAs(blob, 'merged.pdf');
      setMessage('Fișierele au fost îmbinate cu succes!');
    } catch (error) {
      console.error(error);
      setMessage('A apărut o eroare la îmbinare.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Îmbinare PDF-uri</h2>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
      <button onClick={handleMerge} disabled={loading}>
        {loading ? 'Se procesează...' : 'Îmbină'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default MergePDF;