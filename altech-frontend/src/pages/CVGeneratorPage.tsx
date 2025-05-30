import CVForm from '../components/cv/CVForm';

const CVGeneratorPage = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Generează CV-ul tău PDF</h1>
      <p style={{ marginBottom: '2rem' }}>
        Completează formularul de mai jos și descarcă un CV profesionist în format PDF.
      </p>
      <CVForm />
    </div>
  );
};

export default CVGeneratorPage;