import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
