import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Roboto } from "next/font/google";
import AppToast from "@/components/AppToast";

export const metadata: Metadata = {
  title: {
    absolute: "Next Dashboard",
    template: "%s | Next Dashboard",
  },
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable} style={{ padding: 0, margin: 0 }}>
        <AppRouterCacheProvider>
          <AppToast>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppToast>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
