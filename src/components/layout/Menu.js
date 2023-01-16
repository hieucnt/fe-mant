import { Menu, Icon } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { isAuthenticatedUser } from "../../utils/auth";
import { MENU_SITE } from "../../constants";

// const keys = ["/", "/dinos", "users","dnl-transaction-log"];

const menu = MENU_SITE.map((item, index) => {
  return (
    <Menu.Item key={item.path}>
    <Link href={item.path}>
      <a>
        <Icon type={item.icon} />
        <span>{item.title}</span>
      </a>
    </Link>
  </Menu.Item>
  )
})

const CustomMenu = ({ style, closeDrawer }) => {
  const router = useRouter();
  const currentPath = router.route;
  let selectedKeys = [];

  for (let i = MENU_SITE.length - 1; i >= 0; i--) {
    if (currentPath.includes(MENU_SITE[i])) {
      selectedKeys = [MENU_SITE[i]];
      break;
    }
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      style={{ ...style, padding: "16px 0", backgroundColor:'#8f856b' }}
      onClick={({ key }) => {
        closeDrawer();
        router.push(key);
      }}
    >
      {menu}
    </Menu>
  );
};

export default CustomMenu;
