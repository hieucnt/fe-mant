import "ant-design-pro/lib/Charts/style/index.less";
import "../styles/globals.scss";
import Head from "next/head";
import { Row, Col, Statistic, Button } from "antd";
import nftApi from "../api/nft";
import userApi from "../api/user";
import { useState, useEffect, useRef } from "react";
import Auth from "../components/AuthPage";
import { Doughnut } from "react-chartjs-2";

const Dashboard = () => {
  const [totalDinos, setTotalDinos] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDinosByRarity, setTotalDinosByRarity] = useState([]);
  const [totalDinosByLevel, setTotalDinosByLevel] = useState([]);
  useEffect(() => {
    (async () => {
      const totalDinos = await nftApi.getTotalDinos();
      const totalUsers = await userApi.getTotalUsers();
      const dinos = await nftApi.getDinos();
      const totalR1Dinos = dinos.filter((dino) => dino.rarity === 1).length;
      const totalR2Dinos = dinos.filter((dino) => dino.rarity === 2).length;
      const totalR3Dinos = dinos.filter((dino) => dino.rarity === 3).length;
      const totalR4Dinos = dinos.filter((dino) => dino.rarity === 4).length;
      const totalR5Dinos = dinos.filter((dino) => dino.rarity === 5).length;
      setTotalDinosByRarity([totalR1Dinos, totalR2Dinos, totalR3Dinos, totalR4Dinos, totalR5Dinos]);

      const totalLevel1Dinos = dinos.filter((dino) => dino.level === 1).length;
      const totalLevel2Dinos = dinos.filter((dino) => dino.level === 2).length;
      const totalLevel3Dinos = dinos.filter((dino) => dino.level === 3).length;
      const totalLevel4Dinos = dinos.filter((dino) => dino.level === 4).length;
      const totalLevel5Dinos = dinos.filter((dino) => dino.level === 5).length;
      const totalLevel6Dinos = dinos.filter((dino) => dino.level === 6).length;
      setTotalDinosByLevel([totalLevel1Dinos, totalLevel2Dinos, totalLevel3Dinos, totalLevel4Dinos, totalLevel5Dinos, totalLevel6Dinos]);

      setTotalDinos(totalDinos);
      setTotalUsers(totalUsers);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard - DinoLand Admin</title>
      </Head>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Active Users" value={totalUsers} />
        </Col>
        <Col span={6}>
          <Statistic title="Active Dinos" value={totalDinos} />
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Row>
            <h1>
              Dino By Rarity
            </h1>
          </Row>
          <Row>
            <div style={{ width: "500px" }}>
            <Doughnut
              data={{
                labels: [
                  "Normal",
                  "Rare",
                  "Super Rare",
                  "Legendary",
                  "Mystic",
                ],
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: [
                      "#3e95cd",
                      "#8e5ea2",
                      "#3cba9f",
                      "#e8c3b9",
                      "#c45850",
                    ],
                    data: totalDinosByRarity,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true
                  },
                }
              }}
            />
            </div>
          </Row>
        </Col>
        <Col span="12">
          <Row>
            <h1>
              Total Dino By Level
            </h1>
          </Row>
          <Row>
            <div style={{ width: "500px" }}>
            <Doughnut
              data={{
                labels: [
                  "Level 1",
                  "Level 2",
                  "Level 3",
                  "Level 4",
                  "Level 5",
                  "Level 6"
                ],
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: [
                      "#3e95cd",
                      "#8e5ea2",
                      "#3cba9f",
                      "#e8c3b9",
                      "#c45850",
                      "#FFFF00",
                    ],
                    data: totalDinosByLevel,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true
                  },
                }
              }}
            />
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
