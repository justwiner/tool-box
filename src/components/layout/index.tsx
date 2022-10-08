import type { BasicLayoutProps, ProSettings } from "@ant-design/pro-components";
import { ProLayout } from "@ant-design/pro-components";
import { Spin } from "antd";
import { Suspense, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { route } from "@/routes";

import RightContent from "./RightContent";

function renderRoute(route: BasicLayoutProps["route"]) {
  return route?.routes?.map(item => {
    if (!item.path) return null;
    return (
      <Route key={item.path} path={item.path} element={item.component ? <item.component /> : undefined}>
        {item.routes ? renderRoute(item) : null}
      </Route>
    );
  });
}

export default function Layout() {
  const location = useLocation();
  const [settings] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: "mix",
    splitMenus: true,
    headerTheme: "light",
    navTheme: "light",
  });

  return (
    <div id="test-pro-layout" style={{ height: "100vh" }}>
      <ProLayout
        route={route}
        location={location}
        menuItemRender={(item, dom) => <Link to={item.path || "/index"}>{dom}</Link>}
        rightContentRender={RightContent}
        title="Password"
        {...settings}
      >
        <Suspense fallback={<Spin spinning style={{ width: "100%" }} />}>
          <Routes>{renderRoute(route)}</Routes>
        </Suspense>
      </ProLayout>
    </div>
  );
}
