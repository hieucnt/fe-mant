const NO_INTERNET = "No Internet";
const NETWORK_ID = {
  etherumMainNet: {
    hex: "0x1",
    decimal: "1",
    name: "Ethereum mainnet",
  },
  ropstenTestNet: {
    hex: "0x3",
    decimal: "3",
    name: "Ropsten Test Network",
  },
  rinkebyTestNet: {
    hex: "0x4",
    decimal: "4",
    name: "Rinkeby Test Network",
  },
  goerliTestNet: {
    hex: "0x5",
    decimal: "5",
    name: "	Goerli Test Network",
  },
  kovanTestNet: {
    hex: "0x2a",
    decimal: "42",
    name: "Kovan Test Network",
  },
  BSCTestNet: {
    decimal: "97",
    name: "BSC Test Network",
  },
  BSCMainNet: {
    decimal: "56",
    name: "BSC Main Network",
  },
};

const MENU_SITE = [
  { path: "/market", name: "market", title: "Market" },
  { path: "/my-dinos", name: "my-dinos", title: "My Dinos" },
  { path: "/pve-dinos", name: "pve-dinos", title: "PVE" },
  { path: "/", name: "boss", title: "Boss" },
];

export { NETWORK_ID, NO_INTERNET, MENU_SITE };
