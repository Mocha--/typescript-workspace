import styles from './LoadingSpinner.module.css';

/**
 * LoadingSpinner Component
 * 
 * Displays an animated spinner for loading states
 * Uses CSS animations for smooth performance
 */
export function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer} role="status" aria-label="Loading">
      <div className={styles.spinner} aria-hidden="true"></div>
      <span className={styles.srOnly}>Loading tracking information...</span>
    </div>
  );
}
