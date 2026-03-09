import type { Metadata } from "next";
import ConsultationWizard from "./ConsultationWizard";

export const metadata: Metadata = {
  title: "AI Business Consultation | Solynta Talent",
  description:
    "Get a free AI-powered business analysis. Our AI consultant analyzes your operations and delivers a custom roadmap — in minutes, not weeks.",
};

export default function ConsultationPage() {
  return <ConsultationWizard />;
}
