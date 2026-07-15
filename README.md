# Mugshot Studios - Website

A modern, full-stack web application for Mugshot Studios built with React, Node.js, Tailwind CSS, and Vite.

> [!CAUTION]
> ### 🔒 Secret Safety & Git History Warning
> If any secrets (such as API keys, passwords, connection strings, or private tokens) were previously hardcoded or committed to this repository's Git history, **they remain accessible in the historical commit logs even if deleted in the latest commit**.
>
> You **MUST** rotate any historically exposed credentials immediately on their respective platform dashboards (e.g., Resend, server, database, etc.) to ensure complete security.

## 📁 Project Structure

```
mugshot-studios/
├── server/                    # Node.js/Express backend
│   └── index.js              # Express app & API routes
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Entropy.jsx   # Animated background component
│   │   │   ├── Navigation.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Technology.jsx
│   │   │   ├── Works.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── postcss.config.js     # PostCSS configuration
│   └── package.json
├── package.json              # Root package.json
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository and navigate to the root directory:
```bash
cd mugshot-studios
```

2. Install root dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
cd ..
```

### Development

Run both server and client concurrently:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (React dev server)
- **Backend**: http://localhost:5000 (Express API)

### Individual Scripts

**Frontend only:**
```bash
cd client && npm run dev
```

**Backend only:**
```bash
npm run dev:server
```

### Build for Production

1. Build the React app:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

The app will be served at `http://localhost:5000`

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **JavaScript/JSX** - Language

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin requests

## 📄 Pages & Routes

- `/` - Home (hero, stats, services, original IP)
- `/technology` - Vartool details & 6-step process
- `/works` - Portfolio of projects
- `/about` - Studio info & team
- `/contact` - Contact form & info

## 🔧 API Endpoints

### POST `/api/contact`
Submit a contact form.

**Request body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message..."
}
```

### POST `/api/demo-request`
Request a demo.

**Request body:**
```json
{
  "name": "string",
  "email": "string",
  "projectType": "string"
}
```

## 🎨 Components

### Entropy
Animated particle system visualizing order vs. chaos. Used as hero background.

```jsx
<Entropy size={400} className="my-class" />
```

### Navigation
Fixed header with section navigation.

### Pages
Modular page components for each section of the site.

## 🌐 Deployment

### On Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel will auto-detect and build
4. Set environment variables if needed

## 📝 Environment Variables

Create a `.env` file in the root:
```env
PORT=5000
NODE_ENV=production

# Resend Email Integration
RESEND_API_KEY=your_resend_api_key_here
CONTACT_TO=admin@mugshotstudios.com
CONTACT_FROM=Mugshot Studios <onboarding@resend.dev>
```

## 🧹 Cleanup

To remove `node_modules`:
```bash
npm run clean
```

## 📞 Support

Contact: admin@mugshotstudios.com

## 📄 License

© 2024 Mugshot Studios. All rights reserved.
