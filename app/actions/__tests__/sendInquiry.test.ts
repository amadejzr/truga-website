import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Resend with a proper class constructor
const mockSend = vi.fn();
vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = { send: mockSend };
  },
}));

describe('sendInquiry', () => {
  const validPayload = {
    boxTitle: 'Standardni Kovček',
    boxSize: '450L',
    boxPricePerDay: 20,
    roofType: 'raised-rails',
    startDate: '15. februar 2026',
    endDate: '22. februar 2026',
    days: 7,
    name: 'Janez Novak',
    email: 'janez@example.com',
    phone: '+386 40 123 456',
    vehicleDescription: 'VW Golf 8, 2021',
    notes: 'Prosim za dostavo.',
    estimatedTotal: 126,
    discountPercent: 10,
    deposit: 150,
  };

  beforeEach(() => {
    vi.resetModules();
    mockSend.mockReset();
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('INQUIRY_EMAIL', 'info@truga.si');
    vi.stubEnv('RESEND_FROM_EMAIL', 'Truga <test@resend.dev>');
  });

  it('sends email successfully with all data', async () => {
    mockSend.mockResolvedValue({ id: 'email_123' });

    const { sendInquiry } = await import('../sendInquiry');
    const result = await sendInquiry(validPayload);

    expect(result).toEqual({ success: true });
    expect(mockSend).toHaveBeenCalledOnce();

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.to).toEqual(['info@truga.si']);
    expect(callArgs.replyTo).toBe('janez@example.com');
    expect(callArgs.subject).toContain('Janez Novak');
    expect(callArgs.subject).toContain('Standardni Kovček');
    expect(callArgs.html).toContain('Janez Novak');
    expect(callArgs.html).toContain('janez@example.com');
    expect(callArgs.html).toContain('+386 40 123 456');
    expect(callArgs.html).toContain('VW Golf 8, 2021');
    expect(callArgs.html).toContain('126€');
    expect(callArgs.html).toContain('10%');
    expect(callArgs.html).toContain('150€');
    expect(callArgs.html).toContain('Prosim za dostavo.');
    expect(callArgs.text).toContain('Janez Novak');
  });

  it('handles email without box selection', async () => {
    mockSend.mockResolvedValue({ id: 'email_456' });

    const { sendInquiry } = await import('../sendInquiry');
    const result = await sendInquiry({
      ...validPayload,
      boxTitle: null,
      boxSize: null,
      boxPricePerDay: null,
      estimatedTotal: null,
      deposit: null,
    });

    expect(result).toEqual({ success: true });
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).toContain('potrebuje svetovanje');
    expect(callArgs.subject).toBe('Novo povpraševanje: Janez Novak');
  });

  it('handles email without notes', async () => {
    mockSend.mockResolvedValue({ id: 'email_789' });

    const { sendInquiry } = await import('../sendInquiry');
    const result = await sendInquiry({ ...validPayload, notes: '' });

    expect(result).toEqual({ success: true });
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).not.toContain('Opombe');
  });

  it('returns error when Resend API fails', async () => {
    mockSend.mockRejectedValue(new Error('API error'));

    const { sendInquiry } = await import('../sendInquiry');
    const result = await sendInquiry(validPayload);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('returns error when RESEND_API_KEY is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '');

    const { sendInquiry } = await import('../sendInquiry');
    const result = await sendInquiry(validPayload);

    expect(result.success).toBe(false);
    expect(result.error).toContain('konfiguriran');
  });

  it('returns error when INQUIRY_EMAIL is missing', async () => {
    vi.stubEnv('INQUIRY_EMAIL', '');

    const { sendInquiry } = await import('../sendInquiry');
    const result = await sendInquiry(validPayload);

    expect(result.success).toBe(false);
    expect(result.error).toContain('konfiguriran');
  });

  it('escapes HTML in user input', async () => {
    mockSend.mockResolvedValue({ id: 'email_xss' });

    const { sendInquiry } = await import('../sendInquiry');
    await sendInquiry({
      ...validPayload,
      name: '<script>alert("xss")</script>',
    });

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).not.toContain('<script>');
    expect(callArgs.html).toContain('&lt;script&gt;');
  });

  it('uses from address from env', async () => {
    mockSend.mockResolvedValue({ id: 'email_from' });

    const { sendInquiry } = await import('../sendInquiry');
    await sendInquiry(validPayload);

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.from).toBe('Truga <test@resend.dev>');
  });

  it('maps roof type to Slovenian label', async () => {
    mockSend.mockResolvedValue({ id: 'email_roof' });

    const { sendInquiry } = await import('../sendInquiry');
    await sendInquiry({
      ...validPayload,
      roofType: 'naked-roof',
    });

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).toContain('Gola streha');
  });
});
