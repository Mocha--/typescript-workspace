import type { TrackingInfo, TrackingStatus, StatusUpdate } from '../types/tracking';

/**
 * Mock tracking service that simulates API calls
 * Returns different tracking data based on tracking number
 */

// Mock tracking data for different tracking numbers
const MOCK_TRACKING_DATA: Record<string, TrackingInfo> = {
  'TRACK001': {
    trackingNumber: 'TRACK001',
    currentStatus: 'DELIVERED',
    statusHistory: [
      {
        status: 'ORDER_PLACED',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        location: 'Warehouse A',
        description: 'Order received and confirmed',
      },
      {
        status: 'PROCESSING',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        location: 'Warehouse A',
        description: 'Package is being prepared',
      },
      {
        status: 'SHIPPED',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        location: 'Distribution Center',
        description: 'Package has been shipped',
      },
      {
        status: 'OUT_FOR_DELIVERY',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        location: 'Local Delivery Hub',
        description: 'Package is out for delivery',
      },
      {
        status: 'DELIVERED',
        timestamp: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000), // 12 hours ago
        location: 'Customer Address',
        description: 'Package has been delivered',
      },
    ],
    estimatedDelivery: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000),
    estimatedTimeframes: {
      ORDER_PLACED: 1,
      PROCESSING: 2,
      SHIPPED: 3,
      OUT_FOR_DELIVERY: 1,
      DELIVERED: 0,
    },
  },
  'TRACK002': {
    trackingNumber: 'TRACK002',
    currentStatus: 'OUT_FOR_DELIVERY',
    statusHistory: [
      {
        status: 'ORDER_PLACED',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        location: 'Warehouse B',
        description: 'Order received and confirmed',
      },
      {
        status: 'PROCESSING',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        location: 'Warehouse B',
        description: 'Package is being prepared',
      },
      {
        status: 'SHIPPED',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        location: 'Distribution Center',
        description: 'Package has been shipped',
      },
      {
        status: 'OUT_FOR_DELIVERY',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago - DELAYED
        location: 'Local Delivery Hub',
        description: 'Package is out for delivery',
      },
    ],
    estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    estimatedTimeframes: {
      ORDER_PLACED: 1,
      PROCESSING: 2,
      SHIPPED: 3,
      OUT_FOR_DELIVERY: 1,
      DELIVERED: 0,
    },
  },
  'TRACK003': {
    trackingNumber: 'TRACK003',
    currentStatus: 'PROCESSING',
    statusHistory: [
      {
        status: 'ORDER_PLACED',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        location: 'Warehouse C',
        description: 'Order received and confirmed',
      },
      {
        status: 'PROCESSING',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago - DELAYED
        location: 'Warehouse C',
        description: 'Package is being prepared',
      },
    ],
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    estimatedTimeframes: {
      ORDER_PLACED: 1,
      PROCESSING: 2,
      SHIPPED: 3,
      OUT_FOR_DELIVERY: 1,
      DELIVERED: 0,
    },
  },
};

/**
 * Simulates an API call to fetch tracking information
 * @param trackingNumber - The tracking number to look up
 * @returns Promise that resolves to tracking info or throws error
 */
export async function fetchTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const trackingInfo = MOCK_TRACKING_DATA[trackingNumber.toUpperCase()];

  if (!trackingInfo) {
    throw new Error(`Tracking number "${trackingNumber}" not found. Try TRACK001, TRACK002, or TRACK003`);
  }

  return trackingInfo;
}
