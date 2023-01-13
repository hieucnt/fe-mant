import { Form, Input, Table } from "antd";
import { useEffect, useState } from "react";
import useNftContract from "../../hooks/nft.hook";
import useMarketplaceContract from "../../hooks/marketplace.hook";
import useWeb3 from "../../hooks/web3.hook";
import nftApi from "../../api/nft";
import {
  getClassNameByGenes,
  getRarityNameByGenes,
  formatPrice,
} from "../../utils/nft";

const DinoList = () => {
  const nftContract = useNftContract();
  const marketPlaceContract = useMarketplaceContract();
  const web3 = useWeb3();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const dinos = await nftApi.getDinos();
      const dinosWithOwner = await Promise.all(
        dinos.map(async (dino) => {
          const owner = await nftContract.methods.ownerOf(dino.nftId).call();
          let sourceOwner = owner;
          let price = 0;
          if (owner === process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS) {
            const auction = await marketPlaceContract.methods
              .getAuction(dino.nftId)
              .call();
            sourceOwner = auction.seller;
            price = auction.endingPrice;
          }
          return { ...dino, owner, sourceOwner, price };
        })
      );
      setDataSource(dinosWithOwner);
      setData(dinosWithOwner);
      setLoading(false);
    })();
  }, []);

  const columns = [
    {
      title: "NFT ID",
      dataIndex: "nftId",
      key: "nftId",
      sorter: (a, b) => a.nftId - b.nftId,
      render: (text, record) => (
        <a
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_NETWORK_URL}/token/${process.env.NEXT_PUBLIC_NFT_ADDRESS}?a=${record.nftId}`}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      render: (text, record) => {
        return getClassNameByGenes(record.genes);
      },
      filters: [
        {
          text: "Novis",
          value: "1",
        },
        {
          text: "Aquis",
          value: "2",
        },
        {
          text: "Terrot",
          value: "3",
        },
      ],
      onFilter: (value, record) => record.class == value,
      sorter: (a, b) => a.class - b.class,
    },
    {
      title: "Rarity",
      dataIndex: "rarity",
      key: "rarity",
      render: (text, record) => {
        return getRarityNameByGenes(record.genes);
      },
      filters: [
        {
          text: "Normal",
          value: "1",
        },
        {
          text: "Rare",
          value: "2",
        },
        {
          text: "Super Rare",
          value: "3",
        },
        {
          text: "Legendary",
          value: "4",
        },
        {
          text: "Mystic",
          value: "5",
        },
      ],
      onFilter: (value, record) => record.rarity == value,
      sorter: (a, b) => a.rarity - b.rarity,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: "Owner Address",
      dataIndex: "sourceOwner",
      key: "sourceOwner",
      render: (text, record) => {
        return (
          <a
            href={`${process.env.NEXT_PUBLIC_ADDRESSS_URL}/${record.sourceOwner}`}
            target="_blank"
          >
            {record.sourceOwner}
          </a>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return record.owner == process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
          ? "On Sale"
          : "On Team";
      },
    },
    {
      title: "Current Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return record.price
          ? formatPrice(web3.utils.fromWei(`${record.price}`)) + " DNL"
          : "-";
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div>
      <div>
        <h1>Dinos List</h1>
        <Form>
          Search By Owner Address:
          <br />
          <Input.Search
            placeholder="Owner Address"
            onChange={(e) => {
              const newData = dataSource.filter((item) =>
                item.sourceOwner
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setData(newData);
            }}
          ></Input.Search>
        </Form>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: 50,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      ;
    </div>
  );
};

export default DinoList;
