import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Navbar from "./navbar";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Funny Movies",
  description: "Video sharing platform for funny movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
