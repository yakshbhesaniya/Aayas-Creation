'use client';

import { useState } from 'react';

export default function BulkOrderForm({ className }: { className?: string }) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            businessName: (form.elements.namedItem('businessName') as HTMLInputElement).value,
            quantity: (form.elements.namedItem('quantity') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            const res = await fetch('/api/bulk-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error || 'Something went wrong');
            }

            setStatus('success');
        } catch (err: unknown) {
            setErrorMsg(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={className} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Thank You!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Your enquiry has been submitted successfully. We will share the catalogue with you shortly.</p>
                <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop: '1.5rem' }}>Send Another Enquiry</button>
            </div>
        );
    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="text" name="businessName" placeholder="Business Name" required />
            <input type="number" name="quantity" placeholder="Quantity Required" required />
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="tel" name="phone" placeholder="Phone Number" required />
            <textarea name="message" placeholder="Message / Specific Requirements" rows={4}></textarea>

            {status === 'error' && (
                <p style={{ color: 'var(--accent-terracotta)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    ⚠️ {errorMsg}
                </p>
            )}

            <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
            </button>
        </form>
    );
}
