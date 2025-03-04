import React from 'react';

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex justify-center items-center space-x-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <div key={step.title} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${isActive ? 'bg-blue-600' : isCompleted ? 'bg-green-600' : 'bg-gray-600'}
                  transition-colors duration-200
                `}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white mt-2">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-1 mx-2 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-600'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}