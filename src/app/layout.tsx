import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ANTOJO OS",
    template: "%s — ANTOJO OS",
  },
  description:
    "Centro operativo y estratégico de ANTOJO. Gestiona ventas, inventario, producción, finanzas y crecimiento de tu negocio de bebidas frías.",
  keywords: ["ANTOJO", "bebidas frías", "gestión de negocio", "inventario"],
  authors: [{ name: "ANTOJO." }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ANTOJO OS",
  },
};

export const viewport: Viewport = {
  themeColor: "#701F2D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
