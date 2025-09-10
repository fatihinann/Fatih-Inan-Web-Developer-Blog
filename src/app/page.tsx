import { redirect } from "next/navigation";

export default function Home() {
  // Fallback olarak tr'ye redirect et
  // Middleware çoğu durumda buraya ulaşmadan redirect yapacak
  redirect("/tr");
}