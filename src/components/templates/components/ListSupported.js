import {Row, Col } from "antd";
import { useEffect, useState } from "react";
import supportedIDs from "../../../api/supportedIDs";

const ListSupported = () => {
  const [data, setData] = useState([]);
  const id = 1;
  useEffect(() => {getResponse()});

  const getResponse = async() => {
    let listSupported  = await supportedIDs.getSupportedIds(id);
    console.log('listSupported', listSupported.imgs);
    setData(listSupported.imgs);
  }

  return (
    <div>
        {data.map((item, index) => {
          return (
            <Col key={index}>
              <img src={item.url} alt="" />
            </Col>
          )
        })
      }
    </div>
  );
};

export default ListSupported;
