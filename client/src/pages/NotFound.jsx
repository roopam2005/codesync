import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-aurora-purple mb-4">404</h1>
        <p className="text-3xl mb-8">Page Not Found</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-white text-black rounded-2xl hover:scale-105 transition-all font-medium"
        >
          RETURN TO HOME
        </button>
      </div>
    </div>
  );
};

export default NotFound;