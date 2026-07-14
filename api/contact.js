function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO || 'admin@mugshotstudios.com'
  // Until mugshotstudios.com is verified in Resend, use their shared sender.
  const from = process.env.CONTACT_FROM || 'Mugshot Studios <onboarding@resend.dev>'

  // Graceful fallback: if email isn't configured yet, log and still succeed
  // so the form keeps working for visitors while setup is in progress.
  if (!apiKey) {
    console.log('New contact (email not configured):', { name, email, message })
    return res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.',
    })
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry from ${name} — Mugshot Studios`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.6;color:#202020">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          </div>
        `,
      }),
    })

    if (!r.ok) {
      const detail = await r.text()
      console.error('Resend error:', r.status, detail)
      return res.status(502).json({ error: 'Failed to send email. Please email us directly.' })
    }

    return res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.',
    })
  } catch (err) {
    console.error('Email send failed:', err)
    return res.status(500).json({ error: 'Failed to send email. Please email us directly.' })
  }
}
