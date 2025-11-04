import type { Coordinates } from '../../types/tracking';
import styles from './ParcelMap.module.css';

/**
 * ParcelMap Component
 * 
 * Displays a live map showing the current parcel location
 * Uses OpenStreetMap for minimal dependencies
 */
interface ParcelMapProps {
  coordinates: Coordinates | null;
  locationName?: string;
  status?: string;
}

export function ParcelMap({ coordinates, locationName, status }: ParcelMapProps) {
  if (!coordinates) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No location data available</p>
        </div>
      </div>
    );
  }

  // OpenStreetMap embed URL - no API key needed, minimal dependencies
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.longitude - 0.01},${coordinates.latitude - 0.01},${coordinates.longitude + 0.01},${coordinates.latitude + 0.01}&layer=mapnik&marker=${coordinates.latitude},${coordinates.longitude}`;

  return (
    <div className={styles.container}>
      <div className={styles.mapHeader}>
        <h3 className={styles.mapTitle}>Parcel Location</h3>
        {locationName && (
          <p className={styles.mapLocation}>{locationName}</p>
        )}
        {status && (
          <p className={styles.mapStatus}>Status: {status}</p>
        )}
      </div>
      <div className={styles.mapWrapper}>
        <iframe
          className={styles.map}
          title="Parcel location map"
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`Map showing parcel location at ${locationName || 'current location'}`}
        />
      </div>
      <div className={styles.mapFooter}>
        <p className={styles.mapFooterText}>
          Coordinates: {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
        </p>
      </div>
    </div>
  );
}
