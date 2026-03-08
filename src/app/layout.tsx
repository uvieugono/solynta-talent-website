import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solynta Talent | Business Operations as a Service",
  description:
    "AI-augmented business operations — Finance, Sales, Marketing, HR, Dev, Data Science & more. 25 AI agents. 8 service modules. From $250/month.",
  keywords:
    "BOaaS, business operations, AI operations, outsourced finance, AI agents, SolyntaFlow, ERP",
  openGraph: {
    title: "Solynta Talent — Where Talent Meets Intelligence",
    description:
      "8 AI-augmented service modules. Pick what you need. Pay only for what you use.",
    type: "website",
    url: "https://www.solyntatalent.com",
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
      <body className="noise antialiased">{children}</body>
    </html>
  );
}
