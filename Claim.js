import { FinClient, tx, registry } from "kujira.js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { coins, SigningStargateClient, GasPrice } from "@cosmjs/stargate";

const RPC_ENDPOINT = "https://rpc.kaiyo.kujira.setten.io";

const MNEMONIC = "...";

// 1. Set up the query and the signing clients for the contract;
const signer = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
  prefix: "kujira",
});

const FIN_KUJI_DEMO = "kujira14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sl4e867";

const [account] = await signer.getAccounts();
const cwClient = await CosmWasmClient.connect({
  url: RPC_ENDPOINT,
});



const contract = new FinClient(cwClient, account.address, FIN_KUJI_DEMO);
const signingClient = await SigningStargateClient.connectWithSigner(
  RPC_ENDPOINT,
  signer,
  {
    registry,
    gasPrice: GasPrice.fromString("0.00125ukuji"),
  }
);


  const ordersWithdraw = async (wallet: Wallet, contract: Contract, orders: Order[]) => {
  const client = new FinClient(
    wallet.client,
    wallet.account.address,
    contract.address,
  );
  return client.withdrawOrders({
    orderIdxs: orders.filter((o) => +o.filled_amount).map((o) => o.idx.toString()),
  });
}



