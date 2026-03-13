import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alphabet Designer — Build Your Own Super Alphabet",
  description:
    "Pick the coolest characters from alphabets around the world and combine them into your own custom super alphabet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
