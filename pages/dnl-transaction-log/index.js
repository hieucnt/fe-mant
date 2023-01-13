import Head from "next/head";
import { useEffect } from "react";
import DnlTransactionLog from "../../components/dnl-transaction-log";
import useMarketPlaceContract from "../../hooks/marketplace.hook";
export default () => {
  return (
    <>
      <Head>
        <title>Dnl transaction Log - DinoLand Admin</title>
      </Head>
      <DnlTransactionLog />
    </>
  );
};
