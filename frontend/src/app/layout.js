import "./globals.css";
import ThemeLayout from "../components/ThemeLayout";

export const metadata = {
  title: "Diagnosis PAK",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeLayout>
          {children}
        </ThemeLayout>
      </body>
    </html>
  );
}