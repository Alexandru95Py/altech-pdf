import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      {isAuthenticated ? (
        <button
          onClick={logout}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={goToLogin}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      )}

      {/* Conținutul principal */}
      <h1>Welcome to ALTech PDF</h1>
      <p>This is where you’ll find all your PDF tools.</p>
    </div>
  );
};

export default HomePage;