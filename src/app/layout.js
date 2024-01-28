
import { Inter } from "next/font/google";
import CheckIsAuth from '../components/CheckIsAuth';

import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hotel System",
  description: "Hotel management system",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer />
        <CheckIsAuth>
        {children}
        </CheckIsAuth>
        </body>
    </html>
  );
}

