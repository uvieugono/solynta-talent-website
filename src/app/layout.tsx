import type { Metadata } from "next";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";
import { GA_MEASUREMENT_ID, FB_PIXEL_ID } from "@/lib/analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solynta Talent | Business Operations as a Service",
  description:
    "AI-augmented business operations — Finance, Sales, Marketing, HR, Dev, Data Science & more. 41 AI agents. 9 service modules. From $250/month.",
  keywords:
    "BOaaS, business operations, AI operations, outsourced finance, AI agents, SolyntaFlow, ERP",
  openGraph: {
    title: "Solynta Talent — Where Talent Meets Intelligence",
    description:
      "9 AI-augmented service modules. Pick what you need. Pay only for what you use.",
    type: "website",
    url: "https://www.solyntalent.com",
    images: [
      {
        url: "/logo.png",
        width: 1344,
        height: 804,
        alt: "Solynta Talent — Where Talent Meets Intelligence",
      },
    ],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise antialiased">
        {children}
        <ChatWidget />

        {/* ── Google Analytics 4 ─────────────────────────────────────── */}
        {/* TODO: Replace G-XXXXXXXXXX in src/lib/analytics.ts with your real GA4 Measurement ID */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        {/* ── Facebook Pixel ─────────────────────────────────────────── */}
        {/* TODO: Replace XXXXXXXXXXXXXXXXX in src/lib/analytics.ts with your real Facebook Pixel ID */}
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
