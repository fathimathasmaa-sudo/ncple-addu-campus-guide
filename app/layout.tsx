import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { DesktopNav } from "@/components/DesktopNav";
import { PWARegister } from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "NCPLE Addu Campus — Welcome Guide",
  description: "Your digital guide to a comfortable, safe and enjoyable stay.",
  applicationName: "NCPLE Addu Campus",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  appleWebApp: { capable: true, title: "NCPLE Addu Campus", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#00244D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><DesktopNav/><div className="min-h-screen md:pl-64">{children}</div><BottomNav/><PWARegister/></body></html>;
}
