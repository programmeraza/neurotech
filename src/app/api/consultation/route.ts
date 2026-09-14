import { NextResponse } from 'next/server';

const PROJECT_TYPE_LABELS: Record<string, string> = {
  mobile: 'Мобильное приложение',
  desktop: 'Автоматизация бизнеса',
  web: 'RAG архитектура',
  saas: 'SaaS решение',
  crm: 'CRM / ERP системы',
  ai: 'AI решение',
  other: 'Другое',
};

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured on the server');
    return NextResponse.json({ error: 'Server is not configured' }, { status: 500 });
  }

  let body: { name?: unknown; contact?: unknown; projectType?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
  const projectType = typeof body.projectType === 'string' ? body.projectType : '';

  if (!name || !contact) {
    return NextResponse.json({ error: 'Name and contact are required' }, { status: 400 });
  }

  const typeLabel = PROJECT_TYPE_LABELS[projectType] ?? PROJECT_TYPE_LABELS.other;

  const message = `
<b>🔔 Новая заявка на консультацию!</b>

<b>👤 Имя:</b> ${escapeHtml(name)}
<b>📱 Контакт (TG/Тел):</b> ${escapeHtml(contact)}
<b>💻 Тип проекта:</b> ${escapeHtml(typeLabel)}
  `.trim();

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
    });

    if (!telegramResponse.ok) {
      console.error('Telegram API error', await telegramResponse.text());
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to reach Telegram API', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
  }
}
