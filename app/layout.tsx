import type { Metadata } from 'next'
import {
  Inter,
  Cormorant_Garamond,
  Pinyon_Script,
} from 'next/font/google'
import Providers from '@/components/Providers'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import './modern-theme.css'
import './typography.css'
import './landing.css'
import './liquid-glass.css'
import './site.css'
import './theme.css'
import './login-glass.css'
import './motion.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const pinyonScript = Pinyon_Script({
  variable: '--font-script',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Christ Study Centre — Pala, Kerala',
  description:
    'Structured tuition for CBSE, ICSE & SCERT students. Grades III–XII. Established 2013.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} ${pinyonScript.variable} antialiased modern-theme`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('csc-theme');document.documentElement.setAttribute('data-theme',t==='light'||t==='dark'?t:'dark');document.documentElement.style.colorScheme=t==='light'?'light':'dark';}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body className="modern-body">
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
