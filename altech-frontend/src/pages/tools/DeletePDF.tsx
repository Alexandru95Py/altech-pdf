// src/pages/tools/DeletePDF.tsx
import React, { useState } from "react";
import { uploadPDFToDeletePages } from "../../services/myfilesService"; // Asigură-te că ai importat corect funcția

// Removed duplicate declaration of uploadPDFToDeletePages

const DeletePDF = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pagesToDelete, setPagesToDelete] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;
    setPdfFile(file);
    const pdfBytes = await file.arrayBuffer();
    const { PDFDocument } = await import("pdf-lib");
    const pdfDoc = await PDFDocument.load(pdfBytes);
    setNumPages(pdfDoc.getPageCount());
    setPagesToDelete([]);
  };

  const togglePage = (page: number) => {
    setPagesToDelete((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  const handleDeletePages = async () => {
    if (!pdfFile || pagesToDelete.length === 0) return;
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("pages_to_delete", JSON.stringify(pagesToDelete));

      await uploadPDFToDeletePages(formData, token, ); // Replace "additionalArgument" with the actual value required
      setMessage("Fișierul a fost salvat cu succes în My Files.");
    } catch (error) {
      console.error("Eroare:", error);
      setMessage("A apărut o eroare.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Ștergere pagini PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {numPages > 0 && (
        <>
          <h3>Selectează paginile de șters</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {Array.from({ length: numPages }).map((_, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  checked={pagesToDelete.includes(i)}
                  onChange={() => togglePage(i)}
                />
                Pagina {i + 1}
              </label>
            ))}
          </div>
          <button onClick={handleDeletePages} style={{ marginTop: "1rem" }}>
            Salvează PDF în My Files
          </button>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
};

export default DeletePDF;