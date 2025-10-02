import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from '@/apollo/client';
import { AppNavbar } from '@/components/app-navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clash App',
  description: 'Next.js GraphQL Workshop Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <ApolloWrapper>
          <AppNavbar />
          <main className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">{children}</div>
          </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
