import "./globals.css";

export const metadata = {
  title: "Next.js Blog Starter",
  description: "A simple Next.js blog built with Markdown",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
