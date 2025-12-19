export const metadata = {
  metadataBase: new URL("https://www.open-convert.com"),
  title: "Open Convert - Free File Converter",
  description:
    "Free online video and document converter. Convert MP4, WebM, MOV, AVI, MKV, FLV, PDF, Word. No sign-up required, 100% free.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TR96VW427D"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TR96VW427D');
            `,
          }}
        />
        {/* Fonts */}
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bangers&family=Roboto+Condensed:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}