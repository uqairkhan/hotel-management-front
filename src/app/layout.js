
import { Inter } from "next/font/google";
import CheckIsAuth from '../components/CheckIsAuth';
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hotel System",
  description: "Hotel management system",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CheckIsAuth>
        {/* <div 
        className="mr-3 mt-24 ml-3 sm:ml-0 md:ml-72 lg:ml-72 xl:ml-72"
        > */}
        {children}
        </CheckIsAuth>
        {/* </div> */}
        </body>
    </html>
  );
}

