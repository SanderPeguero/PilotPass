import React, { useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';
import FlightLogStepper from './components/FlightLogStepper';

export default function App() {
  return (
      <div className="min-h-screen bg-[#141e30] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Plane className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white text-center">Flight Hours Logger</h1>
          </div>
          <FlightLogStepper />
        </div>
      </div>
  );
}


const ShadowDomComponent = () => {
  const shadowRootRef = useRef(null);

  useEffect(() => {
    const shadowRoot = shadowRootRef.current.attachShadow({ mode: 'open' });

    // Crear un contenedor para React dentro del Shadow DOM
    const shadowContainer = document.createElement('div');
    shadowRoot.appendChild(shadowContainer);

    // Renderizar el componente React dentro del Shadow DOM
    ReactDOM.createRoot(shadowContainer).render(<NestedComponent />);
  }, []);

  return <div ref={shadowRootRef}></div>;
};