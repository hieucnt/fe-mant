/**
 * Description: Header bar of page

 */

import { Icon, Layout, Dropdown, Menu } from "antd";
const { Header } = Layout;
import styled from "styled-components";
import { Logo } from "./LogoTitle";
import Link from "next/link";
import nookies from "nookies";
import Router from "next/router";

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`;

const StyledImageBlock = styled(TriggerBlock)`
  @media (min-width: 576px) {
    display: none !important;
  }

  padding-left: 24px;
  ${"" /* cursor: pointer; */}
`;

const MobileLogo = styled(Logo)`
  vertical-align: -10px;
`;

// const HeaderBlock = styled(TriggerBlock)`
//   padding: 0 12px;
//   cursor: pointer;
//   transition: all 0.3s;

//   &:hover {
//     background: rgba(143, 133, 107);
//   }
// `;

// const MyMenu = () => {
//   return (
//     <Menu>
//       <Menu.Item key="profile">
//         <Icon type="user" />
//         Profile
//       </Menu.Item>
//       <Menu.Divider style={{ marginTop: -5, marginBottom: 0 }} />
//       <Menu.Item
//         key="logout"
//         onClick={() => {
//           window.localStorage.removeItem("is_authenticated");
//           window.location.reload();
//           window.location.href = "/";
//         }}
//       >
//         <Icon type="logout" />
//         Logout
//       </Menu.Item>
//     </Menu>
//   );
// };

const HeaderBar = ({ collapsed, handleToggle }) => {
  return (
    <Header
      style={{
        background: "#8f856b",
        padding: 0,
        boxShadow: "0 1px 4px rgba(0,21,41,.08)",
        display: "flex",
      }}
    >
      <Link href="/">
        <a>
          <StyledImageBlock>
            {/* <MobileLogo src="/static/transparent-logo.png" alt="logo" /> */}
          </StyledImageBlock>
        </a>
      </Link>

      <TriggerBlock>
        <Icon
          className="trigger"
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={handleToggle}
          style={{
            fontSize: 20,
            verticalAlign: "middle",
          }}
        />
      </TriggerBlock>
    </Header>
  );
};

export default HeaderBar;
