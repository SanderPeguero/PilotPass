import React, { useState } from 'react';
import { useFlightLog } from '../hooks/useFlightLog';
import { ChevronRight, ChevronLeft, Plane, ClipboardList, Clock } from 'lucide-react';
import BasicInfoStep from './steps/BasicInfoStep';
import FlightDetailsStep from './steps/FlightDetailsStep';
import FlightHoursStep from './steps/FlightHoursStep';
import StepIndicator from './StepIndicator';

const steps = [
  { title: 'Basic Info', icon: Plane },
  { title: 'Flight Details', icon: ClipboardList },
  { title: 'Flight Hours', icon: Clock }
];

export default function FlightLogStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const { flightLog, handleInputChange, handleSubmit } = useFlightLog();

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep flightLog={flightLog} onChange={handleInputChange} />;
      case 1:
        return <FlightDetailsStep flightLog={flightLog} onChange={handleInputChange} />;
      case 2:
        return <FlightHoursStep flightLog={flightLog} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
        <form onSubmit={handleSubmit}>
          {renderStep()}
          
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ml-auto"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors ml-auto"
              >
                Save Flight Log
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}