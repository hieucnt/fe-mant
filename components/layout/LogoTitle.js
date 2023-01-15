/**
 * Description: Title and logo of page

 */

import styled from "styled-components";
import Link from "next/link";

export const Logo = styled.img`
  height: 32px;
  display: flex;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  overflow: hidden;
  line-height: 64px;
  transition: all 0.3s;
  background: #8f856b;
  justify-content: center;
`;

export default () => (
  <TitleWrapper>
    <Link href="https://mant.vn/">
      <a target="_blank">
        <Logo src="https://mant.vn/wp-content/uploads/2021/03/logo-1.png" alt="Mant" />
      </a>
    </Link>
  </TitleWrapper>
);
