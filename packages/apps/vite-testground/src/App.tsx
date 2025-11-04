import { TrackingProvider } from './context/TrackingContext';
import { TrackingInput } from './components/TrackingInput/TrackingInput';
import { TrackingStatus } from './components/TrackingStatus/TrackingStatus';
import styles from './App.module.css';

/**
 * App Component
 * 
 * Main application component that sets up the tracking context
 * and renders the tracking input and status components
 */
export function App() {
  return (
    <TrackingProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1 className={styles.title}>Parcel Tracking</h1>
          <p className={styles.subtitle}>Track your package delivery status</p>
        </header>
        <main className={styles.main}>
          <TrackingInput />
          <TrackingStatus />
        </main>
      </div>
    </TrackingProvider>
  );
}
