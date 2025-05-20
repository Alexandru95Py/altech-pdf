import { useState } from "react";
import type { ChangeEvent } from "react";
import { uploadPDF } from "../../services/myfilesService";


const ViewFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setFileUrl(URL.createObjectURL(selected));
      setUploadSuccess(null);
    }
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("access");
    if (!token || !file) return;

    console.log("Token:", token);

    try {
      
      await uploadPDF(file, token);
      setUploadSuccess("Fișierul a fost salvat cu succes!");
    } catch (error) {
      console.error("Eroare la salvare:", error);
      setUploadSuccess("Eroare la salvare!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Vizualizare fișier</h2>
      <p>Selectează un fișier (PDF, Word, Excel, PowerPoint etc.)</p>

      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
      />

      {file && (
        <>
          <div style={{ marginTop: "1rem" }}>
            <p><strong>Fișier selectat:</strong> {file.name}</p>
            <iframe
              src={fileUrl || ""}
              title="Vizualizare fișier"
              width="100%"
              height="600px"
              style={{ border: "1px solid #ccc" }}
            ></iframe>
          </div>

          <button onClick={handleUpload} style={{ marginTop: "1rem" }}>
            Salvează în My Files
          </button>
        </>
      )}

      {uploadSuccess && <p style={{ color: "green" }}>{uploadSuccess}</p>}
    </div>
  );
};

export default ViewFile;