import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/scroll/SmoothScroll";

export const metadata: Metadata = {
  title: "DRAPE — Minimalist Fashion",
  description: "Wear the quiet. A world-class scrollytelling fashion experience. Minimalist garments, intentional design, premium quality.",
  keywords: ["fashion", "minimalist", "drape", "clothing", "premium", "scrollytelling"],
  openGraph: {
    title: "DRAPE — Minimalist Fashion",
    description: "Wear the quiet. Discover intentionally crafted garments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={{ scrollBehavior: 'smooth' }} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@300;400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: '#1A1A18' }} suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
