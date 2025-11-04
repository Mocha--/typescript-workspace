/**
 * Parcel tracking status types
 */

export type TrackingStatus =
  | 'ORDER_PLACED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED';

/**
 * Geographic coordinates for map display
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Represents a single status update in the tracking history
 */
export interface StatusUpdate {
  status: TrackingStatus;
  timestamp: Date;
  location?: string;
  description?: string;
  coordinates?: Coordinates;
}

/**
 * Complete tracking information for a parcel
 */
export interface TrackingInfo {
  trackingNumber: string;
  currentStatus: TrackingStatus;
  statusHistory: StatusUpdate[];
  estimatedDelivery?: Date;
  // Timeframe estimates for each stage (in days)
  estimatedTimeframes: {
    [key in TrackingStatus]?: number;
  };
}

/**
 * Status display configuration
 */
export interface StatusDisplayConfig {
  label: string;
  estimatedDays: number;
  isDelayed: boolean; // true if status hasn't changed for more than 2 days
}
