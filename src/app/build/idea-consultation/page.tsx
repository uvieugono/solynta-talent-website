import type { Metadata } from "next";
import IdeaConsultationClient from "./IdeaConsultationClient";

export const metadata: Metadata = {
  title: "No Idea? We\u2019ll Find One For You — Solynta Build",
  description:
    "Answer a few questions about your skills, interests, and market. Our AI generates 3 tailored software business ideas you can start building today.",
  openGraph: {
    title: "No Idea? We\u2019ll Find One For You — Solynta Build",
    description:
      "Answer a few questions about your skills, interests, and market. Our AI generates 3 tailored software business ideas you can start building today.",
  },
};

export default function IdeaConsultationPage() {
  return <IdeaConsultationClient />;
}
