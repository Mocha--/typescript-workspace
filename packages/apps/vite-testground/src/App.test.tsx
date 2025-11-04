import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders Hello World heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /hello world/i });
    expect(heading).toBeInTheDocument();
  });
});
