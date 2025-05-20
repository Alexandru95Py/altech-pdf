import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { fetchMyFiles, uploadPDF, deleteFile } from "../services/myfilesService";
import FileList from "../components/Filelist";

interface FileData {
  id: number;
  name: string;
  url: string;
}

const MyFilesPage = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    fetchMyFiles(token)
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => {
        console.error("Eroare la obținerea fișierelor:", error);
      });
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      await uploadPDF(file, token);
      const updatedFiles = await fetchMyFiles(token);
      setFiles(updatedFiles);
    } catch (error) {
      console.error("Eroare la salvare:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      await deleteFile(id, token);
      const updatedFiles = await fetchMyFiles(token);
      setFiles(updatedFiles);
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Fișierele Mele</h2>

      <input type="file" onChange={handleFileChange} />

      <div style={{ margin: "1rem 0" }}>
        <label style={{ marginRight: "1rem" }}>Filtru fișiere:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Toate</option>
          <option value=".pdf">PDF</option>
          <option value=".doc">Word</option>
          <option value=".docx">Word (docx)</option>
          <option value=".xls">Excel</option>
          <option value=".xlsx">Excel (xlsx)</option>
          <option value=".ppt">PowerPoint</option>
          <option value=".pptx">PowerPoint (pptx)</option>
          <option value=".txt">Text</option>
        </select>
      </div>

      <h3>Fișiere salvate:</h3>
      <FileList files={files} filter={filter} onDelete={handleDelete} />
    </div>
  );
};

export default MyFilesPage;