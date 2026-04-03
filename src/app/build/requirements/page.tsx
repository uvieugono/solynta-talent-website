import type { Metadata } from "next";
import RequirementsWizard from "./RequirementsWizard";

export const metadata: Metadata = {
  title: "Software Requirements Form — Solynta Build",
  description:
    "Tell us exactly what you want built. Our detailed requirements form replaces a phone consultation and gets your project scoped in 48 hours.",
  openGraph: {
    title: "Software Requirements Form — Solynta Build",
    description:
      "Tell us exactly what you want built. Our detailed requirements form replaces a phone consultation and gets your project scoped in 48 hours.",
  },
};

export default function RequirementsPage() {
  return <RequirementsWizard />;
}
