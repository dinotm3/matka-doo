import { manrope } from "../app/fonts";

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageTransition from "./components/transitions/PageTransition";
import { NavProvider } from "./context/NavContext";
import SmoothScroll from "./components/scroll/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const font = manrope;
  return (
    <html lang="hr" className={font.variable}>
      <body className={`${font.variable} antialiased`}>
        <SmoothScroll>
          <NavProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </div>
          </NavProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
