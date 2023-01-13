import { useEffect, useRef } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { isAuthenticatedUser } from "../../utils/auth";

const { Sider } = Layout;

const FixedSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

  @media (max-width: 575.98px) {
    display: none;
  }
`;

const CustomSider = ({ collapsed, setCollapsed, children }) => {
  let firstMounted = useRef(false);

  useEffect(() => {
    firstMounted.current = true;
  }, []);

  return (
    isAuthenticatedUser() && <FixedSider
      trigger={null}
      width={256}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      onBreakpoint={(collapsed) => {
        firstMounted.current && setCollapsed(collapsed);
      }}
    >
      {children}
    </FixedSider>
  );
};

export default CustomSider;
