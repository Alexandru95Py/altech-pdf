import { useState } from 'react';
import axios from 'axios';

const CVForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    about: '',
    education: '',
    experience: '',
    skills: '',
    languages: '',
    links: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (photo) {
      data.append('photo', photo);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/cv/generate/', data, {
        responseType: 'blob',
      });

      // Descarcă fișierul PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cv.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('A apărut o eroare la generarea CV-ului.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <input name="full_name" placeholder="Nume complet" value={formData.full_name} onChange={handleChange} required />
      <textarea name="about" placeholder="Despre tine" value={formData.about} onChange={handleChange} />
      <textarea name="education" placeholder="Educație" value={formData.education} onChange={handleChange} />
      <textarea name="experience" placeholder="Experiență" value={formData.experience} onChange={handleChange} />
      <textarea name="skills" placeholder="Competențe" value={formData.skills} onChange={handleChange} />
      <textarea name="languages" placeholder="Limbi vorbite" value={formData.languages} onChange={handleChange} />
      <textarea name="links" placeholder="Link-uri utile (LinkedIn, GitHub etc.)" value={formData.links} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" disabled={loading}>
        {loading ? 'Se generează...' : 'Generează CV'}
      </button>
    </form>
  );
};

export default CVForm;