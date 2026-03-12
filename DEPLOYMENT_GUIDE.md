# Peero Deployment Guide

## 🚀 Deploying to Vercel

### Quick Deploy
```bash
npm install -g vercel
vercel
```

## ⚠️ Common Issues After Deployment

### Issue 1: "Connection Lost" or "Connection Error"

**Cause**: PeerJS free cloud server might be down or have rate limits

**Solutions**:

#### Option A: Use Default PeerJS (Current Setup)
The app now uses multiple STUN servers for better reliability:
- Google STUN servers
- Twilio STUN servers

This should work in most cases.

#### Option B: Self-Host PeerJS Server (Recommended for Production)

1. **Deploy PeerJS Server on Render/Railway:**

```bash
# Clone PeerJS server
git clone https://github.com/peers/peerjs-server.git
cd peerjs-server

# Deploy to Render or Railway
# Set environment variables:
PORT=9000
```

2. **Update Peero to use your server:**

In `hooks/usePeerConnection.js`, change:
```javascript
const peer = new Peer(code, {
  host: 'your-peerjs-server.onrender.com',
  secure: true,
  port: 443,
  path: '/',
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:global.stun.twilio.com:3478' }
    ]
  },
  debug: 2,
});
```

#### Option C: Use Metered TURN Server (Best for Production)

For better connectivity (especially behind firewalls):

1. Sign up at https://www.metered.ca/stun-turn (Free tier available)
2. Get your TURN credentials
3. Update the config:

```javascript
const peer = new Peer(code, {
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:a.relay.metered.ca:80',
        username: 'your-username',
        credential: 'your-credential'
      },
      {
        urls: 'turn:a.relay.metered.ca:443',
        username: 'your-username',
        credential: 'your-credential'
      }
    ]
  },
  debug: 2,
});
```

### Issue 2: Code Already in Use

**Cause**: Someone else is using the same 4-digit code

**Solution**: Refresh the page to get a new code

### Issue 3: Peer Not Found

**Cause**: 
- Wrong code entered
- Other user closed their browser
- Network issues

**Solution**: 
- Double-check the code
- Make sure both users are online
- Try refreshing both pages

## 🔧 Environment Variables (Optional)

Create `.env.local` for custom configuration:

```env
NEXT_PUBLIC_PEERJS_HOST=your-server.com
NEXT_PUBLIC_PEERJS_PORT=443
NEXT_PUBLIC_PEERJS_PATH=/
```

Then update the code to use these:

```javascript
const peer = new Peer(code, {
  host: process.env.NEXT_PUBLIC_PEERJS_HOST || undefined,
  port: process.env.NEXT_PUBLIC_PEERJS_PORT ? parseInt(process.env.NEXT_PUBLIC_PEERJS_PORT) : undefined,
  path: process.env.NEXT_PUBLIC_PEERJS_PATH || '/',
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:global.stun.twilio.com:3478' }
    ]
  },
  debug: 2,
});
```

## 📱 Testing After Deployment

1. **Open on two devices** (phone + computer)
2. **Check browser console** for errors (F12)
3. **Look for these messages:**
   - ✅ "My peer ID: 1234"
   - ✅ "Ready to connect"
   - ❌ "PeerJS server error" → Use custom server

## 🐛 Debugging

### Check Browser Console
Press F12 and look for:
- PeerJS connection logs
- WebRTC errors
- Network errors

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| `peer-unavailable` | Code doesn't exist | Check code, refresh |
| `network` | Internet issue | Check connection |
| `server-error` | PeerJS server down | Use custom server |
| `unavailable-id` | Code in use | Refresh page |

## ✅ Production Checklist

- [ ] Test on multiple devices
- [ ] Test on different networks (WiFi, mobile data)
- [ ] Test with firewall/VPN
- [ ] Consider self-hosting PeerJS server
- [ ] Add TURN server for better connectivity
- [ ] Monitor PeerJS server uptime
- [ ] Add analytics to track connection success rate

## 🌐 Vercel Deployment Settings

In your Vercel dashboard:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🔒 Security Notes

- All connections are peer-to-peer
- No data stored on servers
- WebRTC is encrypted by default
- Consider adding authentication for production use

## 📊 Monitoring

Add error tracking:
```bash
npm install @sentry/nextjs
```

This will help you see connection errors in production.

## 🆘 Still Having Issues?

1. Check browser console for errors
2. Try different browsers (Chrome, Firefox, Safari)
3. Test on different networks
4. Consider using a custom PeerJS server
5. Add TURN servers for better connectivity

---

**Need Help?** Check the PeerJS documentation: https://peerjs.com/docs/
