import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StepDatePicker } from '../StepDatePicker';

describe('StepDatePicker', () => {
  const defaultProps = {
    startDate: null as Date | null,
    endDate: null as Date | null,
    onDateSelect: vi.fn(),
    boxPricePerDay: 20,
    boxTitle: 'Standardni Kovček',
    deposit: 150,
    needsHolder: false,
    holderEstimatePricePerDay: 5,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 1, 11));
    defaultProps.onDateSelect.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders calendar and pricing card', () => {
    render(<StepDatePicker {...defaultProps} />);
    expect(screen.getByText('Izberite datum prevzema in vrnitve.')).toBeInTheDocument();
    expect(screen.getByText('Ocena cene')).toBeInTheDocument();
  });

  it('shows "select pickup date" when no dates selected', () => {
    render(<StepDatePicker {...defaultProps} />);
    expect(screen.getByText('Izberite datum prevzema na koledarju.')).toBeInTheDocument();
  });

  it('shows daily rate when no dates selected but box is selected', () => {
    render(<StepDatePicker {...defaultProps} />);
    expect(screen.getByText('Standardni Kovček')).toBeInTheDocument();
    expect(screen.getByText('20€/dan')).toBeInTheDocument();
  });

  it('shows deposit info when box is selected', () => {
    render(<StepDatePicker {...defaultProps} />);
    expect(screen.getByText('Kavcija (vračljiva)')).toBeInTheDocument();
    expect(screen.getByText('150€')).toBeInTheDocument();
  });

  it('shows "no box selected" message when boxPricePerDay is null', () => {
    render(
      <StepDatePicker
        {...defaultProps}
        boxPricePerDay={null}
        boxTitle={null}
        deposit={null}
      />
    );
    expect(screen.getByText('Izberite kovček v koraku 1 za prikaz cene.')).toBeInTheDocument();
  });

  it('shows holder estimate when needsHolder is true', () => {
    render(
      <StepDatePicker {...defaultProps} needsHolder={true} />
    );
    expect(screen.getByText('Nosilci (ocena)')).toBeInTheDocument();
    expect(screen.getByText('od 5€/dan')).toBeInTheDocument();
  });

  it('does not show holder estimate when needsHolder is false', () => {
    render(<StepDatePicker {...defaultProps} />);
    expect(screen.queryByText('Nosilci (ocena)')).not.toBeInTheDocument();
  });

  it('shows discount tiers when no pricing calculated yet', () => {
    render(<StepDatePicker {...defaultProps} />);
    expect(screen.getByText('4–6 dni')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('7–13 dni')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
  });

  it('shows price breakdown when dates are selected', () => {
    const startDate = new Date(2026, 1, 15);
    const endDate = new Date(2026, 1, 22); // 7 days

    render(
      <StepDatePicker
        {...defaultProps}
        startDate={startDate}
        endDate={endDate}
      />
    );

    // Box subtotal: 7 * 20 = 140
    // 10% discount: -14
    // Total: 126
    expect(screen.getByText('126€')).toBeInTheDocument();
  });

  it('shows pickup date when start date is provided', () => {
    render(
      <StepDatePicker
        {...defaultProps}
        startDate={new Date(2026, 1, 15)}
      />
    );

    expect(screen.getByText('Prevzem')).toBeInTheDocument();
    expect(screen.getByText('Izberite datum vrnitve...')).toBeInTheDocument();
  });

  it('shows both dates when range is selected', () => {
    render(
      <StepDatePicker
        {...defaultProps}
        startDate={new Date(2026, 1, 15)}
        endDate={new Date(2026, 1, 20)}
      />
    );

    expect(screen.getByText('Prevzem')).toBeInTheDocument();
    expect(screen.getByText('Vrnitev')).toBeInTheDocument();
  });

  it('shows discount nudge for eligible durations', () => {
    // 5 days → nudge "2 more days for 10%"
    render(
      <StepDatePicker
        {...defaultProps}
        startDate={new Date(2026, 1, 15)}
        endDate={new Date(2026, 1, 20)} // 5 days
      />
    );

    // Should show nudge toward 10%
    expect(screen.getByText(/10% popust/)).toBeInTheDocument();
  });

  it('shows footer note about final pricing', () => {
    render(<StepDatePicker {...defaultProps} />);
    expect(screen.getByText('Končna cena bo potrjena po pregledu vaših potreb.')).toBeInTheDocument();
  });
});
