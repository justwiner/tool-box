import { ProFormSelect, ProFormText } from "@ant-design/pro-components";

import { PASSWORD_TYPE } from "@/types/password";

export default function PasswordForm() {
  return (
    <>
      <ProFormSelect
        rules={[
          {
            required: true,
            validateTrigger: "change",
            message: "请选择平台来源",
          },
        ]}
        options={[
          {
            value: PASSWORD_TYPE.APP,
            label: "APP",
          },
          {
            value: PASSWORD_TYPE.WEB,
            label: "WEB",
          },
        ]}
        initialValue={PASSWORD_TYPE.WEB}
        name="type"
        label="平台"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: "请输入账号",
          },
        ]}
        colProps={{ span: 12 }}
        name="account"
        label="账号"
        placeholder="请输入账号"
      />
      <ProFormText.Password
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
        colProps={{ span: 12 }}
        name="password"
        label="密码"
        placeholder="请输入密码"
      />
      <ProFormText name="desc" label="描述" placeholder="请输入描述" />
    </>
  );
}
