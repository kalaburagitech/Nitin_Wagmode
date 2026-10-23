"use client";

import { Provider } from "react-redux";
import { MotionConfig } from "framer-motion";
import { store } from "@/redux/store";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {/* Respect the OS "reduce motion" setting for every Framer Motion animation */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Provider>
  );
}
