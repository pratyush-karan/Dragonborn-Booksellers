"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <div style={{ position: "relative", zIndex: 1000 }}>
        <ProgressBar
          height="4px"
          color="#ffc107"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </div>
    </>
  );
};

export default Providers;
