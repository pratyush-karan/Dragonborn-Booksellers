"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  );
}
