import { Header } from './components/Header';
import { AppGrid } from './components/AppGrid';
import { Navigate, useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate()

  const handleNavigate = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path)
    // Implement actual navigation logic here
  };

  return (
    <div className="min-h-screen w-full bg-[#141e30] px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-5xl">
        <Header />
        <main className="mt-12">
          <AppGrid onNavigate={handleNavigate} />
        </main>
      </div>
    </div>
  );
}

export default App;