import { Goerli } from "@thirdweb-dev/chains";
import {
    metamaskWallet,
    useAddress,
    useBalance,
    useConnect,
    useDisconnect,
    useSwitchChain
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";

function Navbar() {
  const [show, setShow] = useState();
  const [isShow, setIsShow] = useState(true);

  //   thirdweb hooks
  const wallet = metamaskWallet();
  const connent = useConnect();
  const disconnect = useDisconnect();
  const address = useAddress();
  const {data , isLoading} = useBalance(NATIVE_TOKEN_ADDRESS);
  const change = useSwitchChain()

  useEffect(() => {
    window.addEventListener(
      "click",
      function () {
        setShow("");
        setIsShow(true);
      },
      true
    );
  }, []);

  const modalOpen = () => {
    if (isShow) {
      setShow("show");
      setIsShow(false);
    }
    if (!isShow) {
      setShow("");
      setIsShow(true);
    }
  };

  let customizeAdress;

  if (address) {
    console.log(address.length - 1);
    const first = address.substring(0, 4);
    const last = address.substring(address.length - 1, address.length - 4);
    customizeAdress = first + "...." + last;
  }

  return (
    <div className="main-div">
      {!address && (
        <button
          type="button"
          onClick={() => {
            connent(wallet);
          }}
        >
          connect
        </button>
      )}
      {address && (
        <div className="container">
          <p className="address" onClick={modalOpen}>
           {customizeAdress}
          </p>

          {/* modal  */}
          <div className={`modal ${show}`}>
            {/* balance  */}
            <div>
              <p className="balance">Balance: {data?.displayValue} </p>
            </div>
            {/* btn  */}
            <div>
              <button
                type="button"
                onClick={() => {
                  disconnect();
                }}
              >
                Disconnect
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  change(Goerli.chainId);
                }}
              >
               Change chain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
