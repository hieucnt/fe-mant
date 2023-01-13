import { Form,Input,Table } from "antd";
import { useEffect,useState } from "react";
import useNftContract from "../../hooks/nft.hook";
import useMarketplaceContract from "../../hooks/marketplace.hook";
import useWeb3 from "../../hooks/web3.hook";
import dnlApi from "../../api/dnl-transation-log";

const DnlTransactionLog = () => {
    const [dataLog,setDataLog] = useState([]);

    const getDataDnlTransaction = async () => {
        const dataDnlTransactionLog = await dnlApi.getDnlTransactionLog();
        setDataLog(dataDnlTransactionLog);
    }
    useEffect(() => {
        getDataDnlTransaction();
    },[])
  const columns = [
    {
      title: "Wallet Address",
      dataIndex: "walletAddress",
      key: "walletAddress",
      render: (text, record) => {
        return (
          <a
            href={`${process.env.NEXT_PUBLIC_ADDRESSS_URL}/${record.walletAddress}`}
            target="_blank"
          >
            {record.walletAddress}
          </a>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sort: (a, b) => Number(a.amount) - Number(b.amount),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  return (
    <>
      <div>
        <div>
          <h1>DNl Transaction Log</h1>
        </div>
        <Table
          dataSource={dataLog}
          columns={columns}
          //   loading={loading}
          //   pagination={{
          //     pageSize: 50,
          //     showTotal: (total, range) =>
          //       `${range[0]}-${range[1]} of ${total} items`,
          //   }}
        />
      </div>
    </>
  );
};

export default DnlTransactionLog;
