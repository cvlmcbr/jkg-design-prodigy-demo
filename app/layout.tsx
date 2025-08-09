import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'JKG Design Prodigy - Client App & CRM Demo',
  description: 'Experience the future of creative agency management with our revolutionary client app and CRM suite designed for East African markets.',
  keywords: ['design agency', 'CRM', 'client management', 'East Africa', 'Uganda', 'creative services'],
  openGraph: {
    title: 'JKG Design Prodigy - Revolutionary Creative Management Suite',
    description: 'Hospital-grade reliability meets world-class design in the ultimate creative agency management platform.',
    type: 'website',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans antialiased">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}