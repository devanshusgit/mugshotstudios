export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, projectType } = req.body;

  if (!name || !email || !projectType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('New demo request:', { name, email, projectType });

  res.json({
    success: true,
    message: 'Demo request received. We will contact you shortly.'
  });
}
