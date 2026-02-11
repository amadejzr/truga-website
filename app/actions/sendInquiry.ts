'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ROOF_TYPE_LABELS: Record<string, string> = {
  'naked-roof': 'Navadna streha',
  'flush-rails': 'Poravnane letve',
  'raised-rails': 'Dvignjene letve',
  'fixed-points': 'Fiksne točke',
  'unsure': 'Ne vem',
  'other': 'Drugo',
};

interface InquiryPayload {
  boxTitle: string | null;
  boxSize: string | null;
  boxPricePerDay: number | null;
  roofType: string | null;
  roofTypeOther: string | null;
  startDate: string;
  endDate: string;
  days: number;
  name: string;
  email: string;
  phone: string;
  vehicleDescription: string;
  notes: string;
  estimatedTotal: number | null;
  discountPercent: number;
  deposit: number | null;
}

export async function sendInquiry(payload: InquiryPayload): Promise<{ success: boolean; error?: string }> {
  const recipientEmail = process.env.INQUIRY_EMAIL;

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return { success: false, error: 'Email ni konfiguriran. Prosimo, kontaktirajte nas neposredno.' };
  }

  if (!recipientEmail) {
    console.error('INQUIRY_EMAIL is not configured');
    return { success: false, error: 'Email ni konfiguriran. Prosimo, kontaktirajte nas neposredno.' };
  }

  const roofBaseLabel = payload.roofType ? (ROOF_TYPE_LABELS[payload.roofType] ?? payload.roofType) : 'Ni izbrano';
  const roofLabel = payload.roofType === 'other' && payload.roofTypeOther
    ? `${roofBaseLabel}: ${payload.roofTypeOther}`
    : roofBaseLabel;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #fafaf9; border-radius: 16px; overflow: hidden; border: 1px solid #e7e5e4;">
      <div style="background: linear-gradient(135deg, #27272a, #166534); padding: 24px 32px; color: #fafaf9;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 700;">Novo Povpraševanje</h1>
        <p style="margin: 8px 0 0; font-size: 14px; color: #d6d3d1;">Truga - Najem Strešnih Kovčkov</p>
      </div>

      <div style="padding: 24px 32px;">
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #78716c; margin: 0 0 12px;">Kontakt</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #78716c; width: 120px;">Ime:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #1c1917;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Email:</td>
            <td style="padding: 8px 0; color: #1c1917;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #166534;">${escapeHtml(payload.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Telefon:</td>
            <td style="padding: 8px 0; color: #1c1917;"><a href="tel:${escapeHtml(payload.phone)}" style="color: #166534;">${escapeHtml(payload.phone)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Vozilo:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #1c1917;">${escapeHtml(payload.vehicleDescription)}</td>
          </tr>
        </table>

        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #78716c; margin: 0 0 12px;">Rezervacija</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          ${payload.boxTitle ? `
          <tr>
            <td style="padding: 8px 0; color: #78716c; width: 120px;">Kovček:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #1c1917;">${escapeHtml(payload.boxTitle)} (${escapeHtml(payload.boxSize ?? '')}) — ${payload.boxPricePerDay}€/dan</td>
          </tr>
          ` : `
          <tr>
            <td style="padding: 8px 0; color: #78716c; width: 120px;">Kovček:</td>
            <td style="padding: 8px 0; color: #a8a29e; font-style: italic;">Ni izbran — potrebuje svetovanje</td>
          </tr>
          `}
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Tip strehe:</td>
            <td style="padding: 8px 0; color: #1c1917;">${escapeHtml(roofLabel)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Prevzem:</td>
            <td style="padding: 8px 0; color: #1c1917;">${escapeHtml(payload.startDate)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Vrnitev:</td>
            <td style="padding: 8px 0; color: #1c1917;">${escapeHtml(payload.endDate)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Trajanje:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #1c1917;">${payload.days} dni</td>
          </tr>
        </table>

        ${payload.estimatedTotal !== null ? `
        <div style="background: linear-gradient(135deg, #27272a, #14532d); border-radius: 12px; padding: 16px 20px; color: #fafaf9; margin-bottom: 24px;">
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #d6d3d1; margin: 0 0 8px;">Ocena cene</h2>
          <div style="font-size: 28px; font-weight: 700;">${payload.estimatedTotal}€</div>
          ${payload.discountPercent > 0 ? `<div style="font-size: 13px; color: #86efac; margin-top: 4px;">Vključen ${payload.discountPercent}% popust</div>` : ''}
          ${payload.deposit ? `<div style="font-size: 13px; color: #a8a29e; margin-top: 4px;">Kavcija: ${payload.deposit}€ (vračljiva)</div>` : ''}
        </div>
        ` : ''}

        ${payload.notes.trim() ? `
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #78716c; margin: 0 0 12px;">Opombe</h2>
        <div style="background: #f5f5f4; border-radius: 8px; padding: 12px 16px; color: #44403c; font-size: 14px; margin-bottom: 24px;">
          ${escapeHtml(payload.notes)}
        </div>
        ` : ''}
      </div>

      <div style="padding: 16px 32px; background: #f5f5f4; border-top: 1px solid #e7e5e4; font-size: 12px; color: #a8a29e; text-align: center;">
        Poslano preko truga.si rezervacijskega sistema
      </div>
    </div>
  `;

  const textBody = [
    'NOVO POVPRAŠEVANJE — Truga',
    '',
    '--- Kontakt ---',
    `Ime: ${payload.name}`,
    `Email: ${payload.email}`,
    `Telefon: ${payload.phone}`,
    `Vozilo: ${payload.vehicleDescription}`,
    '',
    '--- Rezervacija ---',
    `Kovček: ${payload.boxTitle ?? 'Ni izbran'} ${payload.boxSize ? `(${payload.boxSize})` : ''}`,
    `Tip strehe: ${roofLabel}`,
    `Prevzem: ${payload.startDate}`,
    `Vrnitev: ${payload.endDate}`,
    `Trajanje: ${payload.days} dni`,
    '',
    payload.estimatedTotal !== null
      ? `Ocena cene: ${payload.estimatedTotal}€${payload.discountPercent > 0 ? ` (${payload.discountPercent}% popust)` : ''}${payload.deposit ? ` + ${payload.deposit}€ kavcija` : ''}`
      : '',
    '',
    payload.notes.trim() ? `Opombe: ${payload.notes}` : '',
  ].filter(Boolean).join('\n');

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'Truga <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: payload.email,
      subject: `Novo povpraševanje: ${payload.name}${payload.boxTitle ? ` — ${payload.boxTitle}` : ''}`,
      html: htmlBody,
      text: textBody,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send inquiry email:', error);
    return { success: false, error: 'Pošiljanje ni uspelo. Prosimo, poskusite znova.' };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
