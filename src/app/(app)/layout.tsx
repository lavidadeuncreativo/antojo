import { AppShell } from "@/components/layout/AppShell";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // En modo demo (NEXT_PUBLIC_DEMO_MODE=true), no verificar auth
  // En producción con Supabase real, auth se verifica via middleware
  return <AppShell>{children}</AppShell>;
}
