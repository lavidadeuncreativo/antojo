import { AppShell } from "@/components/layout/AppShell";
import { StateProvider } from "@/lib/state";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StateProvider>
      <AppShell>{children}</AppShell>
    </StateProvider>
  );
}
