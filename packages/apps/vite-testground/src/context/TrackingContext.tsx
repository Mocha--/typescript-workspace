import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { TrackingInfo } from '../types/tracking';
import { fetchTrackingInfo } from '../services/mockTrackingService';

/**
 * Context for managing tracking state across the application
 */

interface TrackingContextType {
  trackingInfo: TrackingInfo | null;
  isLoading: boolean;
  error: string | null;
  searchTracking: (trackingNumber: string) => Promise<void>;
  clearTracking: () => void;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

/**
 * Provider component that manages tracking state
 */
export function TrackingProvider({ children }: { children: ReactNode }) {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTracking = useCallback(async (trackingNumber: string) => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTrackingInfo(null);

    try {
      const info = await fetchTrackingInfo(trackingNumber.trim());
      setTrackingInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tracking information');
      setTrackingInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearTracking = useCallback(() => {
    setTrackingInfo(null);
    setError(null);
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        trackingInfo,
        isLoading,
        error,
        searchTracking,
        clearTracking,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

/**
 * Hook to access tracking context
 */
export function useTracking() {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
}
