import nftABI from "../constants/ABI/nft.json";
import useWeb3 from "./web3.hook";

const useNFTContract = () => {
  const web3 = useWeb3();
  let nftContract = new web3.eth.Contract(
    nftABI,
    process.env.NEXT_PUBLIC_NFT_ADDRESS
  );
  return nftContract;
};

export default useNFTContract;
