import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Unbounded, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const archivo = Unbounded({
  variable: "--font-archivo",
  weight: ["500", "700", "900"],
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const SITE_URL = "https://neurotech-v2.vercel.app";
const SITE_DESCRIPTION =
  "NEUROTECH — разработчик и интегратор корпоративных ИИ-решений: AI-агенты, компьютерное зрение, RAG и автоматизация бизнес-процессов под ключ.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NEUROTECH",
    template: "%s | NEUROTECH",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "NEUROTECH",
    "AI решения",
    "искусственный интеллект",
    "разработка AI-агентов",
    "RAG",
    "автоматизация бизнес-процессов",
    "цифровая трансформация",
    "Uzbekistan IT",
  ],
  authors: [{ name: "NEUROTECH" }],
  icons: {
    icon: "/logo-favicon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    title: "NEUROTECH — AI-решения и цифровая трансформация бизнеса",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "NEUROTECH",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "NEUROTECH" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "NEUROTECH — AI-решения и цифровая трансформация бизнеса",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/*
          Браузер восстанавливает прежнюю позицию скролла при обновлении
          страницы раньше, чем успевает выполниться React-эффект — beforeInteractive
          гарантирует, что сброс произойдёт до восстановления скролла браузером,
          и reveal-анимации hero всегда стартуют сверху.
        */}
        <Script id="scroll-restoration-fix" strategy="beforeInteractive">
          {`try{if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
