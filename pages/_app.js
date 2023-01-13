import NextApp from "next/app";
import Router, { withRouter } from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import Error from "next/error";
import Loading from "../components/Loading";
import Head from "next/head";
import nookies from "nookies";
import "../styles/globals.scss";

// dev fix for css loader
if (process.env.NODE_ENV !== "production") {
  Router.events.on("routeChangeComplete", () => {
    const path = "/_next/static/css/styles.chunk.css";
    const chunksSelector = `link[href*="${path}"]`;
    const chunksNodes = document.querySelectorAll(chunksSelector);
    const timestamp = new Date().valueOf();
    chunksNodes[0].href = `${path}?${timestamp}`;
  });
}

// UI loading top bar
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const App = ({ children }) => {
  const { loading, isAuthenticated } = {
    loading: false,
    isAuthenticated: true,
  };

  if (loading) return <Loading />;

  return <>{children}</>;
};

class AppWrapper extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    let collapsed = false;
    let protocol =
      process.env.NODE_ENV === "development" ? "http://" : "https://";
    let redirect_uri = "";
    if (ctx.req) {
      redirect_uri = protocol + ctx.req.headers.host;
    } else {
      redirect_uri = window.location.origin;
    }

    if (!ctx.req) {
      // client-side
      collapsed = JSON.parse(sessionStorage.getItem("collapsed")) || false;
    } else {
      const { collapsed: collapsedCookie } = nookies.get(ctx);
      if (collapsedCookie) {
        collapsed = JSON.parse(collapsedCookie);
      }
    }

    return { pageProps, collapsed, redirect_uri };
  }

  render() {
    const { Component, pageProps, collapsed, router, redirect_uri } =
      this.props;

    return (
      <>
        <Head>
          <title>Dino Land Admin</title>
        </Head>
        {router.pathname !== "/_error" ? (
          <App>
            <Layout collapsed={collapsed}>
              <Component {...pageProps} />
            </Layout>
          </App>
        ) : (
          <Error statusCode="404" />
        )}
      </>
    );
  }
}

export default withRouter(AppWrapper);
