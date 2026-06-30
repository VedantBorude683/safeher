import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] })
const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'] })

export const metadata: Metadata = {
  title: 'SafeHer AI - Women Safety Platform',
  description: 'Your AI Safety Guardian. Predict risks before they happen. Navigate safer routes. Get help with one voice command.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [{ color: '#7C3AED' }],
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.className} ${sora.className} ${jetbrainsMono.className}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased bg-[var(--bg-base)] text-[var(--text-primary)]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
