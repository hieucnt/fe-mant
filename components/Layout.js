import React from "react";
import "../static/index.css";
import { Layout } from "antd";
const { Content } = Layout;
import nookies from "nookies";

import FixedSider from "./layout/Sider";
import MainLayout from "./layout/Main";
import Header from "./layout/Header";
import LogoTitle from "./layout/LogoTitle";
import Drawer from "./layout/Drawer";
import Menu from "./layout/Menu";

class MyLayout extends React.Component {
  state = {
    collapsed: this.props.collapsed,
    drawerVisible: false,
  };

  toggle = () => {
    if (window.innerWidth >= 576) {
      this.setState(
        (state) => ({
          collapsed: !state.collapsed,
        }),
        () => {
          nookies.set({}, "collapsed", JSON.stringify(this.state.collapsed), {
            path: "/",
          });
        }
      );
    } else {
      this.setState((state) => ({
        drawerVisible: !state.drawerVisible,
      }));
    }
  };

  render() {
    const { collapsed, drawerVisible } = this.state;
    const { children } = this.props;

    return (
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <FixedSider
          collapsed={collapsed}
          setCollapsed={(collapsed) => {
            this.setState({ collapsed });
            nookies.set({}, "collapsed", JSON.stringify(collapsed), {
              path: "/",
            });
          }}
        >
          <LogoTitle />

          <Menu closeDrawer={() => this.setState({ drawerVisible: false })} />
        </FixedSider>

        <MainLayout collapsed={collapsed}>
          <Header collapsed={collapsed} handleToggle={this.toggle} />
          <Content
            style={{
              margin: "20px 16px 15px 16px",
            }}
          >
            {children}
          </Content>
        </MainLayout>

        <Drawer
          drawerVisible={drawerVisible}
          closeDrawer={() => this.setState({ drawerVisible: false })}
        >
          <LogoTitle />

          <Menu
            style={{ minHeight: "100vh" }}
            closeDrawer={() => this.setState({ drawerVisible: false })}
          />
        </Drawer>
      </Layout>
    );
  }
}

export default MyLayout;
