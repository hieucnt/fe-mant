import marketABI from "../constants/ABI/marketplace.json";
import useWeb3 from "./web3.hook";

const useMarketplaceContract = () => {
  const web3 = useWeb3();
  let marketContract = new web3.eth.Contract(
    marketABI,
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
  );
  return marketContract;
};

export default useMarketplaceContract;
