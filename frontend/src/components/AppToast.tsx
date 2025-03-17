"use client";

import { NotificationsProvider } from "@toolpad/core";

const AppToast = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationsProvider
      slotProps={{
        snackbar: {
          autoHideDuration: 5000,
        },
      }}
    >
      {children}
    </NotificationsProvider>
  );
};

export default AppToast;
