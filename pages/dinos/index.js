import Head from "next/head";
import { useEffect } from "react";
import DinoList from "../../components/dinos/list";
import useMarketPlaceContract from "../../hooks/marketplace.hook";
export default () => {
  return (
    <>
      <Head>
        <title>Dinos List - DinoLand Admin</title>
      </Head>
      <DinoList></DinoList>
    </>
  );
};
