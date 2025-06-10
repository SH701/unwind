import type { Metadata } from "next";
import { Hahmlet } from 'next/font/google';
import "./globals.css";

const hahmlet = Hahmlet({
  subsets: ['latin'],
  variable: '--hahmlet-text',
  weight: "400",
  style: "normal"
});

export const metadata: Metadata = {
  title:{
    template:"%s | Tweet ",
    default:"Tweet",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
       className={`${hahmlet.className} h-full min-h-screen bg-sky-50 antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
