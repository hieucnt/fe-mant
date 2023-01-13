import Web3 from "web3";

const useWeb3 = () => {
  const networkAddress = process.env.NEXT_PUBLIC_BSC_NET;
  let provider = new Web3(networkAddress);
  if (Web3.givenProvider?.chainId == process.env.NEXT_PUBLIC_CHAIN_ID) {
    provider = new Web3(Web3.givenProvider);
  }
  const web3 = new Web3(provider);
  return web3;
};

export default useWeb3;
