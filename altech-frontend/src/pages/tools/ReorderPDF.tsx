import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const ReorderPDF = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      setMessage('Încarcă un fișier PDF valid.');
      return;
    }

    setPdfFile(file);
    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    const total = pdfDoc.getPageCount();
    setNumPages(total);
    setPageOrder([...Array(total).keys()].map(i => i)); // [0, 1, 2, ...]
    setMessage('');
  };

  const toggleOrder = (index: number) => {
    const newOrder = [...pageOrder];
    const clicked = newOrder.splice(index, 1)[0];
    newOrder.push(clicked); // Mutăm la final
    setPageOrder(newOrder);
  };

  const handleReorder = async () => {
    if (!pdfFile || pageOrder.length === 0) {
      setMessage('Selectează un fișier și ordinea paginilor.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('order', JSON.stringify(pageOrder));

    try {
      const response = await fetch('http://localhost:8000/api/reorder/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access') || ''}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Eroare la server');

      const blob = await response.blob();
      saveAs(blob, 'reordered.pdf');
      setMessage('PDF-ul a fost reordonat cu succes!');
    } catch (error) {
      console.error(error);
      setMessage('A apărut o eroare la reordonare.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reordonează PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {numPages > 0 && (
        <div>
          <p>Selectează ordinea paginilor:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {pageOrder.map((pageIndex, i) => (
              <button
                key={i}
                onClick={() => toggleOrder(i)}
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleReorder} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Se procesează...' : 'Reordonează'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default ReorderPDF;