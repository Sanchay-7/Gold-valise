import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valise Technology - Gold Investment",
  description: "valise technology gold investment app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {/* Reverted to a standard script tag to avoid the build error */}
        <script src="https://unpkg.com/recharts/umd/Recharts.min.js"></script>
      </body>
    </html>
  );
}

