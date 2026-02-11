import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReservationModal } from '../ReservationModal';

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, unoptimized, ...rest } = props;
    return <img {...rest} />;
  },
}));

// Mock sendInquiry server action
const mockSendInquiry = vi.fn();
vi.mock('../../actions/sendInquiry', () => ({
  sendInquiry: (...args: unknown[]) => mockSendInquiry(...args),
}));

describe('ReservationModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 1, 11)); // Feb 11, 2026
    mockSendInquiry.mockReset();
    defaultProps.onClose.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /** Select a box on step 1 and advance to step 2 */
  function selectBoxAndAdvance() {
    fireEvent.click(screen.getByText('Standardni Kovček'));
    fireEvent.click(screen.getByText('Naprej'));
  }

  it('renders nothing when not open', () => {
    const { container } = render(
      <ReservationModal isOpen={false} onClose={vi.fn()} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders step 1 when open', () => {
    render(<ReservationModal {...defaultProps} />);
    expect(screen.getByText('Izberite Strešni Kovček')).toBeInTheDocument();
    expect(screen.getByText('Korak 1 od 5')).toBeInTheDocument();
  });

  it('shows all 4 roof box options on step 1', () => {
    render(<ReservationModal {...defaultProps} />);
    expect(screen.getByText('Kompaktni Kovček')).toBeInTheDocument();
    expect(screen.getByText('Standardni Kovček')).toBeInTheDocument();
    expect(screen.getByText('Družinski Kovček')).toBeInTheDocument();
    expect(screen.getByText('Premium XL')).toBeInTheDocument();
  });

  it('disables Naprej on step 1 until a box is selected', () => {
    render(<ReservationModal {...defaultProps} />);
    expect(screen.getByText('Naprej')).toBeDisabled();

    fireEvent.click(screen.getByText('Kompaktni Kovček'));
    expect(screen.getByText('Naprej')).not.toBeDisabled();
  });

  it('disables Naprej again when box is deselected', () => {
    render(<ReservationModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Kompaktni Kovček'));
    expect(screen.getByText('Naprej')).not.toBeDisabled();

    // Toggle off (click same box again)
    fireEvent.click(screen.getByText('Kompaktni Kovček'));
    expect(screen.getByText('Naprej')).toBeDisabled();
  });

  it('advances to step 2 after selecting a box', () => {
    render(<ReservationModal {...defaultProps} />);
    selectBoxAndAdvance();
    expect(screen.getByText('Tip Strehe')).toBeInTheDocument();
    expect(screen.getByText('Korak 2 od 5')).toBeInTheDocument();
  });

  it('shows Nazaj button from step 2 onward', () => {
    render(<ReservationModal {...defaultProps} />);
    expect(screen.queryByText('Nazaj')).not.toBeInTheDocument();

    selectBoxAndAdvance();
    expect(screen.getByText('Nazaj')).toBeInTheDocument();
  });

  it('goes back to step 1 from step 2', () => {
    render(<ReservationModal {...defaultProps} />);
    selectBoxAndAdvance();
    fireEvent.click(screen.getByText('Nazaj'));
    expect(screen.getByText('Izberite Strešni Kovček')).toBeInTheDocument();
  });

  it('disables Naprej on step 2 until roof type selected', () => {
    render(<ReservationModal {...defaultProps} />);
    selectBoxAndAdvance();

    const nextBtn = screen.getByText('Naprej');
    expect(nextBtn).toBeDisabled();
  });

  it('enables Naprej on step 2 after selecting roof type', () => {
    render(<ReservationModal {...defaultProps} />);
    selectBoxAndAdvance();

    fireEvent.click(screen.getByText('Gola streha'));
    expect(screen.getByText('Naprej')).not.toBeDisabled();
  });

  it('advances through steps 1-2-3', () => {
    render(<ReservationModal {...defaultProps} />);

    // Step 1 -> 2
    selectBoxAndAdvance();
    expect(screen.getByText('Tip Strehe')).toBeInTheDocument();

    // Step 2: select roof type -> 3
    fireEvent.click(screen.getByText('Gola streha'));
    fireEvent.click(screen.getByText('Naprej'));
    expect(screen.getByText('Izberite Datum')).toBeInTheDocument();
  });

  it('disables Naprej on step 3 until dates selected', () => {
    render(<ReservationModal {...defaultProps} />);
    selectBoxAndAdvance();
    fireEvent.click(screen.getByText('Gola streha'));
    fireEvent.click(screen.getByText('Naprej')); // -> step 3

    const nextBtn = screen.getByText('Naprej');
    expect(nextBtn).toBeDisabled();
  });

  it('clears dates when going back from step 3', () => {
    render(<ReservationModal {...defaultProps} />);
    selectBoxAndAdvance();
    fireEvent.click(screen.getByText('Gola streha'));
    fireEvent.click(screen.getByText('Naprej')); // -> step 3

    // Select dates
    fireEvent.click(screen.getByText('15'));
    fireEvent.click(screen.getByText('20'));

    const nextBtn = screen.getByText('Naprej');
    expect(nextBtn).not.toBeDisabled();

    // Go back
    fireEvent.click(screen.getByText('Nazaj')); // -> step 2

    // Go forward again
    fireEvent.click(screen.getByText('Naprej')); // -> step 3

    // Naprej should be disabled again (dates cleared)
    expect(screen.getByText('Naprej')).toBeDisabled();
  });

  it('closes modal when X button is clicked', () => {
    render(<ReservationModal {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Zapri'));
    expect(defaultProps.onClose).toHaveBeenCalledOnce();
  });

  it('pre-selects box when preSelection is provided', () => {
    render(
      <ReservationModal {...defaultProps} preSelection={{ boxId: 2 }} />
    );
    // Naprej should be enabled since box is pre-selected
    expect(screen.getByText('Naprej')).not.toBeDisabled();
  });

  describe('full wizard flow to submission', () => {
    it('completes the full flow and submits inquiry', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      mockSendInquiry.mockResolvedValue({ success: true });

      render(<ReservationModal {...defaultProps} />);

      // Step 1: Select a box
      fireEvent.click(screen.getByText('Standardni Kovček'));
      fireEvent.click(screen.getByText('Naprej'));

      // Step 2: Select roof type
      fireEvent.click(screen.getByText('Gola streha'));
      fireEvent.click(screen.getByText('Naprej'));

      // Step 3: Select dates
      fireEvent.click(screen.getByText('15'));
      fireEvent.click(screen.getByText('20'));
      fireEvent.click(screen.getByText('Naprej'));

      // Step 4: Fill customer details
      await user.type(screen.getByPlaceholderText('Janez Novak'), 'Janez Novak');
      await user.type(screen.getByPlaceholderText('janez.novak@email.si'), 'janez@test.si');
      await user.type(screen.getByPlaceholderText('+386 40 123 456'), '040123456');
      await user.type(screen.getByPlaceholderText('npr. VW Golf 8, 2021'), 'VW Golf 8');

      fireEvent.click(screen.getByText('Naprej'));

      // Step 5: Summary
      expect(screen.getByText('Pregled Povpraševanja')).toBeInTheDocument();
      expect(screen.getByText('Standardni Kovček')).toBeInTheDocument();
      expect(screen.getByText('Gola streha')).toBeInTheDocument();
      expect(screen.getByText('Janez Novak')).toBeInTheDocument();
      expect(screen.getByText('janez@test.si')).toBeInTheDocument();

      // Submit
      fireEvent.click(screen.getByText('Pošlji Povpraševanje'));

      await waitFor(() => {
        expect(mockSendInquiry).toHaveBeenCalledOnce();
      });

      const payload = mockSendInquiry.mock.calls[0][0];
      expect(payload.name).toBe('Janez Novak');
      expect(payload.email).toBe('janez@test.si');
      expect(payload.boxTitle).toBe('Standardni Kovček');
      expect(payload.roofType).toBe('naked-roof');
      expect(payload.days).toBe(5);

      // Should show success screen
      await waitFor(() => {
        expect(screen.getByText('Povpraševanje oddano!')).toBeInTheDocument();
      });

      expect(screen.getByText('janez@test.si')).toBeInTheDocument();
    });

    it('shows error message on submission failure', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      mockSendInquiry.mockResolvedValue({
        success: false,
        error: 'Pošiljanje ni uspelo.',
      });

      render(<ReservationModal {...defaultProps} />);

      // Navigate through steps
      selectBoxAndAdvance();
      fireEvent.click(screen.getByText('Gola streha'));
      fireEvent.click(screen.getByText('Naprej')); // -> step 3
      fireEvent.click(screen.getByText('15'));
      fireEvent.click(screen.getByText('20'));
      fireEvent.click(screen.getByText('Naprej')); // -> step 4

      await user.type(screen.getByPlaceholderText('Janez Novak'), 'Test');
      await user.type(screen.getByPlaceholderText('janez.novak@email.si'), 'a@b.si');
      await user.type(screen.getByPlaceholderText('+386 40 123 456'), '040');
      await user.type(screen.getByPlaceholderText('npr. VW Golf 8, 2021'), 'Car');

      fireEvent.click(screen.getByText('Naprej')); // -> step 5

      // Submit
      fireEvent.click(screen.getByText('Pošlji Povpraševanje'));

      await waitFor(() => {
        expect(screen.getByText('Pošiljanje ni uspelo.')).toBeInTheDocument();
      });

      // Should still show the submit button for retry
      expect(screen.getByText('Pošlji Povpraševanje')).toBeInTheDocument();
    });

    it('shows loading state during submission', async () => {
      // Make sendInquiry hang
      mockSendInquiry.mockImplementation(
        () => new Promise(() => {}) // never resolves
      );

      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ReservationModal {...defaultProps} />);

      // Navigate through steps
      selectBoxAndAdvance();
      fireEvent.click(screen.getByText('Gola streha'));
      fireEvent.click(screen.getByText('Naprej'));
      fireEvent.click(screen.getByText('15'));
      fireEvent.click(screen.getByText('20'));
      fireEvent.click(screen.getByText('Naprej'));

      await user.type(screen.getByPlaceholderText('Janez Novak'), 'Test');
      await user.type(screen.getByPlaceholderText('janez.novak@email.si'), 'a@b.si');
      await user.type(screen.getByPlaceholderText('+386 40 123 456'), '040');
      await user.type(screen.getByPlaceholderText('npr. VW Golf 8, 2021'), 'Car');

      fireEvent.click(screen.getByText('Naprej'));

      // Submit
      fireEvent.click(screen.getByText('Pošlji Povpraševanje'));

      await waitFor(() => {
        expect(screen.getByText('Pošiljam...')).toBeInTheDocument();
      });
    });

    it('closes modal from success screen', async () => {
      mockSendInquiry.mockResolvedValue({ success: true });
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(<ReservationModal {...defaultProps} />);

      // Navigate to end
      selectBoxAndAdvance();
      fireEvent.click(screen.getByText('Gola streha'));
      fireEvent.click(screen.getByText('Naprej'));
      fireEvent.click(screen.getByText('15'));
      fireEvent.click(screen.getByText('20'));
      fireEvent.click(screen.getByText('Naprej'));

      await user.type(screen.getByPlaceholderText('Janez Novak'), 'Test');
      await user.type(screen.getByPlaceholderText('janez.novak@email.si'), 'a@b.si');
      await user.type(screen.getByPlaceholderText('+386 40 123 456'), '040');
      await user.type(screen.getByPlaceholderText('npr. VW Golf 8, 2021'), 'Car');

      fireEvent.click(screen.getByText('Naprej'));
      fireEvent.click(screen.getByText('Pošlji Povpraševanje'));

      await waitFor(() => {
        expect(screen.getByText('Povpraševanje oddano!')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Zapri'));
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  describe('step 4 validation', () => {
    async function navigateToStep4() {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ReservationModal {...defaultProps} />);

      selectBoxAndAdvance();
      fireEvent.click(screen.getByText('Gola streha'));
      fireEvent.click(screen.getByText('Naprej'));
      fireEvent.click(screen.getByText('15'));
      fireEvent.click(screen.getByText('20'));
      fireEvent.click(screen.getByText('Naprej'));

      return user;
    }

    it('disables Naprej when fields are empty', async () => {
      await navigateToStep4();
      expect(screen.getByText('Naprej')).toBeDisabled();
    });

    it('enables Naprej when all required fields are filled', async () => {
      const user = await navigateToStep4();

      await user.type(screen.getByPlaceholderText('Janez Novak'), 'Test');
      await user.type(screen.getByPlaceholderText('janez.novak@email.si'), 'a@b.si');
      await user.type(screen.getByPlaceholderText('+386 40 123 456'), '040');
      await user.type(screen.getByPlaceholderText('npr. VW Golf 8, 2021'), 'Car');

      expect(screen.getByText('Naprej')).not.toBeDisabled();
    });

    it('disables Naprej if any required field is whitespace only', async () => {
      const user = await navigateToStep4();

      await user.type(screen.getByPlaceholderText('Janez Novak'), '   ');
      await user.type(screen.getByPlaceholderText('janez.novak@email.si'), 'a@b.si');
      await user.type(screen.getByPlaceholderText('+386 40 123 456'), '040');
      await user.type(screen.getByPlaceholderText('npr. VW Golf 8, 2021'), 'Car');

      expect(screen.getByText('Naprej')).toBeDisabled();
    });
  });

  describe('step 5 summary', () => {
    async function navigateToStep5() {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ReservationModal {...defaultProps} />);

      // Step 1: select box
      fireEvent.click(screen.getByText('Kompaktni Kovček'));
      fireEvent.click(screen.getByText('Naprej'));

      // Step 2: select roof type
      fireEvent.click(screen.getByText('Že imam nosilce'));
      fireEvent.click(screen.getByText('Naprej'));

      // Step 3: select dates
      fireEvent.click(screen.getByText('15'));
      fireEvent.click(screen.getByText('22'));
      fireEvent.click(screen.getByText('Naprej'));

      // Step 4: fill details
      await user.type(screen.getByPlaceholderText('Janez Novak'), 'Ana Krajnc');
      await user.type(screen.getByPlaceholderText('janez.novak@email.si'), 'ana@test.si');
      await user.type(screen.getByPlaceholderText('+386 40 123 456'), '041555666');
      await user.type(screen.getByPlaceholderText('npr. VW Golf 8, 2021'), 'Renault Clio');
      fireEvent.click(screen.getByText('Naprej'));

      return user;
    }

    it('shows all selected data in summary', async () => {
      await navigateToStep5();

      expect(screen.getByText('Pregled Povpraševanja')).toBeInTheDocument();
      expect(screen.getByText('Kompaktni Kovček')).toBeInTheDocument();
      expect(screen.getByText('Že imam nosilce')).toBeInTheDocument();
      expect(screen.getByText('Ana Krajnc')).toBeInTheDocument();
      expect(screen.getByText('ana@test.si')).toBeInTheDocument();
      expect(screen.getByText('041555666')).toBeInTheDocument();
      expect(screen.getByText('Renault Clio')).toBeInTheDocument();
    });

    it('shows edit buttons that navigate to correct steps', async () => {
      await navigateToStep5();

      const editButtons = screen.getAllByText('Uredi');
      expect(editButtons.length).toBeGreaterThanOrEqual(4);

      // Click the first "Uredi" (box edit) — goes to step 1
      fireEvent.click(editButtons[0]);
      expect(screen.getByText('Izberite Strešni Kovček')).toBeInTheDocument();
    });

    it('shows pricing when box is selected', async () => {
      await navigateToStep5();

      // Should show the price estimate section
      expect(screen.getByText('Ocena cene')).toBeInTheDocument();
    });
  });
});
