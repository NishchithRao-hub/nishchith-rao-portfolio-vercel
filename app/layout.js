import './globals.css'

const BASE_URL = 'https://nishchith-rao.vercel.app'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  'Nishchith Rao - Portfolio',
    template: '%s | Nishchith Rao',
  },
  description:
    'Software Engineer specializing in backend systems, distributed architecture, full-stack development and ML. Based in the Bay Area. Open to full-time roles.',
  keywords: [
    'Software Engineer', 'Backend Engineer', 'Full Stack Engineer', 'Nishchith Rao Palimar Raghupathi',
    'ML Engineer', 'Nishchith Rao Portfolio', 'AI Engineer','Java', 'Python', 'Spring Boot', 'AWS', 'Kafka',
    'Kubernetes', 'React', 'Next.js', 'Northeastern University', 'California', 'Presidency University',
    'Bay Area', 'Nishchith Rao', 'Nishchith', 'Nishchith Rao Software Engineer', 'Nishchith Rao Backend Engineer', 
    'Nishchith Rao Full Stack Engineer', 'Nishchith Rao website', 'Capgemini'
  ],
  authors: [{ name: 'Nishchith Rao', url: BASE_URL }],
  creator: 'Nishchith Rao',

  openGraph: {
    type:        'website',
    url:          BASE_URL,
    title:       'Nishchith Rao - Portfolio',
    description: 'Software Engineer specializing in backend systems, distributed architecture, full-stack development and ML.',
    siteName:    'Nishchith Rao Portfolio',
    images: [
      {
        url:    '/og-image.png',  // add a 1200x630 screenshot later
        width:  1200,
        height: 630,
        alt:    'Nishchith Rao - Portfolio',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Nishchith Rao — Software Engineer',
    description: 'Backend & full-stack engineer. Open to full-time roles.',
    images:      ['/og-image.png'],
  },

  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  icons: {
    icon:    '/favicon.ico',
    apple:   '/apple-touch-icon.png',
    android: '/android-chrome-192x192.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}