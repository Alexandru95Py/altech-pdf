

interface FileItem {
  id: number;
  url: string;
  name: string;
}

interface Props {
  files: FileItem[];
  onDelete: (id: number) => void;
  filter: string;
}

// Funcția care returnează o iconiță în funcție de extensie
const getFileIcon = (filename?: string | undefined) => {
  if (!filename) return '📁'; // Default icon for unknown file type
  // s
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return '📄';
    case 'doc':
    case 'docx':
      return '📝';
    case 'xls':
    case 'xlsx':
      return '📊';
    case 'ppt':
    case 'pptx':
      return '📽️';
    default:
      return '📁';
  }
};

const FileList = ({ files, onDelete, filter }: Props) => {
  const filtered = files.filter((file) => {
    if (filter === "all") return true;
    if (!file.name) return false;
    return file.name.toLowerCase().endsWith(`.${filter}`);
  });

  return (
    <ul>
      {filtered.map((file) => (
        <li key={file.id} style={{ marginBottom: "0.5rem" }}>
          <span style={{ marginRight: "0.5rem" }}>{getFileIcon(file.name)}</span>
          <span>{file.name}</span>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
          <button
            onClick={() => onDelete(file.id)}
            style={{ marginLeft: "1rem" }}
          >
            Șterge
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;