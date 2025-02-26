import { ClientLayout } from "@/components/layouts/client-layout";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CookieBanner from "@/components/cookie/cookie-banner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>NutriDoc</title>
        <meta name="description" content="Your health care buddy" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
        <CookieBanner />
      </body>
    </html>
  );
}
