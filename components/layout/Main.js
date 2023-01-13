import { Layout } from "antd";
import styled, { css } from "styled-components";
import AuthPage from "../AuthPage";
import { isAuthenticatedUser } from "../../utils/auth";

const MainLayout = styled(({ collapsed: _, ...props }) => (
  <Layout {...props} />
))`
  transition: 0.2s all;
  margin-left: 256px;
  ${({ collapsed }) =>
    collapsed &&
    css`
      margin-left: 80px;
    `};

  @media (max-width: 575.98px) {
    margin-left: 0;
  }
`;

const Main = ({ children, collapsed }) => {
  return isAuthenticatedUser() ? (
    <MainLayout collapsed={collapsed}>{children}</MainLayout>
  ) : (
    <AuthPage />
  );
};

export default Main;
