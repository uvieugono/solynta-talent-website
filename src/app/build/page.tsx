import type { Metadata } from "next";
import BuildPageClient from "@/components/build/BuildPageClient";

export const metadata: Metadata = {
  title: "Solynta Build — Own Your Own Software Business",
  description:
    "We build your custom software. You keep 100% of the revenue. Starting from £199/month.",
  openGraph: {
    title: "Solynta Build — Own Your Own Software Business",
    description:
      "We build your custom software. You keep 100% of the revenue. Starting from £199/month.",
    type: "website",
    url: "https://www.solyntalent.com/build",
    images: [
      {
        url: "/logo.png",
        width: 1344,
        height: 804,
        alt: "Solynta Build — Own Your Own Software Business",
      },
    ],
  },
};

export default function BuildPage() {
  return <BuildPageClient />;
}
