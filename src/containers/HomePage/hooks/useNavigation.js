import { useCallback } from 'react';

export function useNavigation() {
  const navigate = useCallback((path) => {
    console.log(`Navigating to: ${path}`);
    // Implement actual navigation logic here
  }, []);

  return { navigate };
}