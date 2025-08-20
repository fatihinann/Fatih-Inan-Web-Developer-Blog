import type { Metadata } from "next";
import { Hobbies } from "../../../components/hobbies";

export const metadata: Metadata = {
  title: "Hobiler - Fatih İnan | Kamp, Motosiklet ve Kişisel İlgi Alanları",
  description: "Fatih İnan'ın kişisel hobileri: kamp yapma, motosiklet tutkusu, doğa aktiviteleri ve diğer ilgi alanları.",
  keywords: "kamp yapma, motosiklet, doğa aktiviteleri, kişisel hobiler, Fatih İnan hobiler, outdoor aktiviteler",
  openGraph: {
    title: "Hobiler - Fatih İnan | Kamp, Motosiklet ve Kişisel İlgi Alanları",
    description: "Kamp yapma, motosiklet tutkusu ve doğa aktiviteleri hakkında",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hobiler - Fatih İnan | Kamp, Motosiklet ve Kişisel İlgi Alanları",
    description: "Kamp yapma, motosiklet tutkusu ve doğa aktiviteleri hakkında",
  },
  alternates: {
    canonical: "https://fatihinan.com/hobbies",
  },
};

export default function HobbiesPage() {
  return <Hobbies />;
}
