import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "FreeCodeDocs — free developer documentation", template: "%s · FreeCodeDocs" },
  description: "A fast, quiet reader for the documentation of hundreds of languages, frameworks and libraries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
    <script
  type="text/javascript"
  dangerouslySetInnerHTML={{
    __html: `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7913317-53f4-4069-a810-768ff68dc7f71.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`,
  }}
/>
      </head>
      <body className="font-sans">
        {children}
        <GoogleAnalytics gaId="G-ZPYQ2T4P2J" />
        <footer className="border-t border-line py-6 text-center text-sm text-muted">© {new Date().getFullYear()} FreeCodeDocs. All rights reserved.</footer>
      </body>
    </html>
  );
}
