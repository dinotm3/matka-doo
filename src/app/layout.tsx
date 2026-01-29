import {
  inter,
  ibm_sans,
  public_sans,
  work_sans,
  dm_sans,
  lato,
  manrope,
} from "../app/fonts";

import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageTransition from "./components/transitions/PageTransition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const font = manrope;
  return (
    <html lang="hr" className={font.variable}>
      <body className={`${font.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
