import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivam Choudhary | Aspiring Software Engineer",
  description: "Personal portfolio of Shivam Choudhary, an upcoming B.Tech Computer Science graduate specializing in full-stack web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
