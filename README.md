# Peero - Instant Peer-to-Peer Sharing

**Connect. Share. Instantly.**

A modern, production-ready peer-to-peer file sharing web application that allows users to instantly connect using a 4-digit code and share messages and files directly using WebRTC. No files are stored on servers — everything happens peer-to-peer.

![Peero](https://img.shields.io/badge/WebRTC-Enabled-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Instant Connection**: Connect with anyone using a simple 4-digit code
- **Real-time Messaging**: Send text messages instantly
- **File Sharing**: Share files of any size directly
- **Auto-download**: Received files download automatically
- **No Server Storage**: All data transfers happen peer-to-peer via WebRTC
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Connection Status**: Real-time connection status indicators
- **Responsive**: Works seamlessly on desktop and mobile

## 🎨 Design Features

- Animated gradient background with floating geometric shapes
- Glassmorphism cards with backdrop blur effects
- Smooth Framer Motion animations
- Futuristic startup-style interface
- Glowing UI elements and hover effects
- Dark theme with indigo/cyan color palette

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **WebRTC**: PeerJS
- **Icons**: React Icons

## 📁 Project Structure

```
peero/
├── app/
│   ├── page.js              # Main application page
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── AnimatedBackground.js    # Floating shapes background
│   ├── CodeDisplay.js           # User's connection code display
│   ├── ConnectPanel.js          # Peer connection input
│   ├── ChatPanel.js             # Chat interface
│   ├── MessageBubble.js         # Individual message component
│   └── ConnectionStatus.js      # Connection status indicator
├── hooks/
│   └── usePeerConnection.js     # WebRTC connection logic
├── utils/
│   ├── generateCode.js          # 4-digit code generator
│   ├── formatFileSize.js        # File size formatter
│   └── cn.js                    # Tailwind class merger
├── tailwind.config.js
├── next.config.mjs
├── postcss.config.mjs
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**

```bash
cd peero
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

1. **Open the app** in your browser
2. **Share your code** - You'll see a 4-digit code displayed. Share this with someone you want to connect with
3. **Connect to peer** - Enter the other person's 4-digit code in the "Connect to Peer" panel
4. **Start sharing** - Once connected, you can:
   - Send text messages
   - Share files by clicking the paperclip icon
   - Files are automatically downloaded when received

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

The app will be optimized and ready for deployment.

## 🌐 Deployment

You can deploy Peero to any platform that supports Next.js:

- **Vercel** (Recommended): `vercel deploy`
- **Netlify**: Connect your Git repository
- **Docker**: Build and run with Docker
- **Self-hosted**: Run `npm run build && npm start`

## 🔒 Security & Privacy

- All connections are peer-to-peer using WebRTC
- No files or messages are stored on any server
- Data transfers are end-to-end between peers
- Connection codes are randomly generated for each session

## 🎯 Key Components

### usePeerConnection Hook
Manages all WebRTC connection logic including:
- Peer initialization
- Connection establishment
- Message/file sending and receiving
- Connection status management

### AnimatedBackground
Creates the futuristic visual effect with:
- Gradient mesh background
- Floating geometric shapes
- Grid pattern overlay

### ChatPanel
Main interface for communication featuring:
- Message display with auto-scroll
- Text input with Enter key support
- File upload functionality
- Connection status header

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    500: '#6366f1',  // Indigo
    600: '#4f46e5',
  },
  cyan: {
    400: '#22d3ee',
    500: '#06b6d4',
  }
}
```

### Animations
Modify animation timings in `tailwind.config.js`:

```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
}
```

## 🐛 Troubleshooting

**Connection not establishing?**
- Make sure both users are online
- Check that both users have entered each other's codes
- Verify your firewall isn't blocking WebRTC connections

**Files not downloading?**
- Check browser permissions for downloads
- Ensure sufficient disk space
- Try with smaller files first

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- WebRTC powered by [PeerJS](https://peerjs.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Styled with [TailwindCSS](https://tailwindcss.com/)

---

**Made with ❤️ for instant, secure file sharing**
