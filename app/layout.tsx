import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BoLD Nested Owner Lab",
  description: "Standalone BoLD BOLA test app using nested and renamed account ownership metadata."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
