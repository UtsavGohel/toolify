import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toolify - Free Online Utility Tools",
  description:
    "A collection of free online utility tools including word counter, password generator, QR code generator, color picker, and more.",
  keywords:
    "utility tools, online tools, free tools, web tools, word counter, password generator, QR code generator, color picker",
  metadataBase: new URL("https://toolify.torktoo.com/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolify.torktoo.com/",
    title: "Toolify - Free Online Utility Tools",
    description:
      "A collection of free online utility tools including word counter, password generator, QR code generator, color picker, and more.",
    siteName: "Toolify",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="googlef493a48fd2b89cb2.html"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6">
              <div className="container flex flex-col items-center justify-center gap-4 md:h-14 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground">
                  © {new Date().getFullYear()} Toolify. All rights reserved.{" "}
                  <Link
                    href="/privacy"
                    className="font-medium underline underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                  {" · "}
                  <Link
                    href="/terms"
                    className="font-medium underline underline-offset-4"
                  >
                    Terms of Service
                  </Link>
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
