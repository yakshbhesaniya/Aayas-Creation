import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/* Escape user input to avoid HTML injection */
function escapeHtml(text: string) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, businessName, quantity, email, phone, message } = body;

        if (!name || !email || !quantity) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
        }

        const safeName = escapeHtml(name);
        const safeBusiness = escapeHtml(businessName || '-');
        const safeQty = escapeHtml(String(quantity));
        const safePhone = escapeHtml(phone || '-');
        const safeMessage = escapeHtml(message || '-');

        /* Email to owner */
        await resend.emails.send({
            from: 'Aayas Creation <onboarding@resend.dev>',
            to: [process.env.EMAIL_USER ?? 'aayascreation@gmail.com'],
            replyTo: email,
            subject: `New Bulk Order Enquiry from ${safeName}`,
            html: `
                <h2>New Bulk Order Enquiry</h2>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Business Name:</strong> ${safeBusiness}</p>
                <p><strong>Quantity Required:</strong> ${safeQty}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${safePhone}</p>
                <p><strong>Message:</strong><br/>${safeMessage}</p>
            `,
        });

        return NextResponse.json({ success: true, message: 'Enquiry submitted successfully' });
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.error('[EMAIL] Failed:', errMsg);
        return NextResponse.json({ error: `Failed to send email: ${errMsg}` }, { status: 500 });
    }
}