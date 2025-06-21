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
    template:"%s | Unwind ",
    default:"Unwind",
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
       className={`${hahmlet.className} h-full min-h-screen   antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
