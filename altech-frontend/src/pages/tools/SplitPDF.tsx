import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const SplitPDF = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [splitAt, setSplitAt] = useState<number>(1); // implicit după prima pagină

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setMessage('');
      } else {
        setMessage('Fișierul selectat nu este PDF.');
      }
    }
  };

  const handleSplit = async () => {
    if (!pdfFile) {
      setMessage('Încarcă mai întâi un fișier PDF.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('split_at', splitAt.toString());

    try {
      const response = await fetch('http://localhost:8000/api/split/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access') || ''}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Eroare la server.');
      }

      const zipBlob = await response.blob();
      saveAs(zipBlob, 'split_result.zip');
      setMessage('Fișierul a fost împărțit cu succes!');
    } catch (error) {
      console.error(error);
      setMessage('A apărut o eroare la împărțire.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Împarte PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div>
        <label>Alege pagina la care să se facă împărțirea: </label>
        <input
          type="number"
          value={splitAt}
          onChange={(e) => setSplitAt(Number(e.target.value))}
          min={1}
          style={{ width: '80px' }}
        />
      </div>
      <button onClick={handleSplit} disabled={loading}>
        {loading ? 'Se procesează...' : 'Împarte'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default SplitPDF;