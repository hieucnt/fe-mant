import dnlABI from "../constants/ABI/dnl.json";
import useWeb3 from "./web3.hook";

const useDNLContract = () => {
  const web3 = useWeb3();
  let dnlContract = new web3.eth.Contract(
    dnlABI,
    process.env.NEXT_PUBLIC_DNL_ADDRESS
  );
  return dnlContract;
};

export default useDNLContract;
