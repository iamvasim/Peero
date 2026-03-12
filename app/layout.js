import "./globals.css";

export const metadata = {
  title: "Peero - Instant Peer-to-Peer Sharing",
  description: "Connect. Share. Instantly. Share files directly with anyone using a simple 4-digit code.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
