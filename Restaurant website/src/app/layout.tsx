import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ÉLAN — Haute Gastronomie & Immersive Dining | Paris",
  description: "Experience the art of fine dining at ÉLAN. A sensory culinary journey where Michelin-grade flavor meets mesmerizing 3D visual storytelling. Three Michelin stars, 24 Rue de Rivoli, Paris.",
  keywords: ["fine dining", "Michelin star restaurant", "Paris restaurant", "tasting menu", "French cuisine", "haute gastronomie", "private dining", "wine pairing"],
  authors: [{ name: "ÉLAN" }],
  openGraph: {
    title: "ÉLAN — Haute Gastronomie & Immersive Dining",
    description: "Three Michelin stars. A sensory culinary journey where extraordinary flavor meets mesmerizing visual storytelling.",
    type: "website",
    locale: "en_US",
    siteName: "ÉLAN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ÉLAN — Haute Gastronomie & Immersive Dining",
    description: "Three Michelin stars. A sensory culinary journey in Paris.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Restaurant Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "ÉLAN",
              image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
              description: "Three Michelin star haute gastronomie restaurant offering an immersive dining experience in the heart of Paris.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "24 Rue de Rivoli",
                addressLocality: "Paris",
                postalCode: "75004",
                addressCountry: "FR",
              },
              telephone: "+33142868788",
              priceRange: "€€€€",
              servesCuisine: "French",
              openingHours: "Tu-Sa 18:30-23:00",
              starRating: {
                "@type": "Rating",
                ratingValue: "3",
                bestRating: "3",
                author: "Michelin Guide",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "847",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#f0ece4] relative selection:bg-[#d4a853] selection:text-[#0a0a0f]">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
