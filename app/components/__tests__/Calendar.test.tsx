import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from '../Calendar';

describe('Calendar', () => {
  beforeEach(() => {
    // Fix "today" so tests are deterministic
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 1, 11)); // Feb 11, 2026
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders current month and year', () => {
    render(<Calendar />);
    expect(screen.getByText('Februar 2026')).toBeInTheDocument();
  });

  it('renders day name headers', () => {
    render(<Calendar />);
    expect(screen.getByText('Pon')).toBeInTheDocument();
    expect(screen.getByText('Tor')).toBeInTheDocument();
    expect(screen.getByText('Sre')).toBeInTheDocument();
    expect(screen.getByText('Čet')).toBeInTheDocument();
    expect(screen.getByText('Pet')).toBeInTheDocument();
    expect(screen.getByText('Sob')).toBeInTheDocument();
    expect(screen.getByText('Ned')).toBeInTheDocument();
  });

  it('renders days of the month', () => {
    render(<Calendar />);
    // February 2026 has 28 days
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();
  });

  it('navigates to next month', () => {
    render(<Calendar />);
    const nextBtn = screen.getByLabelText('Naslednji mesec');
    fireEvent.click(nextBtn);
    expect(screen.getByText('Marec 2026')).toBeInTheDocument();
  });

  it('navigates to previous month', () => {
    render(<Calendar />);
    const prevBtn = screen.getByLabelText('Prejšnji mesec');
    fireEvent.click(prevBtn);
    expect(screen.getByText('Januar 2026')).toBeInTheDocument();
  });

  it('disables past dates', () => {
    render(<Calendar />);
    // Feb 10, 2026 is yesterday (today is Feb 11)
    const day10 = screen.getByText('10');
    expect(day10).toBeDisabled();
  });

  it('does not disable today or future dates', () => {
    render(<Calendar />);
    const day11 = screen.getByText('11');
    expect(day11).not.toBeDisabled();
    const day15 = screen.getByText('15');
    expect(day15).not.toBeDisabled();
  });

  it('calls onDateSelect with start date on first click', () => {
    const onDateSelect = vi.fn();
    render(<Calendar onDateSelect={onDateSelect} />);

    fireEvent.click(screen.getByText('15'));
    expect(onDateSelect).toHaveBeenCalledWith(
      new Date(2026, 1, 15),
      null
    );
  });

  it('calls onDateSelect with start and end dates on second click', () => {
    const onDateSelect = vi.fn();
    render(<Calendar onDateSelect={onDateSelect} />);

    fireEvent.click(screen.getByText('15'));
    fireEvent.click(screen.getByText('20'));

    expect(onDateSelect).toHaveBeenLastCalledWith(
      new Date(2026, 1, 15),
      new Date(2026, 1, 20)
    );
  });

  it('resets to new start date if end date is before start date', () => {
    const onDateSelect = vi.fn();
    render(<Calendar onDateSelect={onDateSelect} />);

    fireEvent.click(screen.getByText('20')); // start = 20
    fireEvent.click(screen.getByText('15')); // 15 < 20, resets start to 15

    expect(onDateSelect).toHaveBeenLastCalledWith(
      new Date(2026, 1, 15),
      null
    );
  });

  it('resets selection when clicking after range is complete', () => {
    const onDateSelect = vi.fn();
    render(<Calendar onDateSelect={onDateSelect} />);

    fireEvent.click(screen.getByText('15'));
    fireEvent.click(screen.getByText('20'));
    fireEvent.click(screen.getByText('25')); // new selection

    expect(onDateSelect).toHaveBeenLastCalledWith(
      new Date(2026, 1, 25),
      null
    );
  });

  it('calls onHoverDateChange on mouse enter/leave', () => {
    const onHoverDateChange = vi.fn();
    render(<Calendar onHoverDateChange={onHoverDateChange} />);

    const day15 = screen.getByText('15');
    fireEvent.mouseEnter(day15);
    expect(onHoverDateChange).toHaveBeenCalledWith(new Date(2026, 1, 15));

    fireEvent.mouseLeave(day15);
    expect(onHoverDateChange).toHaveBeenCalledWith(null);
  });

  it('does not call onHoverDateChange for disabled dates', () => {
    const onHoverDateChange = vi.fn();
    render(<Calendar onHoverDateChange={onHoverDateChange} />);

    const day5 = screen.getByText('5'); // past, disabled
    fireEvent.mouseEnter(day5);
    expect(onHoverDateChange).not.toHaveBeenCalled();
  });

  it('disables specific unavailable dates', () => {
    const unavailableDates = [new Date(2026, 1, 20)];
    render(<Calendar unavailableDates={unavailableDates} />);

    const day20 = screen.getByText('20');
    expect(day20).toBeDisabled();
  });

  it('does not select unavailable dates', () => {
    const onDateSelect = vi.fn();
    const unavailableDates = [new Date(2026, 1, 20)];
    render(<Calendar onDateSelect={onDateSelect} unavailableDates={unavailableDates} />);

    fireEvent.click(screen.getByText('20'));
    expect(onDateSelect).not.toHaveBeenCalled();
  });

  it('renders the legend', () => {
    render(<Calendar />);
    expect(screen.getByText('Izbrano')).toBeInTheDocument();
    expect(screen.getByText('Obdobje')).toBeInTheDocument();
    expect(screen.getByText('Nedostopno')).toBeInTheDocument();
  });
});
