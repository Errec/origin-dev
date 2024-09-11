import type { Metadata } from 'next';
import { ThemeProvider } from './components/common/ThemeProvider';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
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
// TODO: add error boundary
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
