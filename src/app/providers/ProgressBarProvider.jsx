"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#ffc107"
        options={{ showSpinner: false }}
        shallowRouting
        style={{ position: "relative", zIndex: 1000 }}
      />
    </>
  );
};

export default Providers;
