import "./globals.css";

export const metadata = {
  title: "Lights Out",
  description: "A simple Lights Out game in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
