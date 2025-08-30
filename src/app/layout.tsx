import "./globals.css";
import { ReactQueryClientProvider } from "./lib/providers/queryclientprovider";
import ReduxProvider from "./lib/providers/reduxprovider";
import { useUser } from "./lib/hooks/useUser";
import NavbarWrapper from "./lib/components/Wrappers/NavbarWrapper";



export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
       
      <ReduxProvider>
        <ReactQueryClientProvider>
           <NavbarWrapper/>
            {children}
        </ReactQueryClientProvider>
      </ReduxProvider>
      </body>
    </html>
  );
}
