import type { Metadata } from "next";
import HundredIdeasClient from "./HundredIdeasClient";

export const metadata: Metadata = {
  title: "100 Software Business Ideas for Nigeria \u2014 Solynta Build",
  description:
    "Browse 100 software business ideas designed for the Nigerian market. Pick one, and we\u2019ll build it for you.",
  openGraph: {
    title: "100 Software Business Ideas for Nigeria \u2014 Solynta Build",
    description:
      "Browse 100 software business ideas designed for the Nigerian market. Pick one, and we\u2019ll build it for you.",
  },
};

export default function HundredIdeasPage() {
  return <HundredIdeasClient />;
}
