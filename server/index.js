import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from client build in production
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // TODO: Send email or store in database
  console.log('New contact:', { name, email, message });

  res.json({
    success: true,
    message: 'Thank you for your message. We will get back to you within 24 hours.'
  });
});

app.post('/api/demo-request', (req, res) => {
  const { name, email, projectType } = req.body;

  if (!name || !email || !projectType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // TODO: Send email or store in database
  console.log('New demo request:', { name, email, projectType });

  res.json({
    success: true,
    message: 'Demo request received. We will contact you shortly.'
  });
});

// Fallback to React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
