import { useAccount, useConnect, useDisconnect } from "wagmi";
import metamask from "../assets/metamask.png";
import coinbase from "../assets/coinbaselogo.png";
import walletconnect from "../assets/WalletConnect.png";

const ConnectWallet = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const connectorImages = [metamask, coinbase, walletconnect];

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-6">
      {connectors.map((connector, i) => (
        <button
          className="bg-slate-600 w-[350px] p-5 rounded flex justify-center items-center gap-2"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          <img
            src={connectorImages[i]}
            alt="metamask"
            className="w-[23px] h-[23px] object-cover"
          />
          <span>
            {connector.name}
            {!connector.ready && " (unsupported)"}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
          </span>
        </button>
      ))}
      {address && (
        <>
          <p>Wallet address : {address}</p>
          <button className="bg-yellow-300 p-4 rounded" onClick={() => disconnect()}>Disconnect</button>
        </>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export { ConnectWallet };
