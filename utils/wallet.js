import { reduxStore } from "../store";
import useDNLContract from "../hooks/dnl.hook";
import useWeb3 from "../hooks/web3.hook";
import { isAuthenticatedUser } from "../utils/auth";

const getWalletAddress = async () => {
  let account = "";
  if (!isAuthenticatedUser())
    return "0x0000000000000000000000000000000000000000";
  if (window.ethereum) {
    // await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    account = accounts[0];
  }
  return account;
};

const getBalanceByToken = () => {
  return 0;
};

const getGasPrice = () => {
  return 0;
};

const getMaxBalance = () => {
  return 0;
};

const getShortenedAddress = (address) => {
  return address.slice(0, 5) + "..." + address.slice(-7);
};

const getMyDNLBalance = async () => {
  if (!window.ethereum) return 0;
  const walletAddress = await getWalletAddress();
  console.log("walletAddress", walletAddress);
  let dnlContract = useDNLContract();
  let web3 = useWeb3();
  let balance = await dnlContract.methods.balanceOf(walletAddress).call();
  return web3.utils.fromWei(balance);
};

const getDNLBalance = async (walletAddress) => {
  if (!window.ethereum) return 0;
  let dnlContract = useDNLContract();
  let web3 = useWeb3();
  let balance = await dnlContract.methods.balanceOf(walletAddress).call();
  return web3.utils.fromWei(balance);
};

const getApprovedBalance = async () => {
  if (!window.ethereum) return 0;
  const currentWallet = await getWalletAddress();
  let web3 = useWeb3();
  let dnlContract = useDNLContract();
  let approved = await dnlContract.methods
    .allowance(currentWallet, process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS)
    .call();
  return web3.utils.fromWei(approved);
};

export {
  getDNLBalance,
  getShortenedAddress,
  getMyDNLBalance,
  getWalletAddress,
  getApprovedBalance,
  getBalanceByToken,
  getGasPrice,
  getMaxBalance,
};
