import { AppstoreOutlined, CrownOutlined, SettingOutlined, SmileOutlined } from "@ant-design/icons";
import { BasicLayoutProps } from "@ant-design/pro-components";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

import Redirect from "@/components/Redirect";

const route: BasicLayoutProps["route"] = {
  path: "/",
  routes: [
    {
      path: "/",
      component: () => <Navigate to="/index" />,
    },
    {
      path: "/index",
      name: "欢迎",
      icon: <SmileOutlined />,
      component: lazy(() => import("@/pages/home/index")),
    },
    {
      path: "/app",
      name: "应用",
      icon: <AppstoreOutlined />,
      component: () => <Redirect from="/app" to="/app/password/list" />,
      routes: [
        {
          path: "/app/password",
          name: "密码管理",
          icon: <CrownOutlined />,
          component: () => <Redirect from="/app/password" to="/app/password/list" />,
          routes: [
            {
              path: "/app/password/list",
              name: "密码列表",
              component: lazy(() => import("@/pages/app/password/list")),
            },
          ],
        },
      ],
    },
    {
      path: "/sys",
      name: "系统管理",
      icon: <SettingOutlined />,
      component: () => <Redirect from="/sys" to="/sys/db" />,
      routes: [
        {
          path: "/sys/db",
          name: "存储",
          icon: <CrownOutlined />,
          component: lazy(() => import("@/pages/sys/db")),
        },
      ],
    },
  ],
};

export { route };
