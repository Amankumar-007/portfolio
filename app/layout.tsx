import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { MainNav } from '@/components/main-nav';
import { AnimatedCursor } from '@/components/animated-cursor';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Aman Kumar | Portfolio',
  description: 'Personal portfolio of Aman Kumar - Designer & Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.variable, 
        playfair.variable,
        "min-h-screen bg-background font-sans antialiased"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedCursor />
          <MainNav />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}