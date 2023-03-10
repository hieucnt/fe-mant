/**
 * Description: Drawer for page layout

 */

import { Drawer } from "antd";
import styled from "styled-components";

const StyledDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    overflow: hidden !important;
  }
`;
const StyledDrawerComponent = ({ drawerVisible, closeDrawer, children }) => (
  <StyledDrawer
    placement="left"
    closable={false}
    onClose={closeDrawer}
    visible={drawerVisible}
    bodyStyle={{
      margin: 0,
      padding: 0,
    }}
  >
    {children}
  </StyledDrawer>
);
export default StyledDrawerComponent;
