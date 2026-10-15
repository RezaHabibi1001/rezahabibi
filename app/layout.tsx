import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Inter, Playfair_Display, Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { site } from "@/content/site";
import { graph, personSchema, websiteSchema } from "@/lib/schema";
import { baseKeywords } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "600"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.summary,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: baseKeywords,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name} — ${site.role}`,
    description: site.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.summary,
  },
  appleWebApp: { title: site.name, statusBarStyle: "default" },
  // PLACEHOLDER: paste Search Console / Bing tokens once the domain is verified.
  // verification: { google: "", other: { "msvalidate.01": "" } },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${instrument.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen">
        <JsonLd data={graph(personSchema(), websiteSchema())} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-head focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
