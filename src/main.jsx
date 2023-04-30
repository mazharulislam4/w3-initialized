import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnectV1,
} from "@thirdweb-dev/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnectV1()]}
      activeChain="goerli"
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
