import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies primary class when primary prop is true', () => {
    render(<Button label="Primary Button" primary />);
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass('storybook-button--primary');
  });

  it('applies size class correctly', () => {
    render(<Button label="Large Button" size="large" />);
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass('storybook-button--large');
  });
});
