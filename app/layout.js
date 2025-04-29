import "./style/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"], // choose weights you need
  display: "swap", // better rendering
});

export const metadata = {
  title: "OEM Dashboard Login",
  description: "OEM Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
}
