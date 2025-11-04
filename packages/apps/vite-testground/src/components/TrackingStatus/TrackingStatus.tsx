import { useTracking } from '../../context/TrackingContext';
import type { TrackingStatus } from '../../types/tracking';
import styles from './TrackingStatus.module.css';
import { useEffect, useState } from 'react';

/**
 * TrackingStatus Component
 *
 * Displays parcel tracking status in a timeline/wizard format
 * Shows all status stages with completed, current, and pending states
 * Highlights delayed statuses (more than 2 days in same status)
 * Includes animations for smooth page entry
 */
export function TrackingStatus() {
  const { trackingInfo } = useTracking();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation when tracking info is loaded
    if (trackingInfo) {
      setIsVisible(false);
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [trackingInfo]);

  if (!trackingInfo) {
    return null;
  }

  const statuses: TrackingStatus[] = [
    'ORDER_PLACED',
    'PROCESSING',
    'SHIPPED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
  ];

  const getStatusIndex = (status: TrackingStatus): number => {
    return statuses.indexOf(status);
  };

  const getStatusUpdate = (status: TrackingStatus) => {
    return trackingInfo.statusHistory.find((update) => update.status === status);
  };

  const isStatusCompleted = (status: TrackingStatus): boolean => {
    const currentIndex = getStatusIndex(trackingInfo.currentStatus);
    const statusIndex = getStatusIndex(status);
    return statusIndex <= currentIndex;
  };

  const isStatusDelayed = (status: TrackingStatus): boolean => {
    if (status !== trackingInfo.currentStatus) {
      return false;
    }
    const statusUpdate = getStatusUpdate(status);
    if (!statusUpdate) {
      return false;
    }
    const daysSinceUpdate = (Date.now() - statusUpdate.timestamp.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate > 2;
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const formatTimeframe = (days: number): string => {
    if (days === 0) {
      return 'Same day';
    }
    if (days === 1) {
      return '1 day';
    }
    return `${days} days`;
  };

  /**
   * Calculate how far away a status is (in days and steps)
   * Returns an object with days and steps information
   */
  const getDistanceFromStatus = (status: TrackingStatus): { days: number; steps: number } | null => {
    const currentIndex = getStatusIndex(trackingInfo.currentStatus);
    const statusIndex = getStatusIndex(status);

    // For completed or current status, calculate how long it's been
    if (statusIndex <= currentIndex) {
      const statusUpdate = getStatusUpdate(status);
      if (statusUpdate) {
        const daysSince = Math.floor(
          (Date.now() - statusUpdate.timestamp.getTime()) / (1000 * 60 * 60 * 24)
        );
        return { days: daysSince, steps: 0 };
      }
      return null;
    }

    // For pending statuses, calculate how far away
    let totalDays = 0;
    const stepsAway = statusIndex - currentIndex;

    // Calculate days from current status to target status
    for (let i = currentIndex; i < statusIndex; i++) {
      const statusKey = statuses[i + 1] as TrackingStatus;
      const daysForStatus = trackingInfo.estimatedTimeframes[statusKey] || 0;
      totalDays += daysForStatus;
    }

    return { days: totalDays, steps: stepsAway };
  };

  /**
   * Format how far away a step is in a human-readable way
   */
  const formatDistance = (status: TrackingStatus): string => {
    const distance = getDistanceFromStatus(status);
    if (!distance) {
      return '';
    }

    const { days, steps } = distance;
    const currentIndex = getStatusIndex(trackingInfo.currentStatus);
    const statusIndex = getStatusIndex(status);

    // For completed steps
    if (statusIndex < currentIndex) {
      if (days === 0) {
        return 'Completed today';
      }
      if (days === 1) {
        return 'Completed 1 day ago';
      }
      return `Completed ${days} days ago`;
    }

    // For current step
    if (statusIndex === currentIndex) {
      if (days === 0) {
        return 'Started today';
      }
      if (days === 1) {
        return 'Started 1 day ago';
      }
      return `Started ${days} days ago`;
    }

    // For pending steps
    const parts: string[] = [];
    if (steps > 0) {
      parts.push(`${steps} ${steps === 1 ? 'step' : 'steps'} away`);
    }
    if (days > 0) {
      parts.push(`${days} ${days === 1 ? 'day' : 'days'} away`);
    }

    return parts.length > 0 ? parts.join(' • ') : 'Pending';
  };

  return (
    <div
      className={`${styles.container} ${isVisible ? styles.visible : ''}`}
      role="region"
      aria-label="Tracking status timeline"
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Tracking: {trackingInfo.trackingNumber}</h2>
        {trackingInfo.estimatedDelivery && trackingInfo.currentStatus !== 'DELIVERED' && (
          <p className={styles.estimatedDelivery}>
            Estimated Delivery: {formatDate(trackingInfo.estimatedDelivery)}
          </p>
        )}
      </div>

      <ol className={styles.timeline} role="list">
        {statuses.map((status, index) => {
          const statusUpdate = getStatusUpdate(status);
          const isCompleted = isStatusCompleted(status);
          const isCurrent = status === trackingInfo.currentStatus;
          const isDelayed = isStatusDelayed(status);
          const estimatedDays = trackingInfo.estimatedTimeframes[status] || 0;

          return (
            <li
              key={status}
              className={`${styles.timelineItem} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''} ${isDelayed ? styles.delayed : ''}`}
              role="listitem"
            >
              <div className={styles.statusIndicator}>
                <div className={styles.circle} aria-hidden="true">
                  {isCompleted && (
                    <svg
                      className={styles.checkmark}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                {index < statuses.length - 1 && (
                  <div
                    className={`${styles.connector} ${isCompleted ? styles.connectorCompleted : ''}`}
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className={styles.statusContent}>
                <div className={styles.statusHeader}>
                  <h3 className={styles.statusTitle}>{getStatusLabel(status)}</h3>
                  {isDelayed && (
                    <span className={styles.delayBadge} role="alert" aria-label="Status delayed">
                      ⚠️ Delayed
                    </span>
                  )}
                </div>

                {statusUpdate && (
                  <div className={styles.statusDetails}>
                    <p className={styles.statusDescription}>{statusUpdate.description}</p>
                    {statusUpdate.location && (
                      <p className={styles.statusLocation}>📍 {statusUpdate.location}</p>
                    )}
                    <p className={styles.statusTimestamp}>
                      {formatDate(statusUpdate.timestamp)}
                    </p>
                  </div>
                )}

                {/* Show how far away this step is */}
                <p className={styles.distanceInfo}>
                  {formatDistance(status)}
                </p>

                {!statusUpdate && !isCompleted && (
                  <p className={styles.statusDescription}>
                    Estimated timeframe: {formatTimeframe(estimatedDays)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Get human-readable label for a status
 */
function getStatusLabel(status: TrackingStatus): string {
  const labels: Record<TrackingStatus, string> = {
    ORDER_PLACED: 'Order Placed',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
  };
  return labels[status];
}
