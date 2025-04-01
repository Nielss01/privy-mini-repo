'use client'
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import "./globals.css";
import { env } from "../../env";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const privyConfig: PrivyClientConfig = {
      embeddedWallets: {
          createOnLogin: 'users-without-wallets',
      },
      loginMethods: ['email'],
      appearance: {
          showWalletLoginFirst: true,
          theme: 'dark',
      },
  }


  return (
    <html lang="en">
      <body>
        <PrivyProvider
          appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
          clientId={env.NEXT_PUBLIC_PRIVY_CLIENT_ID}
          config={privyConfig}
            >
        {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
