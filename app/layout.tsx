import type { Metadata } from 'next';
import LoadingWrapper from './components/common/LoadingWrapper';
import { ThemeProvider } from './components/common/ThemeProvider';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { LoadingProvider } from './context/LoadingContext';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'OriginDev',
  description: 'IT Consulting and Software Development',
  icons: {
    shortcut: { url: '/favicon.svg', type: 'image/svg+xml' },
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <LoadingProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-grow flex flex-col">
              <LoadingWrapper>{children}</LoadingWrapper>
            </main>
            <Footer />
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
