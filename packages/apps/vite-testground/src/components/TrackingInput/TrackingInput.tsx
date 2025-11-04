import { useState, FormEvent, KeyboardEvent } from 'react';
import { useTracking } from '../../context/TrackingContext';
import styles from './TrackingInput.module.css';

/**
 * TrackingInput Component
 * 
 * Handles user input for tracking numbers and submission
 * Includes validation, loading states, and accessibility features
 */
export function TrackingInput() {
  const { searchTracking, isLoading, error, clearTracking } = useTracking();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && inputValue.trim()) {
      await searchTracking(inputValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Allow Escape key to clear
    if (e.key === 'Escape') {
      setInputValue('');
      clearTracking();
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <label htmlFor="tracking-input" className={styles.label}>
          Enter Tracking Number
        </label>
        <div className={styles.inputGroup}>
          <input
            id="tracking-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., TRACK001"
            className={styles.input}
            disabled={isLoading}
            aria-label="Tracking number input"
            aria-describedby={error ? 'tracking-error' : undefined}
            aria-invalid={!!error}
            autoComplete="off"
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || !inputValue.trim()}
            aria-label="Search tracking number"
          >
            {isLoading ? (
              <span className={styles.buttonSpinner} aria-hidden="true"></span>
            ) : (
              <span className={styles.buttonText}>Track</span>
            )}
            {isLoading && <span className={styles.srOnly}>Loading tracking information...</span>}
          </button>
        </div>
        {error && (
          <div id="tracking-error" className={styles.error} role="alert">
            {error}
          </div>
        )}
        <p className={styles.hint}>
          Try: TRACK001, TRACK002, or TRACK003
        </p>
      </form>
    </div>
  );
}
