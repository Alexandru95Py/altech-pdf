
import { useNavigate } from 'react-router-dom';

const tools = [
  {
    name: 'Vizualizează PDF',
    path: '/tools/view',
    description: 'Deschide și citește fișiere PDF'
  },
  {
    name: 'Șterge pagini PDF',
    path: '/tools/delete',
    description: 'Elimină pagini din fișierele tale PDF'
  },
  {
    name: 'Reordonează PDF',
    path: '/tools/reorder',
    description: 'Modifică ordinea paginilor dintr-un PDF'
  },
  {
    name: 'Împarte PDF',
    path: '/tools/split',
    description: 'Împarte fișierul PDF în mai multe documente'
  },
  {
    name: 'Îmbină PDF-uri',
    path: '/tools/merge',
    description: 'Combină mai multe fișiere PDF într-unul singur'
  },
  {
    name: 'Conversie PDF',
    path: '/tools/convert',
    description: 'Transformă fișiere PDF în alte formate'
  },
  {
    name: 'Completează & Semnează PDF',
    path: '/tools/FillandSignPDF',
    description: 'Completează formulare PDF și adaugă semnătura ta digitală'
  },
];

const ToolsPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Unelte PDF</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool.path}
            onClick={() => navigate(tool.path)}
            style={{
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;